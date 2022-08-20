<template>
  <div class="dashboard-container">
    <!-- 常用的取值方法 -->
    <div class="dashboard-text">name: {{ }}</div>
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
