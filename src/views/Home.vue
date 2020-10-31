<template>
  <div class="home">
      {{msg}}================
      {{loginIn}}
      <router-link to="/About">About </router-link>
  </div>
</template>

<script>
import req from '@/request/request.js'
import api from '@/api/index'
export default {
  name: 'Home',
  data() {
    return {
      msg:'HOME',
      loginIn:''
    }
  },
  components: {},
  created(){
    req.commpontThis(this)
      req.login.loginIn()
     
     let data={
        user_name:'pppp',
        psw:'123788'
     }
      req.login.register({
        method:'post',
        data:data,
        success:(res)=>{
          console.log('reg=>',res)
        }
      })
  }
}
</script>
