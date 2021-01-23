<template>
    <div class="box">
       <h1> {{his}} </h1>
       <input type="text" v-model="his">
       <el-button @click="success">完成</el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            his:''
        }
    },
    created(){
        this.his = this.$route.query.content
    },
    methods:{
        success(){
            this.$router.push({path:'/error',query:{content:this.his}})
        }
    }
}
</script>

<style lang="less" scoped>
 .box{
     padding: 56px;
     height: 600px;
 }
</style>