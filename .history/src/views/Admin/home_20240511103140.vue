<template>
  <div>
    <el-container>
      <el-main>
        <h1>admin home</h1>
        <el-card style="width: 40%">
          <p><i class="el-icon-s-home" style="margin-right: 18px"></i>项目名：植物世界后台管理系统</p>
          <p><i class="el-icon-s-custom" style="margin-right: 18px"></i>开发人员：xxx</p>
          <p><i class="el-icon-location-outline" style="margin-right: 18px"></i>HMU</p>
          <p><i class="el-icon-chat-round" style="margin-right: 18px"></i>开发时间: 2024/5/11</p>
       
        </el-card>
        <logout></logout>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Logout from "@/components/logout";
export default {
  name: "home",
  components: {Logout},
}
</script>

<style scoped>

</style>
