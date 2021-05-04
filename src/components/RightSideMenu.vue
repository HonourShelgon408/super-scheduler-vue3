<template>
  <!-- right-sidenav -->
  <ul id="side-menu" class="sidenav side-menu z-depth-5">
    <li class="sidenav-close">
      <div class="divider"></div>
    </li>
    <li class="sidenav-close">
      <router-link :to="{ name: 'Home' }">
        <strong>Super Scheduler Home</strong>
      </router-link>
    </li>
    <li class="sidenav-close" v-if="!isUserSignedIn" @click="signIn">
      <a><i class="material-icons">person_pin</i>Sign in</a>
    </li>
    <li class="sidenav-close" v-if="isUserSignedIn" @click="signOut">
      <a>
        <el-row>
          <el-col>
            <i class="material-icons">exit_to_app</i>
            Sign out [{{ sideMenuUser }}...]
          </el-col>
        </el-row></a
      >
    </li>
    <div v-if="userEmail">
      <li
        @click="getNotificationAccess"
        v-if="notificationAccess == false && userEmail != null"
      >
        <!-- <li @click="getNotificationAccess"> -->
        <a><i class="material-icons">notifications</i>Turn on Notifications</a>
      </li>
      <li
        @click="rejectNotificationAccess"
        v-else-if="notificationAccess == true && userEmail != null"
      >
        <!-- <li @click="rejectNotificationAccess"> -->
        <a
          ><i class="material-icons">notifications_off</i>Turn off
          Notifications</a
        >
      </li>
    </div>
    <li class="sidenav-close">
      <router-link :to="{ name: 'About' }">
        <i class="material-icons">info</i>About
        <!-- loyalty is nice -->
      </router-link>
    </li>
    <li class="sidenav-close" v-if="userEmail == 'alexberridge17@gmail.com'">
      <router-link :to="{ name: 'Settings' }">
        <i class="material-icons">settings</i>Settings
      </router-link>
    </li>
    <li class="sidenav-close">
      <router-link :to="{ name: 'ContactUs' }">
        <i class="material-icons">send</i>Contact Us
      </router-link>
    </li>
    <li class="sidenav-close">
      <router-link :to="{ name: 'BugReport' }">
        <i class="material-icons">bug_report</i>Bug report
      </router-link>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <div class="normal-cursor center-align col s7 push-s5">Social Media</div>
    </li>
    <li class="sidenav-close">
      <a href="https://github.com/HonourShelgon408" class="waves-effect">
        <i class="material-icons">
          <img
            class="web-icon"
            alt="Github Logo"
            src="@/assets/GitHub-Mark.png"
          />
        </i>
        GitHub
      </a>
    </li>
    <li class="sidenav-close">
      <a href="https://twitter.com/HShelgon" class="waves-effect">
        <i class="material-icons">
          <img class="web-icon" alt="Twitter Logo" src="@/assets/twitter.png" />
        </i>
        Twitter
      </a>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <div class="center-align col s7 push-s5">Powered By</div>
    </li>
    <!--    <li>
      <a href="https://firebase.google.com/">Firebase</a>  https://firebase.google.com/brand-guidelines 
    </li>
-->
    <li class="sidenav-close">
      <!-- https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png -->
      <a href="https://firebase.google.com/">
        <img
          style="height: 22px; width: auto"
          src="@/assets/firebase.png"
          alt="Firebase"
        />
      </a>
    </li>
    <li>
      <a href="https://materializecss.com/">
        <span class="materializecss">Materialize Css</span>
      </a>
    </li>
    <li>
      <a href="https://www.npmjs.com/package/element-plus"
        ><img
          style="height: 22px; width: auto"
          src="@/assets/elements+.png"
          alt="Elements Plus"
      /></a>
    </li>
    <li class="sidenav-close" style="font-family: 'bodoni'">
      <a href="https://fontmeme.com/">calligraphy fonts</a>
    </li>
    <li class="sidenav-close">
      <a href="https://flatpickr.js.org/"><i>flatpickr</i></a>
    </li>
    <!-- <li class="sidenav-close">
      <a href="https://www.youtube.com/channel/UCaJvzHE_y3MhbDLrsa4FfJQ">
        <b>bitsofcode</b>
      </a>
    </li> -->
    <li class="sidenav-close">
      <a href="https://maskable.app/editor">
        <!-- <img style="width:10px;height:10px;" src="https://maskable.app/favicon/favicon.svg">-->
        Maskable.app
      </a>
    </li>
    <div id="adminSection" v-if="userEmail == 'alexberridge17@gmail.com'">
      <li>
        <div class="divider"></div>
      </li>
      <li>
        <div class="center-align col s7 push-s5">Admin</div>
      </li>
      <li>
        <router-link :to="{ name: 'Assets' }">Assets</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Bugs' }">Bugs</router-link>
      </li>
    </div>
  </ul>

  <!-- END-OF right-sidenav -->
