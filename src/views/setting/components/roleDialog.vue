<template>
  <el-dialog
    :title="`${roleForm.id?'修改':'新增'}角色`"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  
  >
    <!-- rules和model只有在表单校验时才用到 -->
    <el-form ref="roleDialogForm" label-width="80px" :rules="rules" :model="roleForm">
      <el-form-item label="角色名称" prop="name" >
        <el-input v-model="roleForm.name" placeholder="请输入角色"  />
      </el-form-item>
      <el-form-item label="角色描述" prop="description" />
      <el-input v-model="roleForm.description" type="textarea" row="3" placeholder="请输入描述" />
    </el-form>
    <!-- 底部按钮 -->
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="submitRole">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
// ！！！！！！！！！！！编辑不生效，也没有分页
import { addRole,updateRole } from '@/api/setting'
export default {
  name: 'hrRoleDialogs',
  // 完善新增角色的组件功能
  // dialogVisible字段是通过父组件传递进来
  // 如何实现dialogVisible在组件上实现双向绑定
  /* dialogVisible 什么情况下需要有默认属性和布尔值类型 */
  props: {
    dialogVisible: { // 需要传入一个props变量来控制 显示或者隐藏
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      },
      loading:false
    }
  },
  mounted() { },
  methods: {
    handleClose() {
      // console.log(111);
      // this.dialogVisible=false
      this.$emit('update:dialogVisible', false)
      // resetFields 重置整个表单
      this.$refs.roleDialogForm.resetFields()
      this.roleForm = { // 手动恢复初始值
        name: '',
        description:''
      }
    },
    
    async submitRole() {
      // 表单校验通过的时候
      // validate()
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.roleForm.id ? await updateRole(this.roleForm) : await addRole(this.roleForm)
        // console.log('===')
        // 新增接口
        await addRole(this.roleForm) ///???
        // 调用父组件里获取角色列表的方法
        // this.$parent.getRoleList()
        this.$emit('refresh') // 绑定一个refresh事件，工作中常用的
        // 提示新增成功
        this.$message.success(`角色${this.roleForm.id ? '修改':'新增'}成功`) // 成功之后绑定loading状态
        // 弹窗关闭
        this.handleClose()
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
