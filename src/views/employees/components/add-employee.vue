<template>
  <el-dialog title="新增员工" :visible="visibleDialog" :before-close="handleClose">
    <!-- 表单 -->
    <el-form ref="addEmployeeDialog" :model="formData" :rules="rules" label-width="120px" >
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item >

       <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile"  style="width:80%" placeholder="请输入手机号" />
      </el-form-item>

       <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry"  style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>

       <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment"  style="width:80%" >
        <el-option v-for="item in EmployeeEnum.hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>

       <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber"  style="width:80%" placeholder="请输入工号"/>
      </el-form-item>

       <el-form-item label="部门" prop="departmentName">
        <!-- focus获取焦点触发事件 -->
        <el-input v-model="formData.departmentName"  style="width:80%" placeholder="请选择部门" @focus="getDepartments"/>
        <el-tree 
        v-if="showTree" 
        v-loading="loading" 
        :data="treeData" 
        :props="defaultProps" 
        :default-expand-all="true"
        @node-click="handleNodeClick" />
      </el-form-item>

       <el-form-item label="转正时间" prop="correctionTime">
        <el-input v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间"/> 
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
     <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small">取消</el-button>
        <el-button type="primary" size="small" @click="submitEmployee">确定</el-button>
      </el-col>
    </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { transListToTreeData } from '@/utils'
import {addEmployee} from '@/api/employees'

export default {
  // props 控制显示和隐藏
  props: {
    visibleDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: EmployeeEnum.hireType,
      EmployeeEnum, // 在data中定义数据
      // 数据和后端保持一致
      treeData: [], // 定义数据接收树形数据
      loading: false,
      showTree: false,
      
      // 首先定义表单数据
       formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
       rules: {
         username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger:'blur' }],
         mobile: [
           { required: true, message: '手机号不能为空', trigger: 'blur' },
           { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }],
         formOfEmployment: [
           { required: true, message: '聘用形式不能为空', trigger: 'blur' }],
         workNumber: [
           { required: true, message: '工号不能为空', trigger: 'blur' }],
         departmentName: [
           { required: true, message: '部门不能为空', trigger: 'change' }],// change事件，鼠标离开后不会失焦报红
         timeOfEntry: [
           { required: true, message: '入职时间', trigger: 'blur' }]
      },
      defaultProps: {
        label:'name'
      }
    } 
  },
  methods: {
    handleClose() {
      // resetFields() 表单重置
      this.$emit('update:visibleDialog', false)
      // ref,$refs
      this.$refs.addEmployeeDialog.resetFields()
      // 关闭树状
      this.showTree = false
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
    
    },
    async getDepartments() {
      this.loading = true
      this. showTree =true
      const { depts } = await getDepartments()
      this.treeData = transListToTreeData(depts,'')
      this.loading = false
    },
    handleNodeClick(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async submitEmployee() {
      try {
        await this.$refs.addEmployeeDialog.validate()
        //刷新列表页面数据
        this.loadingBtn = true
        await addEmployee(this.formData)
        this.$message.success('新增信息成功')
        this.$emit('refresh')
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingBtn = false
      }
    }
  } 
}
</script>

<style>

</style>