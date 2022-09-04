// 根据当前用户返回的菜单
// 当前用户菜单 ==> 静态路由 + 动态路由
import router, {asyncRoutes, constantRoutes} from '@/router'
const state = {
  routes: constantRoutes
}
const mutations = {
  setRoutes(state, matchRoutes) {
    state.routes = [...constantRoutes, ...matchRoutes]
    // 思考 登录两个人的时候 第一个权限1，权限2 第二个 权限3，权限4会有问题吗
  }
}
const actions = {
  // 假设menus 已经到了
  // 根据 menus 和所有的 asyncRoutes ==> 真正属于这个用户的信息
  // menus ==> 权限里的code值
  // filterRoutes
  filterRoutes(context, menus) {
    const routes = asyncRoutes.filter(ele => menus.includes(ele.meta.id))
    context.commit('setRoutes', routes)
    // addRoutes[]
    router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])

  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}