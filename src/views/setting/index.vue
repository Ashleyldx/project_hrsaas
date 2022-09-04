<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- 左边-角色管理 -->
      <el-tab-pane label="角色管理" name="first">
        <el-row style="height:60px">
          <el-button icon="el-icon-plus" size="small" type="primary" @click="handleAdd">新增角色</el-button>
        </el-row>
        <!-- 表单 -->
        <el-table
          v-loading="loading"
          border
          :dialog-visible.sync="dialogVisible"
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            align="center"
            prop="name"
            label="角色"
            width="180"
          />
          <el-table-column
            align="center"
            prop="description"
            label="描述"
          />
          <el-table-column
            align="center"
            label="操作"
            width="320"
          >
          <template slot-scope="scope">
            <!-- 作用域插槽 -->
             <el-button type="success" size="medium" @click="assign11(scope.row)">
              分配权限
            </el-button>
            <el-button type="primary" size="medium" @click="edit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="medium" @click="del(scope.row.id)">
              删除
            </el-button>
          </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="height:60px" align="middle">
          <!-- 分页参看文档 -->
          <el-pagination
            v-if="total>0"
            background
            :current-page.sync="page.page"
            layout="total, prev, pager, next, sizes"
            :page-size.sync="page.pagesize"
            :page-sizes="[5,10,20,30]"
            :total="total"
            @current-change="changePage"
            @size-change="changeSize"
          />
        </el-row>
      </el-tab-pane>
      <!-- 公司信息 -->
      <el-tab-pane label="公司信息" >
      <el-alert
        type="info"
        :closeable="false"
        description="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
        :show-icon="true"
      />
      <!-- 表单 -->
      <el-form label-width="120px" style="margin-top:50px">
        <el-form-item label="公司名称">
          <el-input v-model="formData.name" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="formData.address" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="公司邮箱">
          <el-input v-model="formData.mailbox" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remarks" type="textarea" :row="3" disabled style="width:400px" />
        </el-form-item>
      </el-form>
      </el-tab-pane>
    </el-tabs>

    <!-- 引入组件 -->
    <roleDialog ref="roleDialog" :dialog-visible.sync="dialogVisible" @refresh="getRoleList" />
    <!-- 把.sync拆分成dialogVisible属性和update:dialogVisible属性 -->
    <!-- roleDialog :dialog-visible="dialogVisible" @update:dialogVisible="接收子组件传递过来的值，改变dialogVisible"-->
    <managerPermission ref="managerPermission" :dialog-visible.sync="theDialogVisible"></managerPermission>
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import roleDialog from './components/roleDialog.vue'
import managerPermission from './components/manager-permission.vue'
import { mapGetters } from 'vuex' // 引入companyId,从辅助函数中引入参数放到计算属性上

export default {
  
  name: 'SettingIndex',
  components: { roleDialog, managerPermission },
  data() {
    return {
      activeName: 'second',
      page: { // 放置页码及相关数据
        page: 1,
        pagesize: 10
      },
      list: [], // 承接数组
      total: 0, // 记录总数
      loading: false,
      formData: {}, // 承载公司信息
      dialogVisible: false,
      theDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId']) // 在methods中调用
  },
  // 拿数据填充页面 // 这个页面再仔细看看
  mounted() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() { // 拿数据就是调用接口
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page) // 测试代码 在mounted里面测试看一下接口是否能用
        // console.log(res) // row total
        this.list = rows
        this.page.total = total
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    changePage(val) { // val 是最新页面
    // this.page.page = val // 将当前页码赋值给当前最新的页码
      this.getRoleList() // 封装的方法在此处调用
    },
    changeSize(val) {
    // this.page.pagesize = val
    this.getRoleList()
    },
    handleAdd() {
    this.dialogVisible = true
    },
    edit(row) {
    // console.log('row', row);
      this.dialogVisible = true
      this.$refs.roleDialog.roleForm = {...row} // 浅拷贝
    },
    async del(id) {
    console.log(id)
    //     this.$confirm('是否确认删除该角色?', '提示', {
    //       confirmButtonText: '确定', // confirmButtonText 确认按钮文本
    //       cancelButtonText: '取消', // 取消按钮文本
    //       type: 'warning'
    //     }).then(() => {
    //       console.log('确定')
    //       this.$message({
    //         type: 'success',
    //         message: '删除成功!'
    //       });
    //     }).catch(() => {
    //       console.log('取消')
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       });          
    //     });
    try {
      await this.$confirm('是否确认删除该角色？', '提示', { type: 'warning' })
      // console.log('==============');
      await deleteRole(id)
      this.$message.success('角色删除成功')
      this.page.page = 1
      this.getRoleList()
      // 删除接口
    } catch (e) {
      console.log(e);
    } 
    },   
    // 封装一个方法
    async getCompanyInfo() { // formData专门承载公司信息
      this.formData = await getCompanyInfo(this.companyId)
    },
    async assign11(row) {
      await this.$refs.managerPermission.getPermissionList(row.id)
      this.theDialogVisible = true
      
    }
  },
  
}
// 词汇
/**
 * page-size 每一页展示的条数
 * page-sizes 每页显示个数选择器的选项设置
 * current-change 改变当前页码触发(current-change值改变的时候触发)
 * size-change 改变页面的数据条数的时候触发(page-size值改变的时候触发)
 *
 */
</script>

<style>

</style>
