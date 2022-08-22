// 导出工资的路由规则
import Layout from '@/layout'
export default {
  path: '/salarys',
  component: Layout,
  children: [{
    name: 'salarys',
    path: '',
    component: () => import('@/views/salarys'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
