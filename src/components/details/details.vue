<template>
  <div class="details">
    <NavBar></NavBar>
    <!-- <h1 style="paddingTop:80px">{{$route.query.articleId}}</h1> -->
    <div class="article">
      <mavon-editor
        style="height: 100%"
        :ishljs="true"
        v-model="article.content"
        :defaultOpen="'preview'"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      ></mavon-editor>
    </div>
  </div>
</template>
<script>
import NavBar from "../navHead";
export default {
  components: { NavBar },
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
  }
};
</script>

<style lang="less" scoped>
.v-note-wrapper {
  z-index: -1 !important;
}
.article {
  margin-top: 60px;
}
</style>