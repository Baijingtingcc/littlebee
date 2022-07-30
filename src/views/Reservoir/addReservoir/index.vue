<template>
  <div class="addReservoir">
    <el-card shadow="always">
      <el-form :model="formData" :rules="rules" ref="form">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="库区编号" class="label" prop="code">
                <el-input
                  clearable
                  class="card-input1"
                  disabled
                  v-model="formData.code"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="所属仓库" class="label" prop="warehouseId">
                <el-select
                  @change="changeWare"
                  v-model="formData.warehouseId"
                  placeholder="请选择"
                  clearable
                  class="card-input1"
                >
                  <el-option
                    v-for="(item, index) in ware"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="库区名称" class="label" prop="name">
                <el-input
                  clearable
                  class="card-input1"
                  v-model="formData.name"
                  placeholder="请输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item
                label="温度类型"
                class="label"
                prop="temperatureType"
              >
                <el-select
                  v-model="formData.temperatureType"
                  placeholder="请选择"
                  clearable
                  class="card-input1"
                >
                  <el-option
                    v-for="(item, index) in temperatureType"
                    :key="index"
                    :label="item.value"
                    :value="item.type"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="称重类型" class="label" prop="bearingType">
                <el-select
                  v-model="formData.bearingType"
                  placeholder="请选择"
                  clearable
                  class="card-input1"
                >
                  <el-option
                    v-for="(item, index) in bearingType"
                    :key="index"
                    :label="item.value"
                    :value="item.type"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="用途属性" class="label" prop="useType">
                <el-select
                  v-model="formData.useType"
                  placeholder="请选择"
                  clearable
                  class="card-input1"
                >
                  <el-option
                    v-for="(item, index) in cache"
                    :key="index"
                    :label="item.value"
                    :value="item.type"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="负责人" class="label" prop="personName">
                <el-input
                  clearable
                  class="card-input1"
                  v-model="formData.personName"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-form-item label="联系电话" class="label" prop="phone">
                <el-input
                  clearable
                  class="card-input1"
                  v-model="formData.phone"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <div class="ched">
              <el-form-item label="仓库状态" prop="status">
                <el-radio v-model="formData.status" :label="1">启用</el-radio>
                <el-radio v-model="formData.status" :label="0">停用</el-radio>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" class="row-bg footer" justify="center">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-button round class="rowBtn1" @click="cancel">返回</el-button>
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <el-button type="warning" round class="rowBtn2" @click="onSubmit"
              >提交</el-button
            >
          </div></el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getKQReservoir,
  getWareList,
  getAddResservoir,
  getCurrent
} from '@/api/reservoir'
export default {
  data() {
    return {
      temperatureType: [
        {
          type: 'CW',
          value: '常温'
        },
        {
          type: 'LC',
          value: '冷藏'
        },
        {
          type: 'HW',
          value: '恒温'
        }
      ],
      bearingType: [
        {
          type: 'ZX',
          value: '重型'
        },
        {
          type: 'QX',
          value: '轻型'
        }
      ],
      cache: [
        {
          type: 'RKHCQ',
          value: '入库缓存区'
        },
        {
          type: 'CKHCQ',
          value: '出库缓存区'
        },
        {
          type: 'CCQ',
          value: '存储区'
        },
        {
          type: 'FJQ',
          value: '分拣区'
        },
        {
          type: 'ZJQ',
          value: '质检区'
        }
      ],
      formData: {
        bearingType: '', //  称重类型
        code: '', // 编码
        name: '', // 库区名称
        personName: '', // 负责人
        phone: '', // 联系电话
        status: null, // 仓库状态
        temperatureType: '', // 温度类型
        useType: '', // 用途类型
        warehouseId: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ],
        phone: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ],
        personName: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ],
        warehouseId: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ],
        status: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ],
        temperatureType: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ],
        useType: [
          {
            required: true,
            message: '此选项不能为空'
          }
        ]
      },
      Options: [
        {
          value: '中转仓',
          type: 'ZZ'
        },
        {
          value: '加工仓',
          type: 'JG'
        },
        {
          value: '储备仓',
          type: 'CB'
        },
        {
          value: '冷藏仓',
          type: 'LC'
        }
      ],
      wareList: [],
      ware: [],
      currtentId: ''
    }
  },
  computed: {
    ...mapGetters(['current'])
  },
  created() {
    this.currtentId = this.$store.state.reservoir.currtentID
    this.getKQReservoir()
    this.getWareList()
    this.getCurrent()
    console.log(this.currtentId)
  },
  methods: {
    async getKQReservoir() {
      const { data } = await getKQReservoir()
      console.log(data.data)
      this.formData.code = data.data
    },
    async getWareList() {
      const { data } = await getWareList({
        status: 1
      })
      this.wareList = data.data
      console.log(this.wareList)
      this.wareList.forEach((item) => {
        const res = {
          id: item.id,
          value: item.name
        }
        this.ware.push(res)
      })
      console.log(this.ware)
    },
    changeWare(val) {
      console.log(val)
      this.ware.forEach((item) => {
        if (item.value === val) {
          this.formData.warehouseId = item.id
        }
      })
    },
    async onSubmit() {
      await this.$refs.form.validate()
      // this.ware.forEach(item)
      console.log(this.formData)
      await getAddResservoir(this.formData)
      if (this.currtentId) {
        this.$message.success('编辑成功')
      } else {
        this.$message.success('新增库区成功')
      }
      this.cancel()
    },
    async getCurrent() {
      if (this.currtentId) {
        const res = await getCurrent(this.currtentId)
        console.log(res.data.data)
        this.formData = res.data.data
      } else {
        this.formData = {
          bearingType: '', //  称重类型
          code: '', // 编码
          name: '', // 库区名称
          personName: '', // 负责人
          phone: '', // 联系电话
          status: null, // 仓库状态
          temperatureType: '', // 温度类型
          useType: '', // 用途类型
          warehouseId: ''
        }
      }
    },
    cancel() {
      this.$store.commit('reservoir/closeId')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.addReservoir {
  padding: 20px 20px 0 220px;
  .label {
    /deep/.el-form-item__label {
      font-size: 12px;
      margin-left: 35px;
      color: #8c8282;
    }
  }
  .card-input1 {
    margin-left: 35px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    border: 1px solid #f8f5f5;
    border-radius: 6px;
    background-color: #f8f5f5;
    /deep/.el-input__inner {
      background-color: #f8f5f5;
    }
  }
  .ched {
    margin-left: 35px;
  }
  .footer {
    margin-top: 20px;
    .rowBtn1 {
      width: 150px;
      background-color: #f8f5f5;
      color: #000;
      margin-left: -60px;
      border: none;
      &:hover {
        background-color: #ffb200;
      }
    }
    .rowBtn2 {
      width: 150px;
      background-color: #ffb200;
      color: #000;
      margin-left: -60px;
      &:hover {
        background-color: #ff8e00;
      }
    }
  }
  /deep/.el-form-item__error {
    margin-left: 35px;
  }
}
</style>
