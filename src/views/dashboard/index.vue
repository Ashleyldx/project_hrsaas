<template>
  <div class="dashboard-container">
    <!-- 常用的取值方法 -->
    <div class="dashboard-text">name: {{ name}}</div>
    <UploadExcel :before-upload="beforeUpload" :on-success="success"/>
    <a
      href="http://localhost:8888/static/img/login-logo.758b34e9.png"
      download="login-logo.758b34e9.png"
    >点击</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  // directives 局部注册自定义指令
  directives: {
    color: {
      inserted(dom, options, vNode) {
        console.log(dom) // dom 指令绑定元素
        console.log(options) // 描述当前指令信息;
        console.log(vNode.context) // 可以访问到当前的vue实例;
        // 实现更改当前的dom 元素
        dom.style.color = options.value
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
  // import('@/vendor/Export2Excel').then(excel => {
  //     excel.export_json_to_excel({
  //       header: ['姓名', '手机号', '入职日期', '聘用形式'], // 表头 必填
  //       data: [['huaximing', '13399999', '2020-2020-2020', '正式']], // 具体数据 必填
  //       filename: 'excel-list', // 非必填
  //       autoWidth: true, // 非必填
  //       bookType: 'xlsx' // 非必填
  //     })
  //   })
},
  methods:{
    beforeUpload(file) {
      // 1024KB===>1024*1024
      // if (file.size > 1024) {
      //   this.$message.error('文件大小不能超过1024')
      //   return false
      // }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
