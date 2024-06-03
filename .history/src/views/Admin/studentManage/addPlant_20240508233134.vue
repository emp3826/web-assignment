<template>
  <div>
    <el-form
      style="width: 60%"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="植物名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="植物图片" prop="img">
        <el-upload
        v-loading="loading"
          class="avatar-uploader"
          ref="upload"
          action="/dev-api/upload.php"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="ruleForm.img" :src="ruleForm.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="植物介绍" prop="introduction">
        <el-input v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="植物描述" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >添加</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { plant } from "@/api/plant";
import { upload } from "@/api/upload";

export default {
  data() {
    return {
      loading:false,
      fileList: [],
      ruleForm: {
        name: "",
        introduction: "",
        content: "",
        create_by: 1,
        img: "",
        categoryId: 0,
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
        introduction: [
          { required: true, message: "请输入介绍", trigger: "change" },
        ],
        content: [{ required: true, message: "请输入内容", trigger: "change" }],
      },
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
      // console.log(upload)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },

    handleSuccess(res) {
      this.loading = false;
      console.log(res);
      this.ruleForm.img = res.data;
      this.$message.success("上传成功!");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          plant({
            action: "addPlant",
            ...this.ruleForm,
          }).then((res) => {
            console.log(res, "res");
            this.$message.success("添加成功");
            this.$router.push({
              path: "/plantList",
            });
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    test() {
      console.log(this.ruleForm);
    },
    handleAvatarSuccess(res, file) {
      // this.form = URL.createObjectURL(file.raw);
      console.log(res, file);
    },
    beforeAvatarUpload(file) {
      this.loading = true;
      return true;
    },
  },
};
</script>
<style scoped>
/* .avatar-uploader {
  border: 1px dashed #d9d9d9;

} */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover;

}
</style>
