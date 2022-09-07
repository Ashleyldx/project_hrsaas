<template>
  <el-dialog
    title="区域详情"
    :visible.sync="showDialog"
    width="630px"
  >
    <el-form ref="form" label-width="140px">
      <el-form-item label="区域名称：">
        {{ name }}
      </el-form-item>
      <el-form-item label="包含点位：">
        <Table :column-data="columnData" :data="searchList">
          <template #nodeCount="{row}">
            {{ row.region.nodeCount }}
          </template>
        </Table>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { searchNode } from '@/api'
export default {
  name: '',
  props: {},
  data() {
    return {
      showDialog: false,
      columnData: [
        { width: '80', type: 'index', label: '序号' },
        { prop: 'name', label: '点位名称' },
        { prop: 'nodeCount', label: '设备数量' }
      ],
      searchList: []
    }
  },
  computed: {
    name() {
      return this.searchList[0]?.region?.name
    }
  },
  created() {},
  methods: {
    async initialization(params) {
      const { currentPageRecords } = await searchNode(params)
      this.searchList = currentPageRecords
      this.showDialog = true
    }
  }
}
</script>
<style scoped lang=''>
</style>