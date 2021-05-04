<template>
  <!-- update note side nav -->
  <div id="update-form" class="sidenav side-form z-depth-5 col s12 l4">
    <form id="updateForm" class="update-note container section input-form">
      <h6>Update Note</h6>
      <div class="divider"></div>
      <div class="input-id" hidden="true">
        <label class="active" for="updateNoteId">note id</label>
        <input id="updateNoteId" type="text" class="validate" />
      </div>
      <div class="input-title">
        <label class="active" for="updateNoteTitle">Note Title</label>
        <input id="updateNoteTitle" type="text" class="validate" />
      </div>
      <div class="input-details">
        <label class="active" for="updateNoteBody">Details</label>
        <!-- oninput="auto_grow(this)" -->
        <textarea
          rows="10"
          cols="40"
          id="updateNoteBody"
          type="text"
          class="validate materialize-textarea"
        >
        </textarea>
      </div>

     
        <label class="active" for="updateNoteReminder">Set a reminder....</label>
        <el-row>
          <el-col :span="22">
            <flat-pickr id="updateNoteReminder" ref="datePicker" v-model="date" :config="flatpickr_config">
            </flat-pickr>
          </el-col>
          <el-col :span="2">
            <i @click="clearReminder" class="material-icons">delete_outline</i>
          </el-col>
        </el-row>
      
      

      <div class="input-wallpaper" hidden="true">
        <input id="updateNoteWallpaper" type="text" value="white" />
        <label for="updateNoteWallpaper">Background-colour</label>
      </div>
      <div class="input-rank" hidden="true">
        <input id="updateNoteRank" type="text" value="parent" />
        <label for="updateNoteRank"></label>
      </div>

      <div>
        <el-row>
          <el-col :span="24">
            <button id="updateNoteButton" class="btn-small sidenav-close">
              Update Note
            </button>
          </el-col>
        </el-row>
      </div>
    </form>
  </div>
  <!-- END-OF update note side nav -->
</template>

<script>
import flatPickr from "vue-flatpickr-component";
// import $ from "jquery";

export default {
  data: () => {
    let date = null;
    const flatpickr_config = {
      enableTime: true,
      minDate: "today",
      altInput: true,
      altFormat: "F j, Y H:i K",
      dateFormat:"Y-m-d H:i",
      disableMobile: false,
      // inline: true,
      
    };
    return { flatpickr_config, date };
  },
  components: {
    flatPickr,
  },
  setup() {
    function clearReminder() {
      // document.getElementById("updateNoteReminder").flatpickr().value="";
      
      document.getElementById("updateNoteReminder").value = "";
    }
    /**makes the textarea increase height as user types */
    function auto_grow(element) {
      element.style.height = "10px";
      element.style.height = element.scrollHeight + "px";
    }
    return {
      clearReminder,
      auto_grow,
    };
  },
};
</script>
