<template>
  <div class="region-container">
    <Search :form="form" @submit="onSearch" />
    <Panel>
      <template #button>
        <add-button @click="$refs.addArea.showDialog=true" />
      </template>
      <template #table>
        <Table v-loading="loading" :column-data="columnData" :data="nodeList">
          <template #operation="{row}">
            <el-button type="primary" class="el-button--text" @click="showDetails(row)">查看详情</el-button>
            <el-button type="primary" class="el-button--text" @click="updateRegion(row)">修改</el-button>
            <el-button type="primary" class="el-button--text el-button--danger-text" @click="deleteNode(row)">删除</el-button>
          </template>
        </Table>
      </template>
      <template #pagination>
        <Pagination :total="total" :page-size="page.pageSize" :current-page.sync="page.pageIndex" />
      </template>
    </Panel>
    <node-details ref="details" />
    <add-node ref="addArea" @getNodeList="getNodeList" />
  </div>
</template>
<script>
import { searchNode, deleteNode, getRegion } from '@/api'
import nodeDetails from './components/node-details.vue'
import addNode from './components/add-node.vue'
import { TextToCode } from 'element-china-area-data'
export default {
  name: '',
  components: {
    nodeDetails,
    addNode
  },
  props: {},
  data() {
    return {
      form: {
        input: {
          label: '点位搜索'
        },
        select: {
          label: '区域搜索',
          options: this.regionList,
          optionsLable: { value: 'id', label: 'name' }
        }
      },
      loading: false,
      columnData: [
        { width: '80', type: 'index', label: '序号' },
        { prop: 'name', label: '点位名称' },
        { prop: 'regionName', label: '所在区域' },
        { prop: 'businessName', label: '商圈类型' },
        { prop: 'ownerName', label: '合作商' },
        { prop: 'addrName', label: '详细地址' },
        { width: '200', prop: 'operation', label: '操作' }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      nodeList: []
    }
  },

  watch: {
    page: {
      deep: true,
      handler() {
        this.getNodeList()
      }
    }
  },
  created() {
    this.getNodeList()
    this.getRegion()
  },
  methods: {
    async getNodeList(params = this.page) {
      try {
        this.loading = true
        const { totalCount, currentPageRecords } = await searchNode(params)
        if (currentPageRecords.length === 0 && totalCount !== 0) this.page.pageIndex--
        currentPageRecords.forEach(item => {
          item.businessName = item.businessType.name
          item.regionName = item.region.name
          item.addrName = item.addr.split('-').at(-1)
        })
        this.total = totalCount
        this.nodeList = currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async getRegion() {
      const { currentPageRecords } = await getRegion(this.page)
      this.form.select.options = currentPageRecords
    },
    onSearch(value) {
      this.getNodeList({ ...this.page, name: value.input, regionId: value.select })
    },
    showDetails(row) {
      this.$refs.details.initialization(row.id)
    },
    updateRegion(row) {
      const addArea = this.$refs.addArea
      const addr = row.addr.split('-')
      const arr = []
      // 递归遍历
      addr.reduce((prev, item) => {
        prev[item] && arr.push(prev[item].code)
        return prev[item] || prev
      }, TextToCode)
      addArea.selectedOptions = arr
      Object.keys(addArea.formData).forEach(key => {
        addArea.formData[key] = row[key]
      })
      addArea.formData.addr = addr.at(-1)
      addArea.id = row.id
      addArea.showDialog = true
    },
    async deleteNode(row) {
      try {
        await deleteNode(row.id)
        this.$message.success('删除成功')
        this.getNodeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang=''>
</style>