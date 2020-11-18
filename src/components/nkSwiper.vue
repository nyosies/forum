<template>
<div>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>
      <div class="box1">
          <slot name='frist'></slot>
      </div>
    </swiper-slide>
   <swiper-slide>
      <div class="box">Slide 2</div>
    </swiper-slide>
       <!--  <swiper-slide>
      <div class="box">Slide 3</div>
    </swiper-slide>
    <swiper-slide>
      <div class="box">Slide 4</div>
    </swiper-slide>
    <swiper-slide>
      <div class="box">Slide 5</div>
    </swiper-slide> -->
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  <!-- <div class="swiper-button-next"></div> -->
</div>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOptions: {
            direction:'vertical',
            // height:window.innerHeight,
          pagination: {
            el: '.swiper-pagination',
              clickable: true 
          },
          autoplay:{
          delay:2000, 
          stopOnLastSilde:false,   
          speed:600
        }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    // this._initSwiper()
    },
      methods:{
        _initSwiper(){
        let mySwiper = new Swiper(".swiper-box",{
        direction:'horizontal',
        loop:true,  //循环
        loopFillGroupWithBlank: true,  
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
    　　 observeParents:true,//修改swiper的父元素时，自动初始化swiper
        //使用分页器
        paginationClickable :true,
    　　 pagination: {
        　　el: '.swiper-pagination',
    　　 },    
        autoplay: {
        　　disableOnInteraction: false,  //触碰后自动切换停止
    　　}
        })
        }
      }
  }
</script>
<style scoped>
.box {
  background: red;
  height: 100vh;
}
.box:nth-child(odd) {
  background: aquamarine;
}
</style>