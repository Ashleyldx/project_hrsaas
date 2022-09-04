<template>
  <el-dialog
    title="分配权限"
    :visible.sync="dialogVisible" 
    :before-close="handleClose"
  >
  <!-- visible控制表单显隐 -->
    <el-tree
      ref="permTree"
      :data="permData"
      show-checkbox
      :props="defaultProps"
      :default-checked-keys="selectedKeys"
      :default-expand-all="true"
      :check-strictly="true"
      node-key="id"
    />
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="sureAdd">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {  getPermissionList } from '@/api/permission'
import { transListToTreeData } from '@/utils/index'
import { assignPerm, getRoleDetail } from '@/api/setting'

export default {
  name: 'HrsaasManagerPermission',
  props: {
    dialogVisible: {
      type: Boolean,
      default:false
    }
  },

  data() {
    return {
      permData: [],
      defaultProps: {
        label:'name',
      },
      selectedKeys: [],
      userId:'',
      loading: false
      
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.selectedKeys = []
    },
    async getPermissionList(id) {
      this.userId = id
      try {
        const res = await getPermissionList()
        this.permData = transListToTreeData(res, '0')
        const { permIds } = await getRoleDetail(id)
        this.selectedKeys = permIds
        // const res = await getPermissionList()
        // console.log(res)
        console.log(this.permData)
      } catch (err) {
        console.log(err)
      }
    },
    async sureAdd() {
      try {
        this.loading = true
        const res = this.$refs.permTree.getCheckedKeys()
        await assignPerm({ permIds: res, id: this.userId})
        this.$message.success('角色权限成功')
        this.handleClose()
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false
      }
      
    }
  }
 
}
</script>
