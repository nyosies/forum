<template>
  <div class="blog-item">
    <el-tabs v-model="activeName">
      <el-tab-pane label="热门文章" name="first">
        <el-card shadow="always">
          <!-- <h1>title:vue</h1>
              <p class="article_content">
                原标题：为世界人民探寻发展之路提供途径）
                首先提两个问题：我们所了解的球星，究竟是真实的他，还是被大众传媒塑造出来的刻板形象？决定一个职业球员命运的，是他在竞技场上展示出来的实力，还是跟他留给大家的印象也密切相关？
          </p>-->
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
                <img src="../../assets/logo.png" alt srcset />
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
      </el-tab-pane>
      <el-tab-pane label="全部文章" name="second">
        <div class="allArticle">
          <h1>123456</h1>
        </div>
      </el-tab-pane>
    </el-tabs>
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
      default: "title"
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
};
</script>
<style lang="less" scoped>
@import url("../../assets/color/color.less");

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
    font-size: 13px;
    width: 100%;
    margin-bottom: 15px;
    // height: 200px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
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
  }
}
</style>