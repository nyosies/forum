<template>
  <div class="notFound">
    <NavBar headbgColor='Crimson' logoColor='#fff'/>
    <h1 class="animate__animated animate__bounceInLeft">404 not Found</h1>
  </div>
</template>
<script>
import NavBar from "../components/navHead";
export default {
  components: { NavBar },
  created(){
    console.log(111)
    this.$req.article.categoryList({
      success:res=>{
        console.log(res)
      }
    })
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/color/style.less');
.notFound {
  width: 100%;
  min-height: calc(100vh - 90px);
  display: flex;
  justify-content: center;
  h1 {
    padding-top: 120px;
  }
}
</style>
