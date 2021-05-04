import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/analytics"
import "firebase/messaging"
import "firebase/"
import global_config from "./firebase-config-details"

firebase.initializeApp(global_config);
firebase.analytics();
const db = firebase.firestore(); //...dont change this variable - "db" is used everywhere
const messaging = firebase.messaging();
const auth = firebase.auth();
const realtime = firebase.database();



export { db, auth, messaging, realtime, firebase }
