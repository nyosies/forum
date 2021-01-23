<template>
  <div class="blog-item">
    <!-- <el-tabs v-model="activeName">
    <el-tab-pane label="热门文章" name="first">-->
    <el-card shadow="always" v-if="flag" :body-style="{padding:'13px'}" >
      <h2 class="title">{{title?title:'BLOG'}}</h2>
      <el-divider>
      </el-divider> 
      <div
        class="hotArticle_box"
        v-for="item in articleList"
        :key="item.articleID"
        @click="goDetails(item.articleID)"
      >
        <div class="hotArticle_head">
          <b>{{item.title?item.title:'文章'}}</b>
          <div class="hotArticle_body">
            <span class="font_time">{{item.create_at?item.create_at:2020-10-12}}</span>
            <!-- <i class="iconfont icon-icon-"></i> -->
            <img src="../../assets/img/see.png" alt srcset />
            <span>{{item.look_at}}</span>
          </div>
        </div>
        <div class="content">
          <div class="content_img">
            <img :src="item.pic" alt="加载失败" v-if="item.pic?true:false" />
            <img src="../../assets/logo.png" alt srcset v-else />
          </div>
          <p class="article_content">{{item.content}}</p>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :page-count="total"
        :current-page.sync="pageNo"
        :page-size="pageSize"
        @current-change="haldleChange()"
      ></el-pagination>
    </el-card>
    <el-card v-else>
      <div class="notData">
        <h1 class="title">{{title?title:'BLOG'}}</h1>
        <el-divider>
      </el-divider> 
        <h2>暂无数据...........</h2>
        <!-- 分页 -->
        <!-- <el-pagination
          layout="prev, pager, next"
          :page-count="total"
          :current-page.sync="pageNo"
          :page-size="pageSize"
          @current-change="haldleChange()"
        ></el-pagination> -->
      </div>
    </el-card>
    <!-- </el-tab-pane>
      <el-tab-pane label="全部文章" name="second">
        <div class="allArticle">
          <h1>123456</h1>
        </div>
      </el-tab-pane>
    </el-tabs>-->
  </div>
</template>
<script>
export default {
  props: {
    articleList: {
      type: Array,
      default: []
    },
    total: {
      type: Number | String,
      default: 2
    },
    title: {
      type: String,
      default: ""
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageNo: 1,
      pageSize: 5,
      activeName: "first"
    };
  },
  created() {},

  methods: {
    goDetails(i) {
      // console.log(i);
      // this.$router.push({path:`hot/details/${i}`})
      this.$router.push({ path: "/hot/details", query: { articleId: i } });
    },
    haldleChange() {
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      this.$emit("haldleChange", params);
    }
  }
  // computed: {
  //   curPages:()=>{
  //    return 1>0?true:false
  //   }
  // },
};
</script>
<style lang="less" scoped>
@import url("../../assets/color/color.less");

.hotArticle_box {
  margin: 20px 20px 20px 16px;
  border-bottom: 1px solid #ddd;
  font-family: @fontType;
  &:first-child {
    margin: 0;
  }
  .hotArticle_head {
    display: flex;
    margin-bottom:12px;
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
    font-size: 13px;
    width: 100%;
    margin-bottom: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:6;
    overflow: hidden;
    span {
      font-size: @miniFont;
    }
  }
}

.content {
  display: flex;
  .content_img {
    box-sizing: border-box;
    width: 120px;
    height: 90px;
    margin: 0 10px 10px 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.hotArticle_body {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: @miniFont;
    &:first-child {
      margin-right: 12px;
    }
  }
  img {
    margin-right: 6px;
    width: 16px;
    height: 16px;
  }
}
.notData {
  h2 {
    padding: 120px 0;
    text-align: center;
  }
}
@media screen and (max-width: 600px) {
  .blog-item {
    .hotArticle_box {
      font-size: @miniFont;
      b {
        width: 93px;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .title{
      font-size: @Font;
    }
    .el-divider--horizontal{
      margin: 5  px  0 !important;
    }
  }
}
</style>