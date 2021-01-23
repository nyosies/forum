<template>
    <div class="error">
        <!-- <h1 class="hi">error</h1> -->
           <b>{{hi}}</b>
           <!--  -->
           <h1>{{hied}}</h1>
           <button @click="alter">编辑</button>
       
    </div>
</template>
<script>
// import func from '../../vue-temp/vue-editor-bridge'
import fun from "@/fun/fun";
export default {
    data() {
        return {
            hi:'error'
        }
    },
     watch:{
         hi:{
             handler(newV,oldV){
                 console.log(1111,newV)
                 this.nookSizs()
             },
             immediate:true

         }
     },
    mounted(){
        console.log('i==>',1)
    //   this.nookSizs()
    //  window.location.reload()
       this.hi = this.$route.query.content || 'error1'
    //   window.addEventListener('resize',fun.debounce(this.nookSizs,1000))
    },
    computed:{
        hied(){
            let a  = this.$route.query.content || 'ERROR'
            return a
        }
    },
    methods:{
        alter(){             
            let content = {content:this.hi}
            this.$router.push({
                path:'/notFound',
                query:content
            })
        },
        nookSizs(){
            let i=0
            console.log('nook')
        }
    }
}
</script>
<style lang="less" scoped>
.error{
    height: 600px;
}
  .hi{
    //   background: #000;
    //   animation-name: his;
     animation: his 6s linear infinite;
  }
   @keyframes his{
       from{
           color: #000;
       }
       to{
           color: chartreuse;
       }
   }

</style>
