<template>
  <dialog-form
    :title="`${isUpdate?'修改':'新增'}合作商`"
    :visible.sync="showDialog"
    @closed="onCancel"
    @concel="showDialog=false"
    @determine="onDetermine"
  >
    <el-form ref="formData" :rules="rulus" :model="formData" label-width="140px">
      <el-form-item label="合作商名称：" prop="name">
        <dialog-input v-model="formData.name" :maxlength="10" />
      </el-form-item>
      <el-form-item label="联系人：" prop="contact">
        <dialog-input v-model="formData.contact" :maxlength="10" />
      </el-form-item>
      <el-form-item label="联系电话：" prop="mobile">
        <dialog-input v-model="formData.mobile" :maxlength="11" />
      </el-form-item>
      <el-form-item label="分成比例(%)：" prop="ratio">
        <dialog-input-number v-model="formData.ratio" />
      </el-form-item>
      <template v-if="!isUpdate">
        <el-form-item label="账号：" prop="account">
          <dialog-input v-model="formData.account" :maxlength="18" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <dialog-input v-model="formData.password" :maxlength="20" />
        </el-form-item>
      </template>
    </el-form>
  </dialog-form>
</template>
<script>
import { addPartner, updatePartner } from '@/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      showDialog: false,
      formData: {
        name: '',
        contact: '',
        mobile: '',
        ratio: undefined,
        account: undefined,
        password: undefined
      },
      rulus: {
        name: [{ required: true, message: '请输入合作商名称', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机格式' }
        ],
        ratio: [{ required: true, message: '请输入分成比例', trigger: 'blur' }],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  computed: {
    isUpdate() {
      return this.formData.id
    }
  },

  methods: {
    onCancel() {
      this.$refs['formData'].resetFields()
      this.formData = {
        name: '',
        contact: '',
        mobile: undefined,
        ratio: undefined,
        account: '',
        password: undefined
      }
    },
    async onDetermine() {
      try {
        await this.$refs.formData.validate()
        if (this.isUpdate) {
          console.log(this.formData)
          await updatePartner(this.formData)
        } else {
          await addPartner(this.formData)
        }
        this.showDialog = false
        this.$message.success(`${this.isUpdate ? '修改' : '新增'}成功`)
        this.$emit('getPartnerList')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang=''>
</style>