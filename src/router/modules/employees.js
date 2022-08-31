// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/employees', // 路由地址
  component: Layout,
  children: [
    {
    name: 'employees',
    path: '', 
    component: () => import('@/views/employees'), // 懒加载
    meta: {title: '员工管理', icon: 'people'}
    },
     {
    path: 'detail/:id', 
       component: () => import('@/views/employees/detail'), // 懒加载
    hidden: true, // 显示出来
    meta: {title: '员工详情'}
    },
     {
    path: 'print/:id', 
       component: () => import('@/views/employees/print'), // 懒加载
    hidden: true, // 显示出来
    meta: {title: '打印'}
    },
  ]
}


