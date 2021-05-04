<template>
  <div class="home">
    <!-- main content for the page -->
    <div class="notes container grey-text text-darken-1" id="content">
      <div class="noteSect" id="priority"></div>
      <div class="noteSect" id="overview"></div>
    </div>
    <!-- END-OF main content for the page -->

    <!-- add button for creating new notes -->
    <div id="addButtonDiv" class="center">
      <a
        id="addButton"
        class="btn-floating btn-small add-btn sidenav-trigger waves-effect waves-light"
        data-target="side-form"
      >
        <i class="material-icons">add</i>
      </a>
    </div>
    <!-- end of add button div -->
  </div>
</template>

<script>
import { db, auth, messaging, realtime } from "@/firebase/database";
import { ref } from "vue";
import firebase from "firebase/app";
import M from "materialize-css";
import $ from "jquery";

export default {
  props: ["hasNotification"],
  methods: {
    openSignInPannel() {},
  },
  beforeMount: function () {
    // console.log("beforemount");
    //     db.enablePersistence().catch(function(error){
    //     if(error.code == "failed-precondition"){
    //         console.log("Persistence failed"); //multiple tabs would cause this error
    //     }
    //     else if(error.code = "unimplemented"){
    //         console.log("Persistence is not available"); //no browser support
    //     }
    //     else {
    //         console.log("Other peristence error", error.code, error);
    //     }
    // });
  },
  mounted: function () {
    const fontSize = 12;
    //content defined on db.js
    let letters;
    letters = window.innerWidth / fontSize - 10;
    // console.log("mounted");
    // console.log("date.value", date.value, this.user);

    M.AutoInit();
    //db variable instatntiated in index.html
    //snapshot of firebase db

    //collection gets reference to a firebase database
    //snapshot acts as a listener to return the current state of the database

    auth.onAuthStateChanged(handleUserData);

    async function getuserData() {
      let userEmail = "";
      let user = "";
      user = await auth;
      if (user) {
        userEmail = user.currentUser.email;
        db.collection("notes")
          .where("uid", "==", userEmail)
          .orderBy("title")
          .onSnapshot(function (snapshot) {
            snapshot.docChanges().forEach(function (change) {
              const dbChange = change.type;
              // console.log(dbChange);
              if (dbChange === "added") {
                console.log("note found" /*, " ", change.doc.id */);
                addNote(change.doc.data(), change.doc.id);
              }
              // else if(dbChange === 'modified'){
              //     console.log(dbChange, " " , change.doc.id, change.doc.data());
              //     updateNote(change.doc.data(),change.doc.id);
              // }
              else if (dbChange === "removed") {
                console.log("note removed" /*, " ", change.doc.id */);
                deleteNote(change.doc.id);
                //line63 deletes the note from the database using the bin icon as the trigger
              }
              //c onsole.log(change, " ", change.doc.data()), " ", change.doc.id;

              // var source = snapshot.metadata.fromCache
              //   ? "local cache"
              //   : "server";
              // console.log("Data came from " + source);
            });
          });
      }
    }

    function handleUserData(user) {
      let contentRef = document.getElementById("content");
      let addButtonRef = document.getElementById("addButtonDiv");
      if (user) {
        contentRef.innerHTML = "";
        addButtonRef.hidden = false;
        getuserData();
      } else {
        addButtonRef.hidden = true;
        contentRef.innerHTML =
          "<b><i><span style='background-color: lightgrey' class='sidenav-trigger' data-target='side-menu'>Sign in </span><span> to make use of the app</i></b></span>";
      }
    } /*addnote*/

    function clearAddNoteFields() {
      return new Promise((resolve, reject) => {
        document.getElementById("addNoteReminder").value = "";
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteBody").value = "";
        resolve();
      });
    }
    document.getElementById("addButton").addEventListener("click", function () {
      let clearResult = clearAddNoteFields();

      clearResult.then(() => {
        console.log("note form ready");
      });
    });

    /** add new note object to the database */
    const form = document.querySelector("#addForm");
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      if (form.noteTitle.value != null || form.noteBody.value != null) {

        console.log(form.noteTitle.value, form.noteTitle.value != null, form.noteBody.value, form.noteBody.value != null)
        let uid = auth.currentUser.uid;
        let token = getUserToken(uid);
        let dateNum;
        let adminTime;
        token.then((token) => {
          let time = form.addNoteReminder.value;
          const note = {
            title: form.noteTitle.value /** id of input in form */,
            body: form.noteBody.value,
            wallpaper: form.wallpaper.value,
            rank: form.rank.value,
            uid: auth.currentUser.email,
          };
          if (time != null && time.length >= 1) {
            dateNum = Date.parse(time);
            adminTime = firebase.firestore.Timestamp.fromMillis(
              dateNum /** - 3600000 */
            );
            note.status = "scheduled";
            note.token = token;
            note.performAt = adminTime;
          }
          console.log(note);
          db.collection("notes")
            .add(note)
            .catch(function (error) {
              console.log(error);
            });
          /**wipe the note for the next note */
          form.noteTitle.value = "";
          form.noteBody.value = "";
        });
      }
    });

    /** update note */
    let updateForm = document.querySelector("#updateForm");
    updateForm.addEventListener("submit", async (evt) => {
      // defaultFormValues(updateForm);
      evt.preventDefault(); /**using the ID from the update form (hidden=true) to update the database with custom function */

      /**call the update function and clear the form */
      updateRecord(updateForm);
    });

    async function updateRecord(thisUpdateForm) {
      let uid = await auth.currentUser.uid;
      let token = getUserToken(uid);
      token
        .then((data) => {
          updateFirestoreRecord(thisUpdateForm, uid, data);
        })
        .then(() => {
          updateNoteDOM(thisUpdateForm);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    async function getUserToken(uid) {
      return new Promise((resolve, reject) => {
        let data;
        realtime
          .ref("/tokens/" + uid)
          .child("token")
          .on("value", (snapshot) => {
            data = snapshot.val();
            resolve(data);
          });
      });
    }

    async function updateFirestoreRecord(updateForm, uid, token) {
      return new Promise((resolve) => {
        let adminTime;
        let dateNum;
        const time = updateForm.updateNoteReminder.value;
        // console.log("time", time.length, time != null);
        let updateNote = {
          title: updateForm.updateNoteTitle.value,
          body: updateForm.updateNoteBody.value,
          wallpaper: updateForm.updateNoteWallpaper.value,
          rank: updateForm.updateNoteRank.value,
        };

        if (time != null && time.length >= 1) {
          dateNum = Date.parse(time);
          adminTime = firebase.firestore.Timestamp.fromMillis(
            dateNum /** - 3600000 */
          );
          updateNote.status = "scheduled";
          updateNote.token = token;
          updateNote.performAt = adminTime;
          console.log("time is ok", time, dateNum, adminTime);
        }

        // console.log(updateNote.token, updateNote.performAt);
        if (
          updateForm.updateNoteTitle != null ||
          updateForm.updateNoteBody != null
        ) {
          // console.log(updateNote);
          db.collection("notes")
            .doc(updateForm.updateNoteId.value)
            .update(updateNote);
          resolve("all updated");
        }
      });
    }

    async function updateNoteDOM(updateForm) {
      return new Promise((resolve, reject) => {
        const noteTitle = document.querySelector(
          `.note-title[data-id='${updateForm.updateNoteId.value}']`
        );
        const noteBody = document.querySelector(
          `.note-body[data-id='${updateForm.updateNoteId.value}']`
        );
        const note = document.querySelector(
          `.note[data-id='${updateForm.updateNoteId.value}']`
        );
        const noteReminder = note.getElementsByTagName("I")[1];

        noteReminder.innerHTML = "notifications_active";
        if (updateForm.updateNoteTitle.value.length > 0) {
          noteTitle.innerHTML = updateForm.updateNoteTitle.value.substring(0, letters);
        }
        if (updateForm.updateNoteBody.value.length > 0) {
          noteBody.innerHTML = updateForm.updateNoteBody.value.substring(0, letters);
        }

        // document.getElementById("updateNoteReminder").flatpickr().clear();
        console.log("finished updating note");
        updateForm.updateNoteId.value = "";
        updateForm.updateNoteTitle.value = "";
        updateForm.updateNoteBody.value = "";
        updateForm.updateNoteReminder.value = "";
        updateForm.updateNoteWallpaper.value = "";
        updateForm.updateNoteRank.value = "";

        resolve("dom updated");
      });
    }

    /**delete note */
    const notesContainer = document.querySelector(".notes");
    notesContainer.addEventListener("click", (e) => {
      /**listen for a click anywhere in the notes area, then if that click was in the I tag for the delete, take the ID and send a delete request to Firestore */
      // console.log(e.target); //what has been clicked on in the DOM
      const tagName = e.target.tagName;
      const isDeleteButton = e.target.classList.contains("delete-icon");
      const isDetails =
        e.target.classList.contains("note-title") ||
        e.target.classList.contains("note-body");
      const isBellIcon = e.target.classList.contains("bell-icon");

      if (
        tagName === "I" &&
        tagName != null &&
        tagName != undefined &&
        isDeleteButton === true
      ) {
        const id = e.target.getAttribute("data-id");
        //c onsole.log("id: " + id);
        db.collection("notes").doc(id).delete(); /**deletenote */
      }
      if (isDetails) {
        const id = e.target.getAttribute("data-id");
        getNoteFromFirebase(id, populateUpdateForm);
      }
      if (isBellIcon) {
      }
    });

    function getNoteFromFirebase(id, updateFormCallback) {
      let data = "";
      var myDoc = db.collection("notes").doc(id);
      myDoc
        .get()
        .then(function (doc) {
          if (doc.exists) {
            data = doc.data();
            let dataObj = { id: id, stats: data };
            updateFormCallback(dataObj);
          } else {
            console.log("doc doesnt exist");
            data = [];
          }
        })
        .catch(function (error) {
          console.log("Error getting document: ", error);
        });
    }

    function populateUpdateForm(data) {
      // console.log("updateform, data: ", data);
      const updateForm = document.querySelector("#updateForm");
      updateForm.updateNoteTitle.classList.add("active");
      updateForm.updateNoteBody.classList.add("active");
      updateForm.updateNoteId.value = data.id;
      updateForm.updateNoteTitle.value = data.stats.title;
      updateForm.updateNoteBody.value = data.stats.body;
    }

    /*==================
        
        Query Selectors
        
        ===================*/

    const priority = document.querySelector("#priority");
    const overview = document.querySelector("#overview");

    /*==================
        
        Functions
        
        ===================*/

    /** insert line breaks into string */
    function convertBreaks(str) {
      for (var i = 0; i < str.length; i++) {
        if (str[i].match(/\n/g) || []) {
          str[i] = String.fromCharCode(13);
        }
      }
    }

    /**render note to the DOM */
    function addNote(data, id) {
      let html = ``;

      // var isFirefox = typeof InstallTrigger !== "undefined";
      // var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

      const title = data.title.substring(0, letters);
      const body = data.body.substring(0, letters);
      const reminder = data.status; //completed, failed, scheduled

      html = `
        <div class="card-panel row note hoverable" data-id='${id}'>
            <div class="note-move">
                <i class="material-icons move-icon">toc</i>
            </div>
            <div class="note-details">
        `;

      if (title.length >= 1) {
        html += `<div class="note-title sidenav-trigger trunc" data-id='${id}' data-target="update-form">${title}</div>`;
      }
      if (body.length >= 1) {
        html += `<div class="note-body sidenav-trigger trunc" data-id='${id}' data-target="update-form">${body}</div>`;
      }
      html += `</div> <!-- closing note-details class div -->`;

      if (reminder == "scheduled") {
        html += `
        <div class="note-options">
            <i class="material-icons">notifications_active</i>
        </div>
        `;
      } else {
        /**either failed or completed */
        html += `
        <div class="note-options">
            <i class="material-icons">notifications_none</i>
        </div>
        `;
      }
      html += `<div class="note-delete">
                <i class="material-icons delete-icon" data-id="${id}">delete_outline</i>
            </div>
        </div>`;
      let contentRef = document.getElementById("content");
      contentRef.innerHTML += html;
    }

    /** derender note from the DOM  */
    function deleteNote(id) {
      if (id != null && id != undefined) {
        const note = document.querySelector(
          `.note[data-id='${id}']`
        ); /**css attribute selector=> get element of class with attribute that is 'data-id=*insert id of element*' */
        note.remove(); /**DOM method to remove childNode */
      }
    }

    // nav menu
    const menus = document.querySelectorAll(".side-menu");
    M.Sidenav.init(menus, { edge: "right", draggable: false });
    // add note form
    const forms = document.querySelectorAll(".side-form");
    M.Sidenav.init(forms, { edge: "left", draggable: false });

    // $('.tooltipped').tooltip();
    /*adds active class to an element when someone is typing in it - moves the placeholder to above the typing area*/
    M.updateTextFields();

    /*==================
            
    FORM SUBMISSION WITH ENTER BUTTON
    
    ===================*/

    // document.getElementsByClassName('input-form').addEventListener('keypress', (key) => {
    //     if(key.keycode == 13){
    //         e.preventDefault();
    //     }
    // });

    $(document).ready(function () {
      $("#totalContent").hide();
      $("#shortContent").show();
      $("div#nav-tail").hide();
      $("div#nav-tail").addClass("hidden");

      // $("div#nav").mouseleave(function(){
      //     $("div#nav-tail").hide("fast");
      // });
      // $("div#nav").mouseenter(function(){
      //     $("div#nav-tail").show("fast");
      // });

      $("#shortListHeader").click(function () {
        $("#totalContent").hide(function () {
          $("#totalContent").addClass("hidden");
        });
        $("#shortContent").show(function () {
          $("#totalContent").removeClass("hidden");
        });
      });
      $("#totalListHeader").click(function () {
        $("#totalContent").show(function () {
          $("#totalContent").removeClass("hidden");
        });
        $("#shortContent").hide(function () {
          $("#totalContent").addClass("hidden");
        });
      });

      function toggle() {
        if ($("div#nav-tail").hasClass("hidden")) {
          $("div#nav-tail").show();
          $("div#nav-tail").removeClass("hidden");
        } else {
          $("div#nav-tail").hide();
          $("div#nav-tail").addClass("hidden");
        }
      }

      function defaultFormValues(form) {
        const elementsRef = document.getElementById(form).elements;
        for (let i = 0; i < elementsRef.length; i++) {
          elementsRef[i].value = "";
        }
      }
    });

    // https://fontmeme.com/permalink/210310/6443b26e360f1a70b2405bc98c76ddea.png
  },
};
</script>

<style scoped>
</style>
