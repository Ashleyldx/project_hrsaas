// 负责所有全局自定义组件
import PageTools from './PageTools'

export default {
  install(Vue) {
    // 完成组件注册,注册完之后在main.js引入
    Vue.component('PageTools', PageTools)
  }
}