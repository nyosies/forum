import Vue from 'vue'
import App from './App.vue'
import router from './router'
import req from '@/request/request.js'
import api from '@/api/index'
import animated from 'animate.css'
import element from './plugin/element'
import 'swiper/swiper-bundle.css'
import '@/assets/icon/iconfont.css'
// import swiper from './plugin/swiper'
import vueSwiper from 'vue-awesome-swiper'

import '@/utils/config.js'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
    
 Vue.use(vueSwiper)
 Vue.use(mavonEditor)

Vue.prototype.$req = req
Vue.config.productionTip = false

// Vue.use(element)
Vue.use(animated)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
