<template>
  <!-- 看看框架是怎么搭的，把帝可得写出来！！！！ -->
  <div class="app-container">
    <el-tabs v-model="activeName">
      <!-- 角色管理 -->
      <el-tab-pane label="角色管理" name="first">
        <el-row style="height:60px">
          <el-button icon="el-icon-plus" size="small" type="primary">新增角色</el-button>
        </el-row>
        <!-- 表单 -->
        <el-table
          v-loading="loading"
          border
          :data="list"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="name"
            label="角色"
            width="180"
          />
          <el-table-column
            prop="description"
            label="描述"
          />
          <el-table-column
            label="操作"
            width="320"
          >
            <el-button type="success" size="medium">
              分配权限
            </el-button>
            <el-button type="primary" size="medium">
              编辑
            </el-button>
            <el-button type="danger" size="medium">
              删除
            </el-button>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" style="height:60px" align="middle">
          <!-- 分页参看文档 -->
          <el-pagination
            background
            :current-page.sync="page.page"
            layout="total, prev, pager, next, sizes"
            :page-size="page.pagesize"
            :page-sizes="[5,10,20,30]"
            :total="total"
            @current-change="changePage"
            @size-change="changeSize"
          />
        </el-row>
      </el-tab-pane>

      <!-- 公司信息 -->
      <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  name: 'SettingIndex',
  data() {
    return {
      activeName: 'second',
      page: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      loading: false
    }
  },
  // 拿数据填充页面 // 这个页面再仔细看看
  mounted() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() { // 拿数据就是调用接口
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page) // 测试代码 在mounted里面测试看一下接口是否能用
        // console.log(res) // row total
        this.list = rows
        this.total = total // 本页没写完，再校对一下！！
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }

  },
  changePage(val) { // val 是最新页面
    this.getRoleList()
  },
  changeSize() {
    this.getRoleList()
  }
}
</script>

<style>

</style>
