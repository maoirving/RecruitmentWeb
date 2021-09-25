import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './plugins/element.js'
import '@/assets/sass/app.scss' // global css
// swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// axios.interceptors.request.use(config => {
//   // console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 在最后必须 return config
//   return config
// })
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueAwesomeSwiper)
