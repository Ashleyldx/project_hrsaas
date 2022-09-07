<template>
  <div>
    <el-dropdown @command="change">
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="$i18n.locale==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="$i18n.locale==='zh'">英文</el-dropdown-item>
    </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Lang',
  data() {
    return {
    }
  },
  methods: {
    change(type) { // type表示子元素类型
      console.log('type',type)
    }
  }

}
</script>

<style>

</style>