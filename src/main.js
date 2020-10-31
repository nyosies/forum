import Vue from 'vue'
import App from './App.vue'
import router from './router'
import req from '@/request/request.js'
import api from '@/api/index'

Vue.prototype.$req = req
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
