<template>
<div>
  <el-row>
    <el-col :offset=6 :span=12>
      <form id="bugForm">
        <div class="input-field">
          <input id="email" type="email" class="validate"/>
          <label for="email">Email</label>
        </div>
        <div class="input-field">
          <textarea id="comment" class="materialize-textarea" type="text" />
          <label for="comment">information</label>
        </div>
        <div>
            <button @click="submitBugReport">Submit bug report</button>
        </div>
      </form>
    </el-col>
  </el-row>
  <el-row v-if="justSubmitted" style="margin-top:30px">
      <el-col :offset=6 :span=12>
          <i class="shadow-box">Thank you for the feedback!</i>
      </el-col>
  </el-row>
  </div>
</template>

<script>
import {db} from '@/firebase/database'
import {ref} from 'vue'
export default {
    setup(){
        let justSubmitted = ref(false);
        function submitBugReport(e){
            let bugFormRef = document.getElementById("bugForm");
            e.preventDefault();
            let now = new Date();
            
            let bug = {
                email: bugFormRef.email.value,
                information: bugFormRef.comment.value,
                dateAdded: now
            }
            console.log(bug);
            db.collection('bugs').add(bug);
            bugFormRef.email.value = '';
            bugFormRef.comment.value = '';
            justSubmitted.value = true;
            setTimeout(()=>{justSubmitted.value = false}, 2000);
        }
        return {submitBugReport, justSubmitted}
    }
};
</script>

<style>
</style>