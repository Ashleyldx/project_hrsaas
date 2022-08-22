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
          <tree-tools slot-scoped="{data}" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" />
        <!-- 监听delDepts绑定事件，新添加的才能删除 -->
        </el-tree>
      </el-card>
      <!-- 弹层组件 -->
      <addDept :show-dialog="showDialog" />
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index' // ???
import addDept from './components/add-dept'
export default {
  components: { TreeTools, addDept },
  props: { // 需要传入一个props变量来控制 显示或者隐藏
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return { // 定义一个departs
      company: { }, // 就是头部数据结构 name: '江苏传智播客教育科技股份有限公司', manager: '负责人'
      departs: [],
      // departs: [], // 变为空数组
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      // showDialog: false, // 弹框展示，默认不显示弹层
      node: null // 定义一个node属性，记录当前点击的node事件
    }
  },
  created() {
    this.getDepartments() // 打印之前调用自身的方法
  },
  // 首先在methods中调用一个方法，然后再在created中调用这个方法
  methods: { // 封装方法的目的是方便调用
    async getDepartments() {
      const result = await getDepartments()
      console.log(result)
      this.company = { name: result.companyName, manager: '负责人' }
      // 这里定义一个空字符串，它是根，所有的子节点的数据pid都是'''
      this.departs = transListToTreeData(result.depts, '') // 需要将其转换为树形结构
    },
    // 监听tree-tools 中触发的点击添加子部门的事情
    // node 是我们当前点击的部门
    addDepts(node) {
      this.showDialog = true // 显示弹层
      this.node = node
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
