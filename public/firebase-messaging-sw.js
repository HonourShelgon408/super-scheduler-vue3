
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.0.2/firebase-messaging.js');
//importScripts('/__/firebase/init.js');

/* if you alter this firebase global variable
* change the one located in ./src/firebase/firebase-config-details.js */
const firebase_global = {
    apiKey: "AIzaSyBqo_x81m26uliOXF9k8Sz3fE1ZGOXu6wU",
    authDomain: "pwa-scheduler-a9307.firebaseapp.com",
    databaseURL: "https://pwa-scheduler-a9307.firebaseio.com",
    projectId: "pwa-scheduler-a9307",
    storageBucket: "pwa-scheduler-a9307.appspot.com",
    messagingSenderId: "418459451060",
    appId: "1:418459451060:web:adebb639b89724c36821e1",
    measurementId: "G-1EC78QP9Q1"
};

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

