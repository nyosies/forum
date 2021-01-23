<template>
  <div class="category_main">
    <el-card :body-style="{padding:'13px'}" shadow='hover'>
      <b class="category_tags">category</b>
      <div class="category_box">
        <div
          class="tag"
          v-for="item in categoryData"
          :key="item.categoryId"
          @click="switchTag(item.categoryId,item.categoryName)"
        >{{item.categoryName}}</div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props:{
   categoryData:{
     type:Array | Object,
     default:[]
   }
  },
  methods:{
    switchTag(i,tag){
     this.$emit('handleChageTag',i,tag)
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../assets/color/color.less");
.category_main {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-family: @fontType; 
  //   width: 180px;
  .category_tags{
      display: block;
      margin-bottom:16px;
         font-size: @Font;
  }
  .category_box {
    width: 100%;
    display: flex;
    //  justify-content: space-between;
    flex-flow: wrap;
    .tag {
     cursor: pointer;
      background: #39aeff;
      padding: 4px 10px;
      color: #fff;
      border-radius: 16px;
      text-align: center;
      display: flex;
      margin: 0 15px 10px 0;
    }
  }
}
@media screen and(max-width:700px) {
  .category_main {
    .category_box {
      .tag {
        width: 160px;
        display: flex;
        margin: 0 10px 10px 0;
        padding: 2px 4px;
        font-size: @miniFont;
      }
    }
  }
}
</style>