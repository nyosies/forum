<template>
  <div>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    <el-table :data="dataList" border style="width: 100%" >
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="author" label="作者" width="120"></el-table-column>
      <el-table-column prop="title" label="标题" width="150"></el-table-column>
       <el-table-column prop="categoryName" label="分类" width="120"></el-table-column>
       <el-table-column prop="content" label="内容" width="120" :show-overflow-tooltip="true"></el-table-column>
       <el-table-column prop="pic" label="图片" width="120">
          <template  slot-scope="scope">
               <img class="imgs" :src="scope.row.pic" alt="暂无图片">
          </template>
       </el-table-column>
      <el-table-column prop="create_at" label="发布时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 文字提示 -->
          <el-tooltip content="编辑文章" placement="top">
            <el-button
              type="primary"
              icon="el-icon-setting"
              size="mini"
              @click="userEdit(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip content="删除文章" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="articleDel(scope.row)"></el-button>
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
      dataList: [],
      pageNo: 1,
      pageSize: 8,
      total: 1
    };
  },
  created() {
    this.articleTotal();
    this.haldleChange();
  },
  methods: {
    articleTotal() {
      this.$req.article.allArticle({
        success: res => {
          this.total = Math.ceil(res.data / (this.pageSize || 8));
        }
      });
    },
    userEdit(v) {
      console.log(v);
    },

    articleDel(v) {
      let aid = v.articleID ? v.articleID : null;
      this.$req.admin.deleteArticle({
        data: { aid },
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
        pageSize: this.pageSize || 8,
         iscategory:true
      }
      this.$req.article.pagination({
        data: data,
        success: res => {
          if (res.code == 200) {
            console.log(res);
            this.dataList = res.data;
          }
        }
      });
    }
  }
};
</script>
<style scoped>
    .imgs{
        width: 52px;
        height:36px;
    }
</style>