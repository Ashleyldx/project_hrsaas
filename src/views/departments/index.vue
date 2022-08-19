<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 放置结构内容 -->
        <tree-tools :tree-node="company" :is-root="true" />
        <!-- 放置一个el-tree 组件中定义data再给到el-tree-->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容会循环多次 有多少节点 就循环多少次-->
          <!-- 作用域插槽 slot-scoped="obj"接收传递给插槽的数据（el-tree循环节点时，把节点的数据传递给插槽）-->
          <tree-tools slot-scoped="{data}" :tree-node="data" @delDepts="getDepartments" /><!-- 多个treetools实例 -->
        <!-- 监听delDepts绑定事件，新添加的才能删除 -->
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils' // ???
export default {
  components: { TreeTools },
  data() {
    return { // 定义一个departs
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' }, // 就是头部数据结构
      // departs: [
      //   { name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] }, // name节点
      //   { name: '行政部', manager: '孙权' },
      //   { name: '人事部', manager: '刘备' }],
      departs: [], // 变为空数组
      defaultProps: {
        // children: 'children', // 从这个属性去找子节点
        label: 'name' // 表示从这个属性显示内容
      }
    }
  },
  // 引入getDepartments接口之后，在钩子函数中中调用一个方法
  created() {
    this.getDepartments() // 打印之前调用自身的方法
  },
  // 首先在methods中调用一个方法，然后再在created中调用这个方法
  methods: { // 封装方法的目的是方便调用
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      // 这里定义一个空字符串，它是根，所有的子节点的数据pid都是'''
      this.departs = transListToTreeData(result.depts, '') // 需要将其转换为树形结构
      console.log(result)
    }
  }
}
</script>

<style scoped>
.tree-card{
  padding:30px 140px;
  font-size: 14px;
}

</style>
