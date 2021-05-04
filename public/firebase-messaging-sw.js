
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

/* if you alter this firebase global variable
* change the one located in ./src/firebase/firebase-config-details.js */


firebase.initializeApp(firebase_global);

try {
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(function(payload) {

        const title = payload.data.title;

        const options = {
            body: payload.data.body
        }

        console.warn("onBackgroundMessage", payload);

        // self.registration.showNotification(title, options);
        
    });
}
catch (error) {
    console.log("FBM SW messaging error:", error);
}

