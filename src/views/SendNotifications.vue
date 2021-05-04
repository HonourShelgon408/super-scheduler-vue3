
<template>
  <el-row>
    <el-col :offset="6" :span="12">
      <form id="notification-form" style="margin-top:30px">
          <div class="input-field">
              <input v-model="info" id="information" type="text">
              <label for="information">What would you like to say?</label>
          </div>
          <div>
              <button @click="sendNotification">Send Notification</button>
          </div>
      </form>
      <el-row v-if="justSubmitted" style="margin-top: 30px">
        <el-col :span="24">
          <i class="shadow-box">Notification Sent!</i>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from "vue";
import { auth, realtime } from '@/firebase/database'
import { inject } from 'vue'

export default {
  setup() {
  const info = ref("");
    const justSubmitted = ref(false);
    const messaging = inject('messaging');
    // console.log(messaging);

    function sendNotification(e) {
      e.preventDefault();

      realtime.ref("/notifications").push({
        user: auth.currentUser.uid,
        message: info.value,
        img: auth.currentUser.photoURL,
      });

      info.value = "";

      justSubmitted.value = true;
      setTimeout(() => {
        justSubmitted.value = false;
      }, 2000);

    }

    return {
      sendNotification,
      info,
      justSubmitted
    }
  },
};
</script>

<style scoped>


</style>