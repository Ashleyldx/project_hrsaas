<template>
  <el-card class="page-tools">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col>
        <!-- 前插槽 -->
        <div v-if="showBefore" class="before">
        <!-- 图标随着showBefore显示 -->
          <i class="el-icon-info"></i>
          <slot name="before"/>
        </div>
     
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
           <!-- 后插槽 -->
        <slot name="after"/>

        </el-row>
       
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
// 组件可以显示 左侧内容 也可以显示右侧内容
export default {
  props: {
    showBefore: {
      default: false,
      type:Boolean
    }
  }

}
</script>

<style>

</style>