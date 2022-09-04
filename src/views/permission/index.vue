<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools :show-before="false">
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPer('0', 1)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table 
        border 
        v-loading="loading"
        :data="perList" 
        row-key="id" 
        :default-expand-all="true" >
        <el-table-column label="序号" type="index" />
        <el-table-column align="center" label="名称" prop="name"/>
        <el-table-column align="center" label="标识" prop="code"/>
        <el-table-column align="center" label="描述" prop="description"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.type*1===1" type="text" icon="el-icon-circle-plus-outline" @click="addPer(row.id, 2)">添加</el-button>
            <el-button type="text"  icon="el-icon-edit" @click="edit(row)">编辑</el-button>
            <el-button type="text"  icon="el-icon-delete" style="color:red" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
   <addPermission ref="addPermission" :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
import { getPermissionList, delPermission} from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
import addPermission from './components/add-permission.vue'
export default {
  name: 'PermissionIndex',
  components: { addPermission },
    data() {
      return {
        perList: [],
        loading: false,
        dialogVisible:false
     }
  },
    mounted() {
      this.getPermissionList() //调用接口
    },
  methods: {
    async getPermissionList() {
      try {
        this.loading = true
        const res = await getPermissionList()
        this.perList = transListToTreeData(res, '0')
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false// 如果不写成false前端页面一直loading状态
      }
    },
    async del(id) { // 删除接口 // 删除都要有二次提醒
      try {
        await this.$confirm('确定删除吗', '提示', {
          type:'warning'
        })
        await delPermission(id)
        this.$message.success('删除成功')
        this.getPermissionList()
      } catch (err) { 
        console.log(err);
      }
    },
    addPer(pid, type) {
      this.$refs.addPermission.formData.pid = pid
      this.$refs.addPermission.formData.type = type
      this.dialogVisible = true
      
    },
    edit(row) {
      this.$refs.addPermission.formData = { ...row } // 浅拷贝
      this.dialogVisible = true
     }
    },
  }
</script>
