<template>
  <!-- 表单校验 -->
  <!-- 放置弹层组件 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单数据 label-width设置所有标题的宽度  -->
    <el-form :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="部门名称" props="name">
        <el-input
          v-model="formData.name"
          style="width:80%"
          placeholder="1-50个字符"
        />
      </el-form-item>
      <el-form-item
        props="code"
        label="
          部门编码"
      >
        <el-input
          v-model="formData.code"
          style="width:80%"
          placeholder="1-50个字符"
        /></el-form-item>
      <el-form-item label="部门负责人" props="manager">
        <el-input
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="部门介绍" props="introduce">
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
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
// 配置props属性
// 完成双向绑定v-model

export default {
  name: 'AddDepts',
  component: { },

  data() {
    return {
      showDialog: false,
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
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' }],
        code: [
          { required: true, massage: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' }],
        manager: [
          { required: true, massage: '部门负责人不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1-50个字符', trigger: 'blur' }],
        introduce: [
          { required: true, massage: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 300, message: '部门名称长度为1-300个字符', trigger: 'blur' }]
      } // 校验规则{ key:数组}
    }
  }
}
</script>

<style>

</style>
