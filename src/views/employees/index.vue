<template>
  <div class="dashboard-container">
    <div class="app-container">
     <PageTools>
      <!-- 左侧显示总记录数 -->
      <!-- slot="插槽名称"旧语法
      v-slot:插槽的名称 新语法 两者不混合使用 -->
      <!-- <span slot="before">共16条记录</span> -->
       <span slot="before">共计{{total}}条记录</span>
      <template slot="after">
          <!-- <el-button size="small" type="success">excel导入</el-button> -->
          <el-button size="small" type="warning" @click="$router.push('/import?type = user')">导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" @click="add">新增员工</el-button>
      </template>
     </PageTools>
     <!-- 表格组件 -->
    <el-card v-loading="loading">
        <el-table border :data="list">
        <!-- 表格中如何显示序号,props告诉表格需要渲染的数据 -->
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="头像" sortable="" prop="workNumber" >
            <template slot-scope="{ row }">
             <img 
             v-imageError="require('@/assets/common/bigUserHeader.png')"
             :src="row.staffPhoto" 
             alt="" 
             style="border-radius: 50%; width: 100px; height: 100px; padding: 10px;"
              @click="showErCodeDialog(row.staffPhoto)"
             >
            <!-- @click= -->
            </template>
          </el-table-column>
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter='formatEmployment' />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" prop="timeOfEntry" sortable="" >
            <template slot-scope="scope">
            <!-- 将时间进行格式化 -->
              {{scope.row.timeOfEntry}}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState" sortable="" >
            <template slot-scope="{ row }">
             <el-switch :value="row.enableState===1"/>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="asRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
          v-if="total>0"
          background
          :current-page.sync="page.page" 
          :page-size.sync="page.size" 
          :page-sizes="[5,10,15]" 
          :total="total" 
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
          layout="total, prev, pager, next" />
        </el-row>
      </el-card>
    </div>
    <!-- 放置组件弹层 -->
    <!-- sync 修饰符 是子组件去改变父组件的一个语法糖，可以帮助我们少写代码 -->
    <add-employee :visible-dialog.sync="visibleDialog" @refresh="getEmployeeList"></add-employee>
    <!-- .sync ：visible-dialog = "visibleDialog"和@update:visibleDialog="把子组件
    传递过来的值 赋值给 visibleDialog"-->
    <!-- 自定义组件双向绑定 -->
    <div id="mydiv" style="display:none">123</div>
    <el-dialog title="头像二维码" :visible.sync="ercodeDialog" custom-class="canvaseq">
      <canvas id="canvas"></canvas>
    </el-dialog>

    <AssignRole 
        ref="assignRole" 
        v-model="assignRoleDialog" 
        :user-id="currentUserId" 
        :info="12" 
        @test="test11"></AssignRole>
    <!-- v-model="assignRoleDialog" v-bind:value = "assignRoleDialog"  @input -->
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees' // 引入员工的枚举对象
import AddEmployee from './components/add-employee.vue'
import assigRole from './components/assign-role.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'


