//https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
import { register } from 'register-service-worker'

window.onload = () => {
  'use strict';
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('./sw.js').then(function(reg){
    //     console.log("SW other registered!", reg );
    // });
    navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`).then(function (reg) {
      console.log("super-scheduler-vue3 worker registered!", reg)
    })
      .catch((error) => { console.log("error registering service worker", error) });

    // navigator.serviceWorker.register(`${process.env.BASE_URL}service-worker.js`).then(function (reg) {
    //   console.log("super-scheduler-vue3 service worker registered!", reg)
    // })
    //   .catch((error) => { console.log("error registering service worker", error) });

    // navigator.serviceWorker.register(`${process.env.BASE_URL}firebase-messaging-sw.js`).then(function (reg) {
    //   console.log("firebase worker registered!", reg)
    // })
    //   .catch((error) => { console.log("error registering firebase service worker", error) });
  }
}

// if ("serviceWorker" in navigator) {

//   self.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent the mini-infobar from appearing on mobile
//     console.log("install offer");
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     // Update UI notify the user they can install the PWA
//     showInstallPromotion();
//   });

//   if (process.env.NODE_ENV === 'production') {
//     register(`${process.env.BASE_URL}service-worker.js`, {
//       ready() {
//         // console.log("App is ready");
//         // console.log(
//         //   'App is being served from cache by a service worker.\n' +
//         //   'For more details, visit https://goo.gl/AFskqB'
//         // )
//       },
//       registered() {
//         console.log("App is ready");
//         // console.log('Registered')
//       },
//       cached() {
//         // console.log('Content has been cached for offline use.')
//       },
//       updatefound() { /** it is fired any time the ServiceWorkerRegistration.installing property acquires a new service worker. */
//         console.log('App update has been found, downloading update')
//       },
//       updated() { /** Checks the server for an updated version of the service worker without consulting caches */
//         console.log('App has been updated, please reload')
//       },
//       offline() {
//         console.log('Offline mode is enabled - cannot find Internet source')
//       },
//       error(error) {
//         console.error('Error during app registration:', error)
//       }
//     }),
//       register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {
//         ready() {
//           // console.log("Database is ready");
//         },
//         registered() {
//           // console.log("fbm registered");
//           console.log("Database is ready");

//         },
//         error(error) {
//           console.error("error during database registration", error);
//         }
//       })
//   }
// }



  // if (process.env.NODE_ENV === 'production') {
  //   register(`${process.env.BASE_URL}service-worker.js`, {
  //     ready() {
  //       console.log("App is ready");
  //       // console.log(
  //       //   'App is being served from cache by a service worker.\n' +
  //       //   'For more details, visit https://goo.gl/AFskqB'
  //       // )
  //     },
  //     registered() {
  //       console.log('Registered')
  //     },
  //     cached() {
  //       console.log('Content has been cached for offline use.')
  //     },
  //     updatefound() {
  //       console.log('New content is downloading.')
  //     },
  //     updated() {
  //       console.log('New content is available; please refresh.')
  //     },
  //     offline() {
  //       console.log('No internet connection found. App is running in offline mode.')
  //     },
  //     error(error) {
  //       console.error('Error during service worker registration:', error)
  //     }
  //   }),
  //     register(`${process.env.BASE_URL}firebase-messaging-sw.js`, {
  //       ready() {
  //         console.log("fbm ready");
  //       },
  //       registered() {
  //         console.log("fbm registered");
  //       },
  //       error(error) {
  //         console.error("error during fbm registration", error);
  //       }
  //     })
  // }

