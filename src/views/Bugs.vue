<template>
    <el-row>
        <el-col>
            <h2>Bug</h2>
        </el-col>
    </el-row>
</template>

<script>
import { db } from "@/firebase/database";
export default {
  setup() {
    
    const bugs = async () => {
      db.collection("bugs").orderBy;
    };
  },
};
</script>

<style>
</style>