export default {
  name:'EmployeeIndex',
  components:{ AddEmployee, assigRole, AssignRole },
  data() {
    return {
      // EmployeeEnum,
      loading: false, // 显示遮罩层
      list: [], // 接收数组
      page: {
        page: 1,
        size: 10,
        
      },
      visibleDialog: false, //默认关闭
      total: 0, // 分页的总数
      ercodeDialog:false, // 让弹窗显隐
      assignRoleDialog: false,
      currentUserId: '',
      test11:''
    }
  },
  mounted() {
    this.getEmployeeList() // 调用方法
  },
  methods: {
    async getEmployeeList() {
      try {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.total = total
      this.list = rows
      
      if (total!==0 && rows.length === 0) {
        this.page.page = this.page.page - 1
        // 重新调用接口
        this.getEmployeeList()
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false
      }
    },
    // newPage是最新的页码
    changePage(newPage) {
      this.page.page = newPage // 赋值最新的页码
      this.getEmployeeList() //重新拉取数据
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 要去找1所对应的值
      // 聘用形式 // constant下面枚举对象
      // hireType: [
      //   {
      //     id: 1,
      //     value: '正式'
      //   },
      //   {
      //     id: 2,
      //     value: '非正式'
      //   }
      // ],
      // const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      // return obj ? obj.value:'非正式' 
      const obj = EmployeeEnum.hireType.find(item => item.id == cellValue * 1)
      // *1 : 后端返回的数据是字符串*1可以转化为数字
      return obj ? obj.value : '非正式'
      // return ?.  ES的一种表达式
      // ?. es6 obj?.value obj 存在吗 存在就是 obj.value
      // ?? obj?.value ?? '非正式'
      // return obj?. value ?? '非正式'
      // ?? 是前面值为undefind和null的时候才会执行后面的代码 || 前面只要是假值都会执行，
      // 有时候不希望0变成假值就可以用 ??
    },
   
    add() {
      this.visibleDialog = true
    },
    // 删除接口
    // 属性列表
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除吗', '提示', {
          type: 'warning'
        })
        // console.log('接口');
        await delEmployee(id)
        this.getEmployeeList() // 重新拉取数据成功
        this.$message('删除员工成功')
      } catch (error) { // 捕捉到错误之后先查看接口
      console.log(error);
     }
    },
    async exportData() {
      const { rows } = await getEmployeeList({
        page : 1,
        size : 10
      })
      // console.log(rows)
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const data = this.fromJson(headers, rows)
      import('@/vendor/Export2Excel').then(excel => {
        // const merges =['A1:A2','B1:G1']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: data, // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填,
          multiHeader:[['姓名','主要信息','','','','','']], // 复杂表头
          merges:['A1:A2','B1:G1'] // 合并选项

        })
      })
      console.log(this.fromJson(headers, rows));
    },

     fromJson(headers, rows){
        return rows.map(ele => {
            //  Object.keys(headers)
      // rows.forEach(ele => { //
      //   const arr = []
      //   Object.keys(headers).forEach(
      //     // ['姓名','手机号','入职日期',...]
      //     key => { 
           // arr.push() // headers[key] 取到的是英文
           // ele[headers[key]] 取到的是对应的值
      //       arr.push(ele[headers[key]])
      //     }
      //   )
      // console.log([key]);
      //   console.log(arr)
      //   // ele  {  correctionTime: "2019/9/11",mobile: "13041130789",timeOfEntry: "2019/3/11",username: "高小山",workNumber: "20099"}
      // })

          return Object.values(headers).map(key => {
            if (key === 'timeOfEntry' || key === 'correctionTime') {
              // 处理时间
              return formatDate(ele[key])
            } else if (key === 'formOfEmployment') {
          // 处理时间
          // hireType
          // return 处理时间
          const obj = EmployeeEnum.hireType.find(ele1 => ele1.id === +ele[key])
          return obj?.value ||'非正式'
        }
          return ele[key] 
        })
      // const arr1 = rows.map(ele => {
      //   // const arr = []
      //   return Object.keys(headers).map(key => {
      //     return ele[headers[key]] 
      //   })
      // }
      // )
      // console.log(arr1)
      })
        // Object.keys()  Object.values() Object.entries() ===>es6 新增对象处理方法
    },
    async showErCodeDialog(staffPhoto) {
      // staffPhoto 地址存在的时候
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.ercodeDialog = true
      await this.$nextTick()
      const dom = document.querySelector('#canvas')
      console.log(dom);
      QrCode.toCanvas(dom, staffPhoto)
    },
    async asRole(id) {
      this.currentUserId = id
      await this.$refs.assignRole.getRoleList()
      this.assignRoleDialog = true
    },
  
    

  }
}
</script>

<style lang="scss">
.canvaseq .el-dialog__body {
  text-align: center;
}
</style>
