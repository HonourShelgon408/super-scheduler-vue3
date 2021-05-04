<template>
  <div>
    <top-nav></top-nav>
    <right-menu class="side-menu"></right-menu>
    <add-menu class="side-form"></add-menu>
    <update-menu class="side-form"></update-menu>
    <notification-panel
      v-on:close-banner="closeNotification"
      v-bind:notificationMessage="notificationMessage"
      v-bind:hasNotification="hasNotification"
    >
    </notification-panel>
    <router-view ref="pages"></router-view>
    <!-- <div style="background-color: lightgreen" @click="flipHasNotification()">
      {{ hasNotification }}
    </div> -->
  </div>
</template>

<script>
import M from "materialize-css";
// import $ from "jquery";
import "flatpickr/dist/flatpickr.css";
import { auth } from "./firebase/database";
import { provide } from "vue";
import { useRouter } from "vue-router";
import { messaging } from "./firebase/database";
import { ref } from "vue";
import firebase_global from "./firebase/firebase-config-details";
import topNavigation from "@/components/TopNav.vue";
import rightMenu from "@/components/RightSideMenu.vue";
import addMenu from "@/components/NoteAddMenu.vue";
import updateMenu from "@/components/NoteUpdateMenu.vue";
import notificationPanel from "@/components/NotificationPanel.vue";

// require("@/css/materialize.css");
// require("@/css/materialize.min.css");
// require("@/js/main.js");

export default {
  name: "app",
  data: () => {
    return {
      // notificationMessage: {
      //   type: Object,
      //   default: () => ({ title: "def title", body: "def body" }),
      // },
      // hasNotification: {
      //   type: Boolean,
      //   default: () => false,
      // },
    };
  },
  components: {
    "notification-panel": notificationPanel,
    "top-nav": topNavigation,
    "right-menu": rightMenu,
    "add-menu": addMenu,
    "update-menu": updateMenu,
  },
  methods: {

  },
  mounted: function () {
    let notificationMessage = {title: "", body: ""}
    let hasNotification = false;

    function closeNotification(e) {
      hasNotification = false;
      // console.log("close-banner", e);
    }


    function timeoutNotification() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          hasNotification = false;
          resolve();
        }, 6000);
      });
    }


    let router = useRouter();
    M.AutoInit();

    // nav menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right", draggable: "true" });
    // add note form
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left", draggable: "true" });

    // $('.tooltipped').tooltip();
    /*adds active class to an element when someone is typing in it - moves the placeholder to above the typing area*/
    M.updateTextFields();

    provide("firebase_global", firebase_global);
    provide("messaging", messaging);

    // /**makes the textarea increase height as user types */
    // function auto_grow(element) {
    //   element.style.height = "10px";
    //   element.style.height = element.scrollHeight + "px";
    // }

    messaging.onMessage(function (payload) {
      notificationMessage = { title: "default", body: "default2" };
      hasNotification = true;
      // console.warn("app.vue notification", payload.notification);

      // var notification = new Notification(title, body);
      // notification.onclick = () => {
      //   notification.close();
      //   window.parent.focus();
      // };

      console.log(notificationMessage);
      console.log(payload.notification);

      notificationMessage.title = payload.notification.title;
      notificationMessage.body = payload.notification.body;

      timeoutNotification()
        .then(function () {
          console.log("notification closed");
        })
        .catch((error) => console.log("error closing notification:", error));

      const note = document.querySelector(
        `.note[data-id='${payload.data.noteId}']`
      );
      const noteReminder = note.getElementsByTagName("I")[1];
      noteReminder.innerHTML = "notifications_none";
      console.log("app 129", note, noteReminder);
    });
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495e;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}

@import url("https://fonts.googleapis.com/css?family=Montserrat:500");

/* colours */
:root {
  --primary: #e1f5fe;
  --secondary: #03a9f4;
  --title: #0277bd;
}

#superScheduler {
  /** logo for the website*/
  /* width:10px;
  height:20px; */
  height: 60%;
  width: auto;
  padding-top: 10px;
}

textarea {
  resize: vertical;
  height: auto;
  outline: none;
  min-height: 50px;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: none;
  white-space: pre-wrap;
}

/* layout styles */
nav {
  background: var(--primary);
  border-bottom: 10px solid var(--secondary);
}
nav a {
  text-transform: uppercase;
  color: var(--title);
}
nav a span {
  font-weight: bold;
}
nav .sidenav-trigger {
  margin: 0;
}

/* note styles */
.notes {
  margin-top: 20px;
}
.card-panel.note {
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0px 1px 3px rgba(90, 90, 90, 0.1);
  display: grid;
  grid-template-columns: 2fr 5fr 1fr 1fr;
  grid-template-areas: "image details options delete";
  position: relative;
}

.more-pages {
  cursor: pointer;
}
.move-icon {
  cursor: move;
}
.move-icon:hover i {
  cursor: move;
}
.move-icon:active i {
  cursor: grabbing;
}

.note-title {
  font-weight: bold;
}
.note img {
  grid-area: image;
  max-width: 60px;
}
.note-details {
  grid-area: details;
  margin-top: 6px;
  font-size: 0.8em;
}
.note-options {
  grid-area: options;
  position: absolute;
  vertical-align: auto;
  margin-top: auto;
  margin-bottom: auto;
  font-size: 0.8em;
}
.note-delete {
  grid-area: delete;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.note-delete i {
  font-size: 18px;
}
.note-delete:hover i {
  cursor: pointer;
}

.trunc {
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 95%;
  white-space: nowrap;
}

/* form-styles */
.add-btn {
  background: var(--title) !important;
}
input {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.side-form button {
  background: var(--title);
  box-shadow: 1px 1px 3px rgba(90, 90, 90, 0.2);
}
form .input-field {
  margin-top: 30px;
  text-transform: uppercase;
}

.error {
  color: white;
}

#errorText {
  padding: 5px;
}

.web-icon {
  max-width: 48px;
  max-height: 48px;
}

.notificationBox {
  float: right;
  bottom: 0px;
  right: 0px;
  background-color: white;
}

.notificationBoxField {
  margin: 5px;
  background-color: antiquewhite;
  border-radius: 2%;
}

.shadow-box {
  background-color: rgb(190, 190, 190);
  border: 1px solid black;
  padding: 6px;
  border-radius: 20px;
  box-shadow: 2px 2px rgba(0, 0, 0, 0.5);
}

button {
  background-color: rgb(190, 190, 190);
  border: 1px solid black;
  padding: 6px;
  border-radius: 20px;
  transition-duration: 0.5s;
}
button:hover {
  transition-duration: 0.5s;
  background-color: azure;
  border-radius: 10px;
}
</style>
