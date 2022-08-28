import Vue from 'vue'
import Router from 'vue-router'

// 引入多个模块规则
import approvalsRouter from './modules/approvals'
import attendanceRouter from './modules/attendance'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

Vue.use(Router)

import Layout from '@/layout'
/**
 * constantRoutes
 * 所有路由组件都可以写这里，然后拆分到modules下面
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/import',
    component: Layout,
    hidden: true, // 隐藏在左侧菜单中
    children: [{
      path: '', // 二级路由path什么都不写 表示二级默认路由
      name:'import',
      component: () => import('@/views/import')
    }]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
    //  import('@/views/dashboard/index'), 路由懒加载，作用：首页加载优化
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 定义一个动态路由变量
// 这里导出的变量，后边做权限的时候会用到
export const asyncRoutes = [
  approvalsRouter,
  attendanceRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  salarysRouter,
  settingRouter,
  socialRouter]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }), // 控制页面滚动条，切换动画的路由
  // 临时合并
  routes: [...constantRoutes, ...asyncRoutes] // 静态路由和动态路由的临时合并
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
