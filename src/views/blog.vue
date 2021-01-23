<template>
  <div class="blog">
    <NavBar color="#fff" :headbgColor="headbgColors" logoColor="#fff" boxShadow="5px 5px 5px #ddd"></NavBar>
    <div class="box-card">
      <div class="article_box">
        <!-- <el-card class="search_card" shadow='never' :body-style="{padding:'13px'}">  -->
        <div class="search_card">
          <el-row :gutter="10">
            <el-col :xs="18" :sm="12">
              <el-input
                placeholder="请搜索需要的内容"
                prefix-icon="el-icon-search"
                v-model="searchVal"
                :size="size"
                @change="haldleSearch"
                maxlength="20"
                :clearable="true"
              ></el-input>
            </el-col>
            <el-col :xs="4" :sm="8">
              <el-button
                icon="el-icon-search"
                type="primary"
                circle
                @click="haldleSearch"
                :size="size"
              ></el-button>
            </el-col>
          </el-row>
        </div>
        <!-- </el-card> -->
        <!-- category -->
        <div class="article-category">
          <Nkcategory @handleChageTag="handleSwitchTag" :categoryData="getCategory" />
        </div>
        <!-- 设置搜索与博客列表切换 -->
        <component
          class="bk"
          :is="isComponent"
          :articleList="articleList"
          :total="total"
          :flag="flag"
          :title="title"
          @haldleChange="haldleChange"
        ></component>
        <!-- <blog-item
          :articleList="articleList"
          :total="total"
          @haldleChange="haldleChange"
        ></blog-item>-->
      </div>
    </div>
  </div>
</template>
<script>
import blogItem from "@/components/blogItem/blogItem";
import NavBar from "../components/navHead";
import Nkcategory from "../components/category/category";
import fun from "@/fun/fun";
export default {
  components: { NavBar, blogItem, Nkcategory },
  data() {
    //#ced6e0
    return {
      headbgColors: "linear-gradient(to right,#e66465, #9198e5)",
      searchVal: "",
      total: 1,
      articleList: [],
      isComponent: "blogItem",
      screenWidth: document.body.clientWidth,
      size: "small",
      flag: true,
      title: "BLOG",
      getCategory: [],
      categoryList: []
    };
  },
  created() {
    console.log('这是blog主件')
    this.articleTotal();
    this.haldleChange();
    this.getCategoryValue();
  },
  mounted() {
    window.addEventListener("resize", fun.debounce(this.watchResize, 1000));
  },
  activated(){
    console.log('这是actiated生命周期')
  },
  watch: {
    screenWidth: {
      immediate: true,
      handler(newVal, old) {
        if (newVal < 500) {
          this.size = "mini";
        } else {
          this.size = "medium";
        }
      }
    }
  },
  methods: {
    watchResize() {
      this.screenWidth = document.body.clientWidth;
      // console.log(window)
    },

    handleClick(tab, event) {},
    /***
     *  @getCategoryValue 获取分类
     *  数据自动绑定
     */
    getCategoryValue() {
      this.$req.commpontThis(this).article.getCategory();
    },
    articleTotal() {
      this.$req.article.allArticle({
        success: res => {
          this.total = Math.ceil(res.data / (this.pageSize || 5));
        }
      });
    },
    async haldleChange(v) {
      let data = {
        pageNo: v?.pageNo || 1,
        pageSize: v?.pageSize || 5
      };
      this.$req.article.pagination({
        data: data,
        success: res => {
          if (res.data.length > 0) {
            this.articleList = res.data;
            console.log(this.articleList);
            this.flag = true;
          } else {
            this.flag = false;
          }
        }
      });
    },
    haldleSearch() {
      // console.log(this.searchVal);
      let value = this.searchVal.trim();
      if (value == "") {
        this.articleTotal();
        this.haldleChange();
        return alert("数据不能为空");
      }
      let params = {
        context: this.searchVal.trim() || ""
      };
      this.$req.article.searchArticle({
        data: params,
        success: res => {
          console.log("搜索的数据", res);
          if (res.data.length > 0) {
            this.total = Math.ceil(res.data.length / (this.pageSize || 5));
            this.articleList = res.data;
            this.flag = true;
            this.title = "搜索内容";
            // this.$route.meta.iscache = true
          } else {
            this.flag = false;
            //  this.$route.meta.iscache = false
          }
        }
      });
    },
    handleSwitchTag(item, tag) {
      console.log("这是分类id", item, tag);
      if (item == 1 && tag == "all") {
        this.haldleChange();
        this.articleTotal();
        this.title = tag.toUpperCase();
        return;
      }
      let params = { id: item };
      this.$req.commpontThis(this).article.categoryList({
        data: params,
        success: res => {
          if (res.data.length > 0) {
            this.flag = true;
          } else {
            this.flag = false;
          }
          this.articleList = res.data;
          this.total = Math.ceil(res.data.length / (this.pageSize || 5));
          this.title = tag.toUpperCase();
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/color/style.less");
.el-tabs {
  margin: 20px 0;
}
.el-card {
  margin-bottom: 28px;
}
.search_card {
  position: relative;
  padding-bottom: 10px;
  //  margin-bottom:6px ;
}
.search_card::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(#84fab0, #8fd3f4);
  height: 3px;
  border-radius: 3px;
}
.blog {
  width: 100%;
  background: #fff;
  padding-top: @topH;
  // margin:0 20px 20px 20px;

  .box-card {
    display: flex;
    width: 50%;
    margin: 0 auto;
    //  margin:0 20px 20px 20px;
    .article-category {
      box-sizing: border-box;
      margin: 0;
      // height: 420px;
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
      .article-category {
        box-sizing: border-box;
        width: 100%;
        margin: 0;
      }
    }
  }
}
</style>