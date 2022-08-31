<template>
  <div class="app-container">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <!-- {{$route.params}} -->
          <el-form label-width="120px" ref="infoForm" :model="userInfo" :rules="rules" style="margin-left: 120px; margin-top:30px">
            <el-form-item label="姓名:" prop="username">
              <el-input  v-model="userInfo.username" style="width:300px" />
            </el-form-item>
            <el-form-item label="密码:" prop="password2">
              <el-input v-model="userInfo.password2" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
         <el-tab-pane label="个人详情">
            <!-- 放置个人详情 -->
            <!-- <component :is="userComponent" /> -->
            <userInfo ref="userInfoRef"/>
            </el-tab-pane>

         <el-tab-pane label="岗位详情">
            <!-- 放置岗位详情 -->
            <jobInfo />
            <!-- <component :is="JobInfo" /> -->
          </el-tab-pane>

      </el-tabs>
    </el-card>
      
      
  </div>
</template>

<script>
import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import jobInfo from './components/job-info.vue'
import userInfo from './components/user-info.vue'

export default {
  name: 'detailIndex',
  components: { jobInfo, userInfo },
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        password2: '',
      },
      
     /**
      * 此处接口中读取的是后端的密文，前端不能解密，所以当我们没有任何修改就保存时，
      *  会校验失败，因为密文超过了规定的12位长度，为了真的修改密码，我们设定了一个临时的字段 password2，
      *  用它来存储我们的修改值，最后保存的时候，把password2传给password
      */
      // 姓名 必填
    // 密码 必填 密码长度为6-9之间
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        password2: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 6, max: 9, message: '密码错误', trigger: 'blur' }]
      }
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    }
  },
  created() {
    this.getUserDetailById()
    console.log(this)
  },
  methods: {
    async getUserDetailById() {
      const res = await getUserDetailById(this.userId);
      Object.assign(this.userInfo, res)
      console.log(this.userInfo);
      this.$refs.userInfoRef.userInfo = {...this.userInfo}
      this.$refs.userInfoRef.setImageUrl (this.userInfo.staffPhoto)
    },
    async updateUserInfo() {
      try {
        await this.$refs.infoForm.validate()
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        this.$message.success('更新成功')
      } catch (err) {
        console.log(err)
      } 
    }
    
  }
}
</script>

<style>

</style>