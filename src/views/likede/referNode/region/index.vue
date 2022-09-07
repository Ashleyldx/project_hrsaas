<template>
  <div class="region-container">
    <Search :form="form" @submit="onSearch" />
    <Panel>
      <template #button>
        <add-button @click="$refs.addArea.showDialog=true" />
      </template>
      <template #table>
        <Table v-loading="loading" :column-data="columnData" :data="regionList">
          <template #operation="{row}">
            <el-button type="primary" class="el-button--text" @click="showDetails(row)">查看详情</el-button>
            <el-button type="primary" class="el-button--text" @click="updateRegion(row)">修改</el-button>
            <el-button type="primary" class="el-button--text el-button--danger-text" @click="deleteRegion(row)">删除</el-button>
          </template>
        </Table>
      </template>
      <template #pagination>
        <Pagination :total="total" :page-size="page.pageSize" :current-page.sync="page.pageIndex" />
      </template>
    </Panel>
    <region-details ref="details" />
    <addArea ref="addArea" @getRegion="getRegion" />
  </div>
</template>
<script>
import { getRegion, deleteRegion, searchNode } from '@/api'
import regionDetails from './components/region-details.vue'
import addArea from './components/addArea.vue'
export default {
  name: '',
  components: {
    regionDetails,
    addArea
  },
  props: {},
  data() {
    return {
      form: {
        input: {
          label: '区域搜索'
        }
      },
      loading: false,
      columnData: [
        { width: '80', type: 'index', label: '序号' },
        { prop: 'name', label: '区域名称' },
        { prop: 'nodeCount', label: '点位数' },
        { prop: 'remark', label: '备注说明' },
        { width: '200', prop: 'operation', label: '操作' }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10,
        name: undefined
      },
      total: 0,
      regionList: []
    }
  },

  watch: {
    page: {
      deep: true,
      handler() {
        this.getRegion()
      }
    }
  },
  created() {
    this.getRegion()
  },
  methods: {
    async onSearch(form) {
      try {
        this.loading = true
        this.page.name = form.input
        const { totalCount, currentPageRecords } = await searchNode(this.page)
        this.total = totalCount
        this.regionList = currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async getRegion() {
      try {
        this.loading = true
        const { totalCount, currentPageRecords } = await getRegion(this.page)
        if (currentPageRecords.length === 0 && totalCount !== 0) this.page.pageIndex--
        this.total = totalCount
        this.regionList = currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    showDetails(row) {
      this.$refs.details.initialization({ ...this.page, regionId: row.id })
    },
    updateRegion(row) {
      const addArea = this.$refs.addArea
      addArea.formData = { ...row, regionName: row.name }
      addArea.showDialog = true
    },
    async deleteRegion(row) {
      try {
        await deleteRegion(row.id)
        this.$message.success('删除成功')
        this.getRegion()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang=''>
</style>