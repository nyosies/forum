<template>
  <div class="details">
    <NavBar></NavBar>
    <!-- <h1 style="paddingTop:80px">{{$route.query.articleId}}</h1> -->
    <div class="article">
      <div>
        <img :src="article.pic" alt srcset />
      </div>
      <mavon-editor
        class="editor"
        style="height: 100%"
        :ishljs="true"
        v-model="article.content"
        :defaultOpen="'preview'"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      ></mavon-editor>
      <!-- 文章底部 -->
      <div class="sign">
       <span>author</span>
       <span> 发布于2020-10-30</span>
      </div>
      <el-card> 
        <h4>## 评论区</h4>
      <nk-comment  @handlerClick='getComment'></nk-comment>
      </el-card>
    </div>
  </div>
</template>
<script>
import NavBar from "../navHead";
import NkComment from '../comment/comment'
export default {
  components: { NavBar,NkComment},
  data() {
    return {
      article: {}
    };
  },
  mounted() {
    let data = {
      id: this.$route.query.articleId
    };
    this.$req.article.getArticle({
      data,
      success: res => {
        res.data.map(item => {
          // console.log(item);
          this.article = item;
        });
      }
    });

    // this.$req.article.pagination({
    //   data:{pageNo:2,pageSize:5},
    //   success: res => {
    //        console.log('kkkk',res)
    //   }
    // });
  },
  methods:{
    getComment(v){
       console.log(v)
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/color/color.less");
.v-note-wrapper {
  z-index: 0 !important;
}
.details {
  z-index: -2;
  // background: #ffffff;
  // min-height: 100vh;
  padding-bottom:20px ;
  background: url('../../assets/img/bgtimg.jpg') no-repeat fixed;;
  // filter: blur(1px);
}
.article {
  width: 60%;
  margin: 45px auto;
  img {
    display: block;
    // min-width: 100%;
    width: 100%;
    height: 400px;
    // background-clip:border-box ;
  }
  .editor {
    width: 100%;
    font-family: "黑体";
  }
  .sign{
    background: #fff;
    // margin-right: auto;
    text-align: right;
    padding:10px;
    color: @graybg;
    font-size: @miniFont;
  }
}

@media screen and (max-width: 700px) {
  .article {
    width: 100%;
    margin: 45px 0 0 0;
    img {
      width: 100%;
      height: 300px;
    }
  }
}
</style>