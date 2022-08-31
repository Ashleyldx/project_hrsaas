// 负责所有全局自定义组件
// main.js   Vue.use批量注册组件
// import PageTools from './PageTools'

// export default {
//   install(Vue) {
//      // 完成组件注册,注册完之后在main.js引入
//     Vue.component('PageTools', PageTools)
//   }
// }

// 自动批量注册组件
const requireComponent = require.context('./', true, /\.vue$/)
// const list = requireComponent.keys().map(ele => requireComponent(ele))
const list = requireComponent.keys().map(ele=>requireComponent(ele))
export default (Vue) => {
  list.forEach(ele => {
    // ele.default 组件对象
    // console.log(ele.default.name);
    Vue.component(ele.default.name, ele.default)
  })
}

