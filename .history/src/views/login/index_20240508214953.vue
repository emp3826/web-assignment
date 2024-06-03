<template>
  <div class="content">
    <el-card class="login-module">
      <div slot="header" class="clearfix">
        <span
          style="
            text-align: center;
            font-size: 20px;
            font-family: 'Microsoft YaHei';
          "
        >
          <p>
            <i class="el-icon-office-building" style="margin-right: 18px"></i
            >植物世界管理后台
          </p>
        </span>
      </div>
      <div>
        <el-tabs v-model="activeName" >
          <el-tab-pane label="登录" name="login">
            <div
              :style="{
                marginTop: '14px',
              }"
            >
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model.number="ruleForm.username"
                    prefix-icon="el-icon-lollipop"
                  ></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                  <el-input
                    v-model="ruleForm.password"
                    placeholder="请输入密码"
                    show-password
                    prefix-icon="el-icon-ice-cream-round"
                  ></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')"
                    >登陆</el-button
                  >
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                  <!-- <el-button type="primary" @click="registerUser">注册</el-button> -->
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="注册" name="register">
            <div
              :style="{
                marginTop: '14px',
              }"
            >
            <el-form
              :model="registerForm"
              :rules="rules"
              ref="registerForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="昵称" prop="name">
                <el-input
                  v-model.number="registerForm.name"
                  prefix-icon="el-icon-lollipop"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input
                  v-model.number="registerForm.username"
                  prefix-icon="el-icon-lollipop"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户密码" prop="password">
                <el-input
                  v-model="registerForm.password"
                  placeholder="请输入密码"
                  show-password
                  prefix-icon="el-icon-ice-cream-round"
                ></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="registerUser('registerForm')"
                  >登陆</el-button
                >
                <el-button @click="resetForm('registerForm')">重置</el-button>
                <!-- <el-button type="primary" @click="registerUser">注册</el-button> -->
              </el-form-item>
            </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
import { login } from "@/api/login";
export default {
  data() {
    return {
      activeName: "login",
      ruleForm: {
        username: "",
        password: "",
      },
      registerForm: {
        username: "",
        password: "",
        name: "",
        is_admin: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    registerUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({ action: "register", ...this.registerForm }).then((res) => {
            console.log(res);
        
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({ action: "login", ...this.ruleForm }).then((res) => {
            console.log(res);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test(forName) {
      console.log(this.ruleForm);
    },
  },
};
</script>

<style scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-color: #c2e1fd;
}
.login-module {
  width: 500px;
  /*height: 325px;*/

  /*border: none;*/
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translateX(-50%);
  text-align: center;
}
</style>
