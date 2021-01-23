<template>
  <div>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="account" label="账号" width="150"></el-table-column>
      <el-table-column prop="role" label="角色" width="150"></el-table-column>
      <el-table-column prop="create_at" label="注册时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 文字提示 -->
          <el-tooltip content="编辑用户" placement="top">
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="mini"
              @click="userEdit(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除用户" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="userDel(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :page-count="total"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        @current-change="haldleChange()"
      ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getUser: [],
      dataList: [],
      pageNo:1,
      pageSize:8,
      total:1
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
 getUserData() {
   this.$req.admin.getUser({
        success:res=>{
        this.getUser=res.data
        this.haldleChange()
      }});
    },
    userEdit(v) {
      console.log(this.getUser[0].count)
      console.log(v);
    },
    userDel(v) {
      console.log(v);
      let uid = v.uid ? v.uid : null;
      console.log(uid);
      this.$req.admin.deleteUser({
        data: { uid },
        success: res => {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "success"
          });
          //重新加载数据
          this.haldleChange();
        }
      });
    },
    haldleChange() {
      let data = {
        pageNo: this.pageNo || 1,
        pageSize: this.pageSize || 8
      };
      this.total = Math.ceil(this.getUser[0].count / (this.pageSize || 8));
      this.$req.admin.userPagination({
        data: data,
        success: res => {
          if (res.code == 200) {
            console.log(res)
            this.dataList = res.data;
          }
        }
      });
    }
  }
};
</script>