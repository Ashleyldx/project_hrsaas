<template>
  <el-dialog
    title="区域详情"
    :visible.sync="showDialog"
    width="630px"
  >
    <Table :column-data="columnData" :data="vmList">
      <template #vmStatus="{row}">
        {{ row.vmStatus | vmStatus }}
      </template>
      <template #updateTime="{row}">
        {{ row.updateTime | formatTime }}
      </template>
    </Table>
  </el-dialog>
</template>
<script>
import { getVmList } from '@/api'
import node from '@/filters/node'
export default {
  name: '',
  filters: node,
  props: {},
  data() {
    return {
      showDialog: false,
      columnData: [
        { width: '80', type: 'index', label: '序号' },
        { prop: 'innerCode', label: '机器编号' },
        { prop: 'vmStatus', label: '设备状态' },
        { prop: 'updateTime', label: '最后一次供货时间' }
      ],
      vmList: []
    }
  },
  methods: {
    async initialization(id) {
      this.vmList = await getVmList(id)
      this.showDialog = true
    }
  }
}
</script>
<style scoped lang=''>
</style>