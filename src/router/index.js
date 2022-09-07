import Vue from 'vue'
import Router from 'vue-router'
import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'

export const asyncRoutes = [approvalsRouter, departmentsRouter, employeesRouter, permissionRouter, attendancesRouter, salarysRouter, settingRouter, socialRouter]

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
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
    hidden: true,
    children: [
      {
        path: '',
        name: 'import',
        component: () => import('@/views/import')
      }
    ]
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    // name: 'Dashboard',
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
  // ...asyncRouter,
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
]
// 思考问题
// 为什么 icon 可以配置图片
// 为什么 404 login 没有展示在侧边栏
// 静态路由 动态路由 现在这样直接混在一起合适吗

const createRouter = () => new Router({ // 跳转到主页
  mode: 'history', // require service support // 将hash转为history
  scrollBehavior: (to, from, savePosition) =>{
    // to 目标
    console.log(to)
  // from 源头
  if(to.path === '/dashboard'){
    return { y: 100 }
  }
  return { y: 0}
 },
  base:'/hr/',
  // 临时合并
  routes: [...constantRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
