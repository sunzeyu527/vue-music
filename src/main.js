import 'babel-polyfill' // 主要实现的是Babel的补丁问题 可以将es6的一些新的api类似promise进行转换 packagejson中记得引入
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick' //  fastclick主要实现是移动端点击屏幕有300毫秒延迟的问题
import VueLazyLoad from 'vue-lazyload'
fastclick.attach(document.body)  //  调用
import 'common/stylus/index.styl'
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
