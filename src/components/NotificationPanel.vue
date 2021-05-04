<template>
  <div
    style="background-color: #bbdaff"
    @click="closeBanner"
    v-if="hasNotification"
  >

  <el-row>
    <el-col class="centre-notification-icon" :offset=5 :span=3><i class="material-icons">notifications_active</i></el-col>
    <el-col :span=10>
    <el-row>
      <el-col><i>{{ notificationMessage.title }}</i></el-col>
       <el-col>{{ notificationMessage.body }}</el-col>
    </el-row>
    </el-col>
    <el-col class="centre-notification-icon" :span=4><i class="material-icons">close</i></el-col>
  </el-row>

    <!-- <el-row>
      <el-col :offset="3" :span="1">
        <i class="material-icons">notifications_active</i>
      </el-col>

      <el-row class="title">
        <el-col :span="24">
          <i>{{ notificationMessage.title }}</i>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          {{ notificationMessage.body }}
        </el-col>
      </el-row>
    </el-row> -->
  </div>
</template>

<script>
export default {
  emits: ["closeBanner", ],
  props: ["hasNotification", "notificationMessage"],
  methods: {
    closeBanner() {
      this.$emit("close-banner", false);
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
template {
  font-size: 10pt;
}
.title {
  font-size: 12pt;
}
.centre-notification-icon{
  margin-top:7px;
}
</style>