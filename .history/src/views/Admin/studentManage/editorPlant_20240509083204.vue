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
      <el-form-item label="植物分类" prop="introduction">
        <el-select v-model="ruleForm.categoryId" placeholder="请选择">
          <el-option label="陆地植物" :value="0"> </el-option>
          <el-option label="水生植物" :value="1"> </el-option>
          <el-option label="藻类" :value="2"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="植物介绍" prop="introduction">
        <el-input v-model="ruleForm.introduction"></el-input>
      </el-form-item>
      <el-form-item label="植物描述" prop="content">
        <el-input type="textarea" v-model="ruleForm.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >保存</el-button
        >
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { plant } from "@/api/plant";

export default {
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        introduction: "",
        content: "",
        create_by: 1,
        img: "",
        categoryId: 0,
      },
      loading: false,
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeAvatarUpload() {
      this.loading = true;
      return true;
    },
    handleSuccess(res) {
      this.loading = false;
      console.log(res);
      this.ruleForm.img = res.data;
      this.$message.success("上传成功!");
    },
    getDetail() {
      plant({
        action: "getPlantById",
        id: this.ruleForm.id,
      }).then((res) => {
        console.log(res);
        this.ruleForm = res.data.data;
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          plant({
            action: "updatePlant",
            ...this.ruleForm,
          }).then((res) => {
            console.log(res, "res");
            this.$message.success("保存成功");
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
  },
  created() {
    this.ruleForm.id = this.$route.query.id;
    console.log(this.$route);
    if (this.ruleForm.id) {
      this.getDetail();
    }
  },
};
</script>
<style>
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
  object-fit: cover;
  display: block;
}
</style>
