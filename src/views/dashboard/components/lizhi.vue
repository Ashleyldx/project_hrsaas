<template>
    <!-- 弹出层 -->
    <el-dialog  title="离职申请" :visible="visibleDialog" :before-close="handleClose">
      <el-form
        ref="lizhiruleForm"
        :model="ruleForm"
        status-icon
        label-width="110px"
        :rules="rules"
      >
        <!--离职表单-->
        <el-form-item label="离职时间" prop="end_time">
          <el-date-picker
            v-model="ruleForm.end_time"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="离职原因" prop="reason">
          <el-input
            v-model="ruleForm.reason"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8}"
            style="width: 70%;"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleConfirm">确定</el-button>
          <el-button size="small" @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>


</template>

<script>
export default {
  name: 'LiZhiIndex',
  props: {
    visibleDialog: {
      type: Boolean,
      default: false,
    },
    data() {
      return {
        ruleForm: {
          end_time: '',
          reason:''
        },
        rules:[{ required:true}]
      }
    },
    methods: {
      handleClose() {
        this.$emit('update:visibleDialog',false)
      },
      handleConfirm() {
        
      }
    }
  }

}
</script>

<style>

</style>