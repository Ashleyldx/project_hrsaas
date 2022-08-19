// 权限拦截在路由跳转  通过导航守卫

import router from '@/router'
import store from '@/store' // 引入store实例和组件中的this.$store是一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
// 不需要导出--只需要让代码执行即可
// 导航前置守卫
// next 是前置守卫必须执行的钩子 next必须执行，如果不执行，页面就死了
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址
const whiteList = ['/login', '/404'] // 定义白名单
router.beforeEach(async(to, from, next) => { // 进行判断
  nprogress.start() // 开启进度条
  // 如果有token
  if (store.getters.token) { // 存在说明处于登录页
    // 只有有token的情况下才能获取资料
    // 如果要访问的是 登录页
    if (to.path === '/login') {
      next('/') // 跳到主页  // 有token用处理吗？不用
    } else {
      // 只有放过的时候才去获取用户资料
      // 是每次都获取吗 ？
      // 如果当前vuex中有用户资料的id，表示已经有了不需要再获取
      if (!store.getters.userId) {
        // 如果没有id才表示当前用户资料没有获取过
        await store.dispatch('user/getUserInfo') // 强制等待
        // 如果说后续 需要根据用户资料获取数据的话  store.dispatch('user/getUserInfo') 必须改成同步
      } next()
    }
  } else {
    // 没有token的情况下  // indexOf
    if (whiteList.indexOf(to.path) > -1) {
      // 大于-1表示要去的地址在白名单,反之则在登录页
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done() // 手动切换地址时 进度条不关闭
})
// 导航后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
