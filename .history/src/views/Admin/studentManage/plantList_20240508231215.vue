<template>
  <div >
    <el-table border stripe :data="tableData" v-loading="loading">
      <el-table-column fixed prop="id" label="编号"> </el-table-column>
      <el-table-column prop="name" label="名字"> </el-table-column>
      <el-table-column prop="img" label="图片">

        <template slot-scope="scope">
  
        <img :src="scope.row.img" />
      </template>
      </el-table-column>
      <el-table-column prop="introduction" label="介绍"> </el-table-column>
      <el-table-column prop="content" label="内容"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-popconfirm
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="el-icon-info"
            icon-color="red"
            title="删除不可复原"
            @confirm="deleteStudent(scope.row)"
          >
            <el-button slot="reference" type="text">删除</el-button>
          </el-popconfirm>
          <el-button
            :style="{
              marginLeft: '12px',
            }"
            @click="editor(scope.row)"
            type="text"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="changePage"
    >
    </el-pagination> -->
  </div>
</template>

<script>
import { plant } from "@/api/plant";

export default {
  data() {
    return {
      tableData: [
        {
          sid: 1,
          sname: "jun",
          password: "123123",
        },
      ],
      pageSize: 1,
      total: 99,
      ruleForm: null,
      tmpList: null,
      loading: false,
    };
  },
  methods: {
    getList() {
      this.loading = true;
      plant({
        action: "getPlantList",
        categoryId: "",
      }).then((res) => {
        console.log(res, "res");
        this.tableData = res.data.data;
        this.loading = false;
      });
    },
    deleteStudent(row) {
      plant({
        action: "deletePlant",
        id: row.id,
      }).then((res) => {
        console.log(res, "res");
        this.$message.success("删除成功");
        this.getList();
      });
    },
    changePage(page) {},
    editor(row) {
      this.$router.push({
        path: "/editorPlant",
        query: {
          id: row.id,
        },
      });
    },
  },

  created() {
    this.getList();
  },
};
</script>
