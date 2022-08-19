// 导出员工的路由规则
import Layout from '@/layout'
export default {
  // 路由规则
  path: '/attendances', // 路由地址
  name: 'attendances', // 给模块的一级路由加一个name属性
  component: Layout,
  children: [{
    // 二级路由path什么都不用写的时候 此时它表示二级路由的默认路由
    path: '', // 这里不用写，不写的时候表示employees 不但有layout员工主页
    // 动态按需加载，通过箭头函数的形式引入
    component: () => import('@/views/attendances'),
    // 路由的源信息 其实就是一个储存数据的地方，可以放任何内容
    meta: {
      title: '考勤', // 这里用title的原因是因为左侧导航读取了这里的title属性
      icon: 'skill'
    }
  }]
}
