<template>
  <dialog-form
    :title="`${isUpdate?'修改':'新增'}区域`"
    :visible.sync="showDialog"
    @closed="onCancel"
    @concel="showDialog = false"
    @determine="onDetermine"
  >
    <el-form ref="formData" :rules="rulus" :model="formData" label-width="140px">
      <el-form-item label="区域名称：" prop="regionName">
        <dialog-input v-model="formData.regionName" />
      </el-form-item>
      <el-form-item label="备注说明：" prop="remark">
        <el-input v-model="formData.remark" :maxlength="40" type="textarea" placeholder="请输入备注（不超过40字）" show-word-limit />
      </el-form-item>
    </el-form>
  </dialog-form>
</template>
<script>
import { addRegion, updateRegion } from '@/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      showDialog: false,
      formData: {
        regionName: '',
        remark: ''
      },
      rulus: {
        regionName: [{ required: true, message: '请输入区域名称', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入备注说明', trigger: 'blur' }]
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
        regionName: '',
        remark: ''
      }
    },
    async onDetermine() {
      try {
        await this.$refs.formData.validate()
        if (this.isUpdate) {
          await updateRegion(this.formData)
        } else {
          await addRegion(this.formData)
        }
        this.showDialog = false
        this.$message.success(`${this.isUpdate ? '修改' : '新增'}成功`)
        this.$emit('getRegion')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang=''>
</style>