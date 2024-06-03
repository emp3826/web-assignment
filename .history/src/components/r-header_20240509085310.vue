<template>
  <div class="box">
    <div class="title">植物世界管理后台</div>
    <div>
      <el-button
        type="text"
        style="color: #333333; font-size: 18px"
        @click="out()"
      >
        退出登录
      </el-button>
      <!-- <el-divider direction="vertical" style="color: #333333"></el-divider> -->
      <!-- <i class="el-icon-paperclip" style="margin-right: 18px"></i> -->
      <!-- <span>{{ currentTerm }}</span> -->
      <el-divider direction="vertical"></el-divider>
      <i class="el-icon-user" style="margin-right: 18px"></i>
      <span>管理员</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "r-header",
  data() {
    return {
      name: null,
      currentTerm: null,
    };
  },
  created() {
    this.name = sessionStorage.getItem("name");
    this.currentTerm = sessionStorage.getItem("currentTerm");
  },
  methods: {
    out() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.box {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
</style>
