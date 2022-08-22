import Layout from '@/layout'
export default {
  path: '/departments',
  component: Layout,
  children: [{
    name: 'departmentss',
    path: '',
    component: () => import('@/views/departments'),
    meta: {
      title: '组织结构',
      icon: 'tree'
    }
  }]
}
