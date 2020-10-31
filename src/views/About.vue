<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{user}}
  </div>
</template>
<script>

export default {
  data(){
    return{
      user:''
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
