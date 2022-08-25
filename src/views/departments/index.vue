<template>
  <div class="departments-container" v-loading="loading">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="false" @addDepts="addDepts" />
      </el-card>
      <!-- 放置结构内容 -->
        <!-- 放置一个el-tree 组件中定义data再给到el-tree-->
        <el-tree :data="departs" :default-expand-all="true" :props="defaultProps">
          <!-- 传入内容 插槽内容会循环多次 有多少节点 就循环多少次-->
          <treeTools 
          slot-scope="{ data }" 
          :tree-node="data" 
          @delDepts="getDepartments" 
          @addDepts="addDepts" 
          @editDepts="editDepts" 
          @refreshDepts="getDepartments"/>
        <!-- 监听delDepts绑定事件，新添加的才能删除 -->
        </el-tree>
      <!-- 弹层组件 -->
      <addDepts 
      ref="addDepts" 
      :dialog-visible.sync="dialogVisible" 
      :tree-node="currentNode" 
      @refreshDepts="getDepartments"/>
  </div>
</template>

<script>
import treeTools from './components/tree-tools'
import addDepts from './components/add-depts'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils/index' 
export default {
  name:'HrsaasIndex',
  components: { treeTools, addDepts },
  data() {
    return { // 定义一个departs
      company: {}, // 就是头部数据结构 
      departs: [],
      defaultProps: {
        label: 'name' // 表示从这个属性显示内容
      },
      dialogVisible:false,
      currentNode: null, // 定义一个node属性，记录当前点击的node事件
      loading: false
    }
  },
  created() {
    this.getDepartments() // 打印之前调用自身的方法
  },
  // 首先在methods中调用一个方法，然后再在created中调用这个方法
  methods: { // 封装方法的目的是方便调用
    async getDepartments() {
      const {depts, companyName, companyManage} = await getDepartments()
      // const result = await getDepartments()
      // console.log(result)
      this.company = { name: companyName, manager: companyManage, id:'' }
      // 这里定义一个空字符串，它是根，所有的子节点的数据pid都是'''
      this.departs = transListToTreeData(depts, '') // 需要将其转换为树形结构
      // console.log(this.departs);
    },
    // 监听tree-tools 中触发的点击添加子部门的事情
    // node 是我们当前点击的部门
    addDepts(node) {
      this.dialogVisible = true // 显示弹层
      this.currentNode = node // 保存当前节点
    },
    editDepts(node){
      this.currentNode = node //保存当前节点
      this.dialogVisible=true // 弹窗显示出来
      // console.log(node) // 给addDepts组件
      console.log(this.$refs.addDepts)
      this.$refs.addDepts.formData={...node}
    }
  }
}
</script>

<style lang="scss">
/* 有个el-card 的style格式加在哪里？ */
.departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }

</style>
