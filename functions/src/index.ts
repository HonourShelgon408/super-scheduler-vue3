//IMPORT VARIABLES
const functions = require("firebase-functions");
const admin = require('firebase-admin');


//GLOBAL VARIABLES
admin.initializeApp();
const db = admin.firestore();

export const taskrunner = functions
    // .region("europe-west2")
    .region("us-central1")
    .runWith({ memory: '2GB' }).pubsub
    .schedule('* * * * *').onRun(async (context: any) => {  

        const now = admin.firestore.Timestamp.now();

        let jobCount = 0;

        function sendMessages(tasks: any) {
            return new Promise((resolve, reject) => {
                if (tasks != null) {
                    tasks.forEach((snapshot: any) => {

                        jobCount++;

                        const data = snapshot.data();

                        let message = {
                            data: {
                                noteId: snapshot.id //** used to update DOM on page */
                            },
                            notification: {
                                title: "",
                                body: ""
                            },
                            // android: {
                            //     notification: {
                            //         color: '#03a9f4'
                            //     }
                            // },
                            token: data.token
                        };
                        if ('title' in data) {
                            message.notification.title = data.title;
                        }
                        if ('body' in data) {
                            message.notification.body = data.body;
                        }

                        admin.messaging().send(message)
                            .then((response: any) => {
                                functions.logger.log("message sent", message, data, response);
                                snapshot.ref.update({ status: "completed" });
                            })
                            .catch((error: any) => {
                                functions.logger.log("error with message", message, error);
                                snapshot.ref.update({ status: "failed" });
                            })

                    }); //ends tasks.forEach
                    functions.logger.log("tasks found", jobCount);


                }
                resolve("jobs done.");
            })
        }

        const updateReminder = db.collection('notes')
            .where('performAt', '<=', now)
            .where('status', '==', 'scheduled');
        const tasks = await updateReminder.get();

        sendMessages(tasks).then(function () {
            functions.logger.log("tasks", now.toDate(), now, tasks);


            db.collection('schedulerLog').add({
                timestamp: now,
                timeString: now.toDate(),
                jobs: jobCount
            })
            .catch((error: any) => {
                functions.logger.log("something went wrong adding scheduler log", error)
            });

            jobCount = 0;
        })
        .catch((error: any) => {
            functions.logger.log("something went wrong sending messages", error);
        });



    });






/*
ADD MESSAGE ENDPOINT URL FOR ADDING A MESSAGE TO THE DATABASE
TABLE DOES NOT EXIST
*/


/**
https://us-central1-pwa-scheduler-a9307.cloudfunctions.net/addMessage?text=
*/

// exports.addMessage = functions.https.onRequest(async (req: any, res: any) => {
//     const original = req.query.text;
//     const writeResult = await db.collection('messages').add({ original: original });
//     res.json({ result: `Message with ID: ${writeResult.id} added` });
// });
