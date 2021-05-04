<template>
  <!-- add note side nav -->
  <div id="side-form" class="sidenav side-form z-depth-5 col s12 l4">
    <form id="addForm" class="add-note container section input-form">
      <!-- ID'S IN THIS FORM REFERENCED IN DB.JS TO GET DATA FROM FORM-->
      <h6>Add a New Note</h6>
      <div class="divider"></div>
      <div class="input-field input-title">
        <label class="active" for="noteTitle">Note Title</label>

        <input
          placeholder="ie: do the gardening"
          id="noteTitle"
          type="text"
          class="validate"
        />
      </div>

      <div class="input-field input-details">
        <!--  oninput="auto_grow(this)" -->
        <label class="active" for="noteBody">Details</label>

        <textarea
          placeholder="ie: strim and then mow"
          rows="10"
          cols="40"
          id="noteBody"
          type="text"
          class="validate materialize-textarea"
        >
        </textarea>
      </div>

      <div>
        <label for="addNoteReminder">Set a reminder....</label>
        <flat-pickr
          id="addNoteReminder"
          v-model="date"
          :config="flatpickr_config"
        >
        </flat-pickr>

        <i @click="clearReminder" class="material-icons">delete_outline</i>
      </div>
      <div class="input-field input-wallpaper" hidden="true">
        <input id="wallpaper" type="text" value="white" />
        <label for="wallpaper"></label>
      </div>
      <div class="input-field input-rank" hidden="true">
        <input id="rank" type="text" value="parent" />
        <label for="rank"></label>
      </div>

      <div class="input-field col s6">
        <button class="btn-small sidenav-close" id="createNote">
          Create Note
        </button>
      </div>
    </form>
  </div>
  <!-- END-OF add note side nav -->
</template>

<script>
export default {
  data: function () {
    let date = "";
    const flatpickr_config = {
      enableTime: true,
      minDate: "today",
      altInput: true,
      altFormat: "F j, Y H:i K",
      dateFormat: "Y-m-d H:i",
      disableMobile: false,
      // inline: true,
    };
    return {
      date,
      flatpickr_config
    }
  },
  setup() {
        function clearReminder() {
      // document.getElementById("updateNoteReminder").flatpickr().value="";
      
      document.getElementById("addNoteReminder").value = "";
    }
    return{ 
      clearReminder,
    }
  },
};
</script>