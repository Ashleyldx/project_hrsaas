import Layout from '@/layout'
export default {
  path: '/setting',
  meta: { id: 'settings' },
  component: Layout,
  children: [{
    path: '',
    name: 'setting',
    component: () => import('@/views/setting/index'),
    meta: { title: '公司设置', icon: 'setting' }
  }]
}
