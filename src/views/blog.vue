<template>
  <div class="blog">
    <NavBar color="#333" headbgColor="#ced6e0" logoColor="#333"></NavBar>
    <div class="box-card">
      <div class="article_box">
        <!-- <el-card> -->
        <el-row :gutter="10">
          <el-col :xs="18" :sm="12">
            <el-input
              placeholder="请搜索需要的内容"
              prefix-icon="el-icon-search"
              v-model="searchVal"
              :size="size"
            ></el-input>
          </el-col>
          <el-col :xs="4" :sm="8">
            <el-button icon="el-icon-search" circle @click="haldleSearch" :size="size"></el-button>
          </el-col>
        </el-row>
        <!-- </el-card> -->
        <!-- 设置搜索与博客列表切换 -->
        <keep-alive>
          <component
            :is="isComponent"
            :articleList="articleList"
            :total="total"
            @haldleChange="haldleChange"
          ></component>
        </keep-alive>
        <!-- <blog-item
          :articleList="articleList"
          :total="total"
          @haldleChange="haldleChange"
        ></blog-item>-->
      </div>
      <div class="article-ategory">
        <el-card>
          <strong>分类</strong>
          <el-divider>
            <i class="el-icon-mobile-phone"></i>
          </el-divider>
          <pre>node
                    vue
               </pre>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import blogItem from "@/components/blogItem/blogItem";
import NavBar from "../components/navHead";
export default {
  components: { NavBar, blogItem },
  data() {
    return {
      headbgColors: "#2f3542",
      searchVal: "",
      total: 1,
      articleList: [],
      isComponent: "blogItem",
      screenWidth: document.body.clientWidth,
      size: "small"
    };
  },
  created() {
    this.$req.article.allArticle({
      success: res => {
        this.total = Math.ceil(res.data / (this.pageSize || 5));
        //  console.log(this.total)
      }
    });
    this.haldleChange();
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    let arr = [
      { id: 1, title: "首页", path: "/" },
      { id: 2, title: "博客", path: "/blog" },
      { id: 3, title: "时间线", path: "/timeline" },
      { id: 4, title: "关于", path: "/About" }
    ];
    let res = arr.map(item => {
      let _obj = [];
      _obj.push(item.id)
      _obj.push(item.title)
      return _obj;
    });
    console.log(res);
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler(newVal, old) {
        console.log(newVal);
        if (newVal < 500) {
          this.size = "mini";
        } else {
          this.size = "medium ";
        }
      }
    }
  },
  methods: {
    handleClick(tab, event) {},
    haldleChange(v) {
      let data = {
        pageNo: v?.pageNo || 1,
        pageSize: v?.pageSize || 5
      };
      this.$req.article.pagination({
        data: data,
        success: res => {
          this.articleList = res.data;
        }
      });
    },
    haldleSearch() {
      console.log(this.searchVal);
      let params = {
        context: this.searchVal || ""
      };
      this.$req.article.searchArticle({
        data: params,
        success: res => {
          console.log("搜索的数据", res);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.el-tabs {
  margin: 20px 0;
}
.el-card {
  margin-bottom: 28px;
}
.blog {
  width: 100%;
  background: #fff;
  padding-top: 60px;
  // margin:0 20px 20px 20px;

  .box-card {
    display: flex;
    width: 63%;
    margin: 0 auto;
    //  margin:0 20px 20px 20px;
    .article-ategory {
      height: 420px;
    }
    .article_box {
      width: 100%;
      box-sizing: border-box;
      flex: 1;
      .hotArticle_box {
        margin-top: 20px;
        border-bottom: 1px solid #ddd;
        &:first-child {
          margin: 0;
        }
        .hotArticle_head {
          display: flex;
          margin-bottom: 16px;
          b {
            width: 146px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
          div {
            flex: 1;
            display: flex;
            justify-content: flex-end;
          }
        }
        .article_content {
          width: 100%;
          margin-bottom: 20px;
          // height: 200px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
  }
}
@media screen and(max-width: 780px) {
  .blog {
    display: flex;
    // justify-content: center;
    .box-card {
      width: 90%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>