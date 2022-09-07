import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Components from '@/components'  // 引入之后直接注册自定义组件

import * as directives from '@/directives'
import * as filters from '@/filters' // 引入工具类
import '@/icons' // icon
import '@/permission' // permission control

import i18n from '@/lang'
Object.keys(directives).forEach(ele => {
  Vue.directive(ele, directives[ele])
})
// 全局注册组件
import components from '@/components' 
Vue.use(components);
import Print from 'vue-print-nb'
Vue.use(Print);

import myMixin from '@/mixin/checkPermission'
Vue.mixin(myMixin)
// console.log(directives);
// 设置element为当前的语言
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})

Object.keys(filters).forEach(key => {
  // 注册过滤器(自定义)
  Vue.filter(key, filters[key])
})


// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// Vue.component('ScreenFull', ScreenFull) // 注册全屏组件
Vue.use(Components) // 注册自定义组件
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
