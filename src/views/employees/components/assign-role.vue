<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    :before-close="handleClose"
  >
  <!-- {{this.$attrs}} -->
    <el-checkbox-group v-model="roleIds">
      <!-- 复选框使用 -->
      <el-checkbox 
      v-for="item in roleList"
      :key="item.id"
      :label="item.id">{{item.name}}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" v-loading="loading" @click="btnOk">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'HrsaasAssignRole',
  inheritAttrs: false,
  model: {
    event:'update' // 把v-model默认的input事件改成update
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
     roleIds: [],
      roleList: [],
      loading: false
    }
  },
  watch: {
    value(val) {
      if (val) {
          this.getUserDetailById()
        }
      }
    },
  created() {
    this.getRoleList()
  },  
  methods: {
    handleClose() {
      this.$emit('update',false)
    },
    async getRoleList() {
      const {rows} = await getRoleList()
      // console.log(res);
      this.roleList = rows
    },
      async getUserDetailById() {
        const { roleIds } = await getUserDetailById(this.$attrs['user-id'])
      // console.log(res);
        this.roleIds = roleIds||[]
    },
    // 点击确定时调接口
  
    async btnOk() {
      try {
        this.loading = true
        await assignRoles({id: this.$attrs['user-id'], rolesId: this.rolesId})
        this.$message.success('更新成功')
        this.handleClose()
      } catch (err) {
        console.log(err)
      } finally {
        this.loading=false
      }
    }
  }
}
</script>