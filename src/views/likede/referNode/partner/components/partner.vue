<template>
  <el-dialog
    title="区域详情"
    :visible.sync="showDialog"
    width="630px"
  >
    <el-form ref="form" label-width="140px">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="合作商名称：">{{ detailInfo.name }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人：">{{ detailInfo.contact }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话：">{{ detailInfo.mobile }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分成比例：">{{ detailInfo.ratio+'%' }}</el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  props: {},
  data() {
    return {
      showDialog: false,
      detailInfo: {}
    }
  },
  computed: {

  },
  methods: {
    async initialization(row) {
      this.detailInfo = row
      this.showDialog = true
    }
  }
}
</script>
<style scoped lang=''>
</style>