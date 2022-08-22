// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/setting',
  component: Layout,
  children: [{
    name: 'setting',
    path: '',
    component: () => import('@/views/setting'),
    meta: {
      title: '公司设置',
      icon: 'setting'
    }
  }]
}
