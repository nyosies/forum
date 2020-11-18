<template>
  <div class="about" style="transitionDuration:2s">
       <NavBar></NavBar>
    <h1 class="hs animate__animated animate__slideInLeft">This is an about page</h1>
    {{user}}
     <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
      <span>我来啦!</span>
    </el-drawer>
     <nkSwiper></nkSwiper>
  </div>
</template>
<script>
import nkSwiper from "../components/nkSwiper";
import NavBar from "../components/navHead";
export default {
  components:{nkSwiper,NavBar},
  data(){
    return{
      user:'',
      drawer:true
    }
  },
  created(){
    let params={
      id:1
    }
    this.$req.commpontThis(this).login.user({
       method:'post',
       data:params
     })
  }
}
</script>
<style lang="less" scoped>
@media screen and (max-width:500px){ 
.hs{
  background: aqua;
}
}
</style>
