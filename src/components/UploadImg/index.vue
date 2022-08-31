<template>
  <div>
    <el-upload
    v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    action="#"
    list-type="picture-card"
    :file-list="fileList"
    :on-change="change"
    :http-request="onRequest"
    :on-remove="onRemove"
    :on-preview="onPreview"
    :limit="limit"
    :class="`${fileList.length === limit?'hideCard':''}`"
    :before-upload="beforeUpload"

    >
    <!--  http-request="Request" 覆盖默认action上传，可以自己请求上传 -->
    <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 动态显示 -->
    <el-dialog
           title="图片预览"
           :visible.sync="previewImgDialogVisible"
           >
  <img style="width: 100%" src="http://destiny001.gitee.io/image/cxk.gif">
</el-dialog>
    </div>
  </template>

<script>
  import COS from 'cos-js-sdk-v5'
  const cos = new COS({
    SecretId: 'AKIDxnQpztYy83j9KGwc3FCtKWUCfsqY0DBu',
    SecretKey: 'YqthIfqoniU4SfipoW0HMErFPK0RecMr'
  })
console.log(cos)
  
export default {
  name: 'UploadImg',
  props: {
    limit: {
      type: Number,
      default:1
    },
    beforeUploadCheck: Function  // 父组件里面传过来就是个函数
  },
data() {
  return {
      loading: false,
      fileList: [
        { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' },
        ],
          previewImgDialogVisible: false, // 控制显示弹层
          ImgUrl: '',// 图片地址
      }
  },
  mounted() {
    
  },
  methods: {
    change(file,fileList) {
      // file 当前操作的文件对象
      // fileList 组件维护file列表
      console.log(fileList);
      console.log(this.fileList);
      this.fileList = fileList
      // 文件改变 上传成功和失败都会触发
    },
    // onRequest 自定义上传行为
    onRequest(data) {
      // data.file 代表当前上传的文件 给后端的数据
        // console.log('====');
        this.loading = true
        cos.putObject({
          Bucket: 'ashley-hrsaas-32-1313544737', /* 填入您自己的存储桶，必须字段 */
          Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
          Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
          StorageClass: 'STANDARD',
          Body: data.file, // 上传文件对象
          onProgress: function(progressData) {
            console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
          }
        }, (err, data) => {
          console.log('======', err, data)
              // 需要把腾讯云的地址给后端
          this.loading = false
        
          if ( err || data.statusCode !== 200) {
            return this.$message.error('图片上传有误')
          }
          this.$emit('onSuccess', {
            url:'https://'+ data.Location
          })
        })
        
      },
       // 动态绑定
    onRemove(file, fileList) {
      console.log('file',file);
      this.fileList = fileList
  },
    onPreview(file) {
      console.log(file.url);
      this.previewImgDialogVisible = true
      this.imgUrl = file.url
    },
    // ***图片上传校验,校验一般是布尔值
    beforeUpload(file) {
      // console.log(file);
      // 如果有外界传进来的图片以外界为主（自定义情况，起补充作用可以与默认情况同时存在）
      if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) { // !this.beforeUploadCheck(file)调用方法查看返回
        return false;
      }
      // 一般分两种情况
      // 自定义 完全 ==>所有的逻辑取决于 自定义， 自定义和默认是相互排斥的
      // if (this.beforeUploadCheck) {
      //   return this.beforeUploadCheck(file)
      // }

      // 自定义 完全 ==》所有的逻辑取决于 先自定义 再默认， 自定义和默认是不相互排斥的
      // if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {
      //   return false
      // }

      // 默认情况
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png','image/svg+xml'] // 判断文件格式
      if (!types.includes(file.type)) {  // includes
        this.$message.error(`请选择以下${types.join(',')}格式`)
        return false
      }
      const maxSize=5 * 1024 * 1024 // 图片大小计算
      if (file.size > maxSize) {
        this.$message.error('文件上传格式大于5MB')
        return false
      }
      return true
    }
  }, 
}
</script>

<style lang="scss">
  .hideCard {
    .el-upload--picture-card {
      display: none;
    }
  }

</style>