</template>

<script>
import { useRouter } from "vue-router";
import {
  auth,
  firebase,
  messaging,
  realtime,
  db,
} from "@/firebase/database.js";
import { ref } from "vue";

export default {
  setup() {
    auth.onAuthStateChanged(handleAuthStateChange);

    let notificationAccess = ref(false);
    let router = useRouter();
    let sideMenuUser = ref();
    let userEmail = ref();
    const globalVapid =
      "BPWf1tbECVCHpl0gfxdxJJqWg3m5A3KkcVrjxqSFu_RfmuikB4x1D0JSbktt82UU1ipH3lYGVyo6VdO6PObe26o";

    let isUserSignedIn = ref(false);

    function signIn() {
      auth
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((user) => {
          isUserSignedIn.value = true;
          user.value = user.email;
          // $emit("user-obj", user)
        });
    }

    function signOut() {
      auth.signOut();
    }

    function handleAuthStateChange(user) {
      // console.log("authentication changed", auth);
      if (user) {
        console.log("logged in with", user.email);
        isUserSignedIn.value = true;
        userEmail.value = user.email;
        sideMenuUser.value = user.email.substring(0, 13);
      } else {
        console.log("no user");
        isUserSignedIn.value = false;
        sideMenuUser.value = null;
      }
      checkSubscription();
      // console.log("isusersignedin", isUserSignedIn.value);
      // console.log("side user", sideMenuUser.value);
    }

    //https://firebase.google.com/docs/database/web/read-and-write

    function getNotificationAccess() {
      messaging
        .requestPermission()
        .then(() => {
          handleTokenRefresh();
          console.log("has permissions");
        })
        .then(() => checkSubscription())
        .catch((error) => {
          console.log("hasn't permissions", error);
        });
    }

    function rejectNotificationAccess() {
      messaging
        .getToken({ vapidKey: globalVapid })
        .then((token) => {
          console.log("revoke access");
          messaging.deleteToken(token);
        })
        .then(() =>
          realtime
            .ref("/tokens/" + auth.currentUser.uid)
            // .orderByChild(auth.currentUser.uid)
            // .equalTo(auth.currentUser.uid)
            .once("value")
        )
        .then((snapshot) => {
          // const key = Object.keys(snapshot.val())[0];
          return realtime.ref("/tokens/" + auth.currentUser.uid).remove();
        })
        .then(() => {
          // notificationAccess = false;
          checkSubscription();
        })
        .catch((error) => {
          console.log("error - no permission token found to delete", error);
        });
    }

    function handleTokenRefresh() {
      return messaging
        .getToken({ vapidKey: globalVapid })
        .then((token) => {
          refreshFirebaseNotifications(token, auth.currentUser.email);
          console.log("permission refresh");
          realtime
            .ref("/tokens/" + auth.currentUser.uid)
            .set({
              token: token,
              dateAdded: Date.now(),
            })
            .then(() => {
              /*console.log("permission granted")*/
            })
            .catch((error) => console.log("failed to grant permission", error));
        })
        .catch((error) => console.log("permission error:", error));
    }

    function checkSubscription() {
      if (auth.currentUser != null) {
        realtime
          .ref("/tokens/" + auth.currentUser.uid)
          .on("value", (snapshot) => {
            if (snapshot.val()) {
              notificationAccess.value = true;
              // console.log("checking sub:", notificationAccess.value);
              return notificationAccess;
            } else {
              notificationAccess.value = false;
              // console.log("checking sub:", notificationAccess.value);
              return notificationAccess;
            }
          });
      }

      // .then((snapshot) => {
      //   console.log("something", snapshot);
      // })
      // .catch((error) => {
      //   console.log("checksubscription error:", error);
      // });
    }

    async function refreshFirebaseNotifications(thisToken, uid) {
      db.collection("notes")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            doc.ref.update({ token: thisToken });
          });
        });
    }

    return {
      signIn,
      signOut,
      isUserSignedIn,
      userEmail,
      sideMenuUser,
      getNotificationAccess,
      notificationAccess,
      rejectNotificationAccess,
    };
  },
};
</script>

<style>

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.small-text {
  font-size: 9pt;
}

.responsive-text {
  font-size: 12pt;
  font-size: 4vw;
}

ul li {
  margin: auto;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

li:hover {
  cursor: pointer;
}

.normal-cursor {
  cursor: default;
}

.materializecss {
  color: #ee6e73;
}
</style>