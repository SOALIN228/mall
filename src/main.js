import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'assets/scss/index.scss'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1, // 完全显示加载
  error: require('assets/img/error.png'), // 失败显示
  loading: require('assets/img/loading.gif'), // 成功显示
  attempt: 1 // 加载次数
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
