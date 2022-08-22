// 导出社保的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/social', // 路由地址
  component: Layout,
  children: [{
    name: 'social',
    path: '',
    component: () => import('@/views/social/index'),
    meta: {
      title: '社保',
      icon: 'table'
    }
  }]
}
