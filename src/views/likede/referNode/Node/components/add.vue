<template>
  <dialog-form
    :title="`${isUpdate ? '修改' : '新增'}点位`"
    :visible.sync="showDialog"
    @closed="onCancel"
    @concel="showDialog=false"
    @determine="onDetermine"
    @open="initialization"
  >
    <el-form
      ref="formData"
      :rules="rulus"
      :model="formData"
      label-width="140px"
    >
      <el-form-item label="点位名称：" prop="name">
        <dialog-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="所在区域：" prop="regionId">
        <el-select v-model="formData.regionId" placeholder="请选择">
          <el-option
            v-for="item in regionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属商圈：" prop="businessId">
        <el-select v-model="formData.businessId" placeholder="请选择">
          <el-option
            v-for="item in businessType"
            
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="归属合作商：" prop="ownerId">
        <el-select v-model="formData.ownerId" placeholder="请选择">
          <el-option
            v-for="item in partnerList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="onOwnerChange"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址：" prop="addr">
        <el-cascader
          v-if="!isDestroyed"
          ref="cascader"
          v-model="selectedOptions"
          class="area-cascader-wrap"
          size="large"
          :options="options"
        />
        <el-input
          v-model="formData.addr"
          :maxlength="40"
          type="textarea"
          placeholder="请输入详细地址"
          show-word-limit
        />
      </el-form-item>
    </el-form>
  </dialog-form>
</template>
<script>
import { getBusinessType, getRegion, getPartnerList, addNode, updateNode } from '@/api'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: '',
  props: {},
  data() {
    return {
      selectedOptions: [],
      showDialog: false,
      isDestroyed: false,
      options: regionData,
      id: '',
      formData: {
        name: '',
        addr: '',
        areaCode: '',
        businessId: '',
        createUserId: 1,
        ownerId: '',
        ownerName: '',
        regionId: ''
      },
      rulus: {
        name: [
          { required: true, message: '请输入点位名称', trigger: 'blur' }
        ],
        addr: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        businessId: [
          { required: true, message: '请输入所属商圈', trigger: 'blur' }
        ],
        ownerId: [
          { required: true, message: '请输入归属合作商', trigger: 'blur' }
        ],
        regionId: [
          { required: true, message: '请输入所在区域', trigger: 'blur' }
        ]
      },
      page: {
        pageIndex: 1,
        pageSize: 100000
      },
      businessType: [],
      regionList: [],
      partnerList: []
    }
  },
  computed: {
    isUpdate() {
      return this.id
    }
  },
  created() {
    this.getBusinessType()
    this.getRegion()
    this.getPartnerList()
  },

  methods: {
    onCancel() {
      this.id = ''
      this.$refs['formData'].resetFields()
      this.formData = {
        name: '',
        addr: '',
        areaCode: '',
        businessId: '',
        createUserId: 1,
        ownerId: '',
        ownerName: '',
        regionId: ''
      }
      this.selectedOptions = []
      this.isDestroyed = true
    },
    async getBusinessType() {
      this.businessType = await getBusinessType()
    },
    async getRegion() {
      const { currentPageRecords } = await getRegion(this.page)
      this.regionList = currentPageRecords
    },
    async getPartnerList() {
      const { currentPageRecords } = await getPartnerList(this.page)
      this.partnerList = currentPageRecords
    },
    onOwnerChange(e) {
      this.formData.ownerName = e.target.innerText
    },
    processing() {
      this.addr = this.selectedOptions.reduce((prev, item) => {
        prev.push(CodeToText[item])
        return prev
      }, []).join('-') + '-' + this.formData.addr
      this.formData.areaCode = +this.selectedOptions.at(-1)
    },
    async onDetermine() {
      try {
        await this.$refs['formData'].validate()
        this.processing()
        const data = { ...this.formData, addr: this.addr }
        if (this.isUpdate) {
          await updateNode(this.id, data)
        } else {
          await addNode(data)
        }
        this.$message.success(`${this.isUpdate ? '修改' : '新增'}成功`)
        this.showDialog = false
        this.$emit('getNodeList')
      } catch (error) {
        console.log(error)
      }
    },
    initialization() {
      // 控制三级联动的生命
      this.isDestroyed = false
    }
  }
}
</script>
<style lang='scss'>
.area-cascader-wrap {
  margin-bottom: 20px;
  width: 100%;
}
.el-select {
  width: 100%;
}
</style>