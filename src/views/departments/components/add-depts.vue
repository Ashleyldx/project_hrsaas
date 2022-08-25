<template>
  <!-- 表单校验 -->
  <!-- 放置弹层组件 -->
  <el-dialog :title="showTitle" :visible.sync="dialogVisible" :before-close="handleClose">
    <!-- 表单数据 label-width设置所有标题的宽度  -->
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        prop="code"
        label="
          部门编码"
      >
      <!-- 没写完补充一下 -->
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        /></el-form-item>
      <el-form-item label="部门负责人" prop="manager">
       <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
        <el-option 
          v-for="item in peoples" 
          :key="item.id" 
          :label="item.username" 
          :value="item.username"/>
        </el-select>
        <!-- <el-input
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
        /> -->
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :row="3"
        />
      </el-form-item>
    </el-form>
    <!-- 确定和取消 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary"  @click="submitDepts">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 配置props属性
// 完成双向绑定v-model
// 对表单进行数据绑定和校验
// 部门名称（name）：必填 1-50个字符 / 同级部门中禁止出现重复部门
// 部门编码（code）：必填 1-50个字符 / 部门编码在整个模块中都不允许重复
// 部门负责人（manager）：必填
// 部门介绍 ( introduce)：必填 1-300个字符

import { getDepartments,addDepartments,updateDepartments } from '@/api/departments'
import { getEmployeeSimple } from '@/api/employees'
export default {
  name: 'AddDepts',
  component: {},
  props: { // 需要传入一个props变量来控制 显示或者隐藏
    dialogVisible: {
      type: Boolean,
      default: false
    }, 
    treeNode:{
      type: Object,
      default:()=>({}) // 设置默认值为空对象
    }
  },
  data() {
    // 部门名称（name）：同级部门中禁止出现重复部门
    // 部门编码（code）：部门编码在整个模块中都不允许重复
    const checkCodeRepeat = async(rule, value, callback)=>{
    const { depts } = await getDepartments() 
    // 编辑状态下拿的数据 包不包含现在的数据？
    // console.log(depts);
    // console.log(value)
    // some 只要满足一个条件就返回true

    // 1、新增的情况
    // 2、编辑的情况
    // 把我自身这条数据给过滤掉再去判断 ==> ok
    // 如何把当前这条数据排除掉？？
    // 编辑状态下部门编码的检查
    let isRepeat = false
    if(this.formData.id){ // 编辑的情况
      // const list = depts.filter(ele.ele.id!==this.treeNode.id)
      isRepeat = depts.some(ele=>ele.id !== this.treeNode.id && ele.code === value)
      // isRepeat = list.some(ele=>ele.code === value)
    } else {
      isRepeat = depts.some(ele=> ele.code === value)
    }
    // console.log(isRepeat);
    isRepeat ? callback(new Error(`部门编码${value}已经存在`)) : callback()
    // callback()
}
    // 拿到你输入的部门编码值
    // 拿到同级部门数据
    // 判断部门名称是否在同级部门里出现过
    const checkNameRepeat = async(rule, value, callback) => {
      const { depts } = await getDepartments() // 拿到所有部门的数据
      // 拿到同级部门的数据
      // 确定了当前部门的ID==>这个部门下所有子部门
      // console.log(this.treeNode.id)
      // let isRepeat= false
      if(this.formData.id){
        // 所有和我同级的数据
        // 包括我自己
        isRepeat = depts.some(ele=>this.treeNode.id !== ele.id && this.treeNode.pid === ele.pid && ele.name === value)
      }else{
        isRepeat = depts.some(ele=>this.treeNode.id === ele.pid && ele.name === value)
      }
      // const list = depts.filter( ele => this.treeNode.id === ele.pid)
      // const isRepeat = list.some(ele=>ele.name===value)

      // 部门名称
      // 新增的时候生成当前部门的子部门
      // 编辑的时候 改的就是自己 要注意和自己的兄弟进行对比
      isRepeat ? callback(new Error(`部门名称在同级部门${value}已经存在`)): callback()
      // console.log(list);
    }
    return {
      // showDialog: false,
      
      formData: {
      // 定义一个表单数据
        name: '', // 部门名称
        code: '', // 部门编号
        manager: '', // 部门负责人
        introduce: '' // 部门介绍
      },
      rules: {
        name: [ // 校验未完成
          { required: true, massage: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          {validator : checkNameRepeat, trigger:'blur'}],
        
        code: [
          { required: true, massage: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' },
          {validator : checkCodeRepeat, trigger:'blur'}],
      
        manager: [
          { required: true, massage: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [
          { required: true, massage: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门名称长度为1-300个字符', trigger: 'blur' }]
      }, // 校验规则{ key:数组}
      peoples:[],
    }
  },
  created(){
    this.getEmployeeSimple()
  }, // 模拟拿数据，测试一下无用代码
  computed:{
    showTitle(){
      return this.formData.id?'编辑部门':'新增部门'
    }
  },
  methods: {
    handleClose() {
      // 触发update:dialogVisible 去关闭弹窗
      this.$emit('update:dialogVisible', false)
      // 重置表单
      this.$refs.deptForm.resetFields() //$refs.deptForm绑定的是第一行'新增部门''
      // 复原初始化数据
      this.formData = {
        name:'',
        code:'',
        manager:'',
        indtroduce:''
      }
    },
    async getEmployeeSimple(){
      this.peoples=await getEmployeeSimple()
    },
    submitDepts(){
      this.$refs.deptForm.validate(async vali=>{ 
        // console.log(vali)
        if(vali){
          // 表单校验通过
          // 新增部门接口
          if(this.formData.id){
            await updateDepartments(this.formData)
          }else{
            await addDepartments({...this.formData, pid:this.treeNode.id})
          }
          this.$message.success(`部门${this.formData.id?'修改':'新增'}成功`)
          this.$emit('refreshDepts')
          this.handleClose()
        }
      })
    }
  }
}
</script>

<style>

</style>
