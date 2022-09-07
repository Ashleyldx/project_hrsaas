<template>
  <div class="region-container">
    <Search :form="form" @submit="onSearch" />
    <Panel>
      <template #button>
        <add-button @click="$refs.addPartner.showDialog=true" />
      </template>
      <template #table>
        <Table v-loading="loading" :column-data="columnData" :data="partnerList">
          <template #operation="{row}">
            <el-button type="primary" class="el-button--text" @click="resetPassword(row)">重置密码</el-button>
            <el-button type="primary" class="el-button--text" @click="$refs['details'].initialization(row)">查看详情</el-button>
            <el-button type="primary" class="el-button--text" @click="updatePartner(row)">修改</el-button>
            <el-button type="primary" class="el-button--text el-button--danger-text" @click="deletePartner(row)">删除</el-button>
          </template>
        </Table>
      </template>
      <template #pagination>
        <Pagination :total="total" :page-size="page.pageSize" :current-page.sync="page.pageIndex" />
      </template>
    </Panel>
    <partner-details ref="details" />
    <add-partner ref="addPartner" @getPartnerList="getPartnerList" />
  </div>
</template>
<script>
import { getPartnerList, resetPassword, deletePartner } from '@/api'
import partnerDetails from './components/partner-details.vue'
import addPartner from './components/add-partner.vue'
import { confirmConfig } from '@/utils'
export default {
  name: '',
  components: {
    partnerDetails,
    addPartner
  },
  props: {},
  data() {
    return {
      form: {
        input: {
          label: '合作商搜索'
        }
      },
      loading: false,
      columnData: [
        { width: '80', type: 'index', label: '序号' },
        { prop: 'name', label: '合作商名称' },
        { prop: 'account', label: '账号' },
        { prop: 'vmCount', label: '设备数量' },
        { prop: 'ratio', label: '分成比例', formatter: (row) => row.ratio + '%' },
        { prop: 'contact', label: '联系人' },
        { prop: 'mobile', label: '联系电话' },
        { width: '250', prop: 'operation', label: '操作' }
      ],
      page: {
        pageIndex: 1,
        pageSize: 10
      },
      total: 0,
      partnerList: []
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
    this.getPartnerList()
  },
  methods: {
    async onSearch(form) {
      this.getPartnerList({ ...this.page, name: form.input })
    },
    async getPartnerList(params = this.page) {
      try {
        this.loading = true
        const { totalCount, currentPageRecords } = await getPartnerList(params)
        if (currentPageRecords.length === 0 && totalCount !== 0) this.page.pageIndex--
        this.total = totalCount
        this.partnerList = currentPageRecords
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    updatePartner(row) {
      const addPartner = this.$refs.addPartner
      const blackPartner = ['account', 'password']
      Object.keys(addPartner.formData).forEach(key => {
        if (blackPartner.includes(key)) return
        addPartner.formData[key] = row[key]
      })
      addPartner.$set(addPartner.formData, 'id', row.id)
      addPartner.showDialog = true
    },
    async resetPassword(row) {
      try {
        await this.$confirm('', confirmConfig('确定要重置合作商密码吗？'))
        await resetPassword(row.id)
        this.$message.success('重置密码成功')
        this.getPartnerList()
      } catch (error) {
        console.log(error)
      }
    },
    async deletePartner(row) {
      try {
        await deletePartner(row.id)
        this.$message.success('删除成功')
        this.getPartnerList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style scoped lang=''>
</style>