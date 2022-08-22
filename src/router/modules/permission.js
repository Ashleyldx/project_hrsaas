// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/permission',
  component: Layout,
  children: [{
    name: 'permission',
    path: '',
    component: () => import('@/views/permission'),
    meta: {
      title: '权限管理',
      icon: 'lock'
    }
  }]
}
