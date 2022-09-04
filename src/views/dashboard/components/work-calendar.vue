<template>
  <div>
    <el-row type="flex" justify="end" align="middle">
     <el-select v-model="currentYear" size="small" style="width:120;margin-right:8px" >
      <el-option v-for="item in yearList" :key="item" :label="item" :value="item" @change="dataChange"/>
     </el-select >
     <el-select v-model="currentMonth" size="small" style="width: 120px">
      <el-option v-for="item in 12" :key="item" :label="item" :value="item" @change="dataChange"/>
     </el-select>
    </el-row>
    <el-calendar v-model="currentDate" >
    <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div> 
      </template>
  </el-calendar>
  </div>
</template>

<script>
export default {
  name:'WorkCalender',
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: 1, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  filters: {
    getDay(value) { // value传递进入的日期
      return value.getDay()
    }
  },
  created() {
    this.currentYear = this.startDate.getFullYear()
    this.currentMonth = this.startDate.getMonth() + 1
    // yearList
    // yearList [前五年 currentYear 后五年]
    this.yearList = Array.from(Array(11), (value, index) => {
      return currentYear - 5 + index
    })
    this.dateChange()
    console.log(this.yearList)
  },
  methods: {
    dataChange() {
      const year = this.currentYear
      const month = this.currentMonth
      this.currentDate=new Date(`${this.currentYear}-${this.currentMonth}-${this.startDate.getDate()}`)
    },
    isWeek(date) {
      console.log(date.getDay());
      return date.getDay() === 0 || date.getDay() === 6
      
    }
  },
}
</script>

<style scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,
 /deep/ .el-calendar-table tr td:first-child,  
 /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>

