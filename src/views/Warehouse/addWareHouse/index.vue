<template>
  <div class="editPage">
    <el-card shadow="always">
      <div class="grid-content bg-purple">
        <el-form class="card-form" :model="formData" :rules="rules" ref="form">
          <el-row class="row-bg">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="code" label="仓库编码" class="label">
                  <el-input
                    clearable
                    class="card-input1"
                    disabled
                    v-model="formData.code"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple-light">
                <el-form-item prop="name" label="仓库名称" class="label">
                  <el-input
                    clearable
                    placeholder="请输入"
                    class="card-input"
                    v-model="formData.name"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="type" label="仓库类型" class="label">
                  <el-select
                    v-model="formData.type"
                    clearable
                    placeholder="请选择"
                    class="card-input"
                  >
                    <el-option
                      v-for="item in Options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            style="margin-top: 5px"
          >
            <el-col :span="22">
              <el-form-item class="label" prop="name" label="省/市/区">
                <el-cascader
                  class="widthSmall card-input4"
                  size="large"
                  placeholder="请选择"
                  :options="options"
                  v-model="shqValue"
                  @change="addressChange"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            style="margin-top: 15px"
          >
            <el-col :span="16">
              <el-form-item label="详细地址" class="label">
                <el-input
                  placeholder="请输入"
                  clearable
                  class="card-input4"
                  v-model="formData.address"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库状态" class="typeTabel" prop="status">
                <el-radio v-model="formData.status" :label="1">启用</el-radio>
                <el-radio v-model="formData.status" :label="0">停用</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-bg">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="code" label="仓库面积" class="label">
                  <el-input
                    learable
                    placeholder="请输入"
                    class="card-input"
                    v-model="formData.surface"
                  >
                    <template slot="append"
                      ><span class="text">m²</span></template
                    >
                  </el-input>
                </el-form-item>
              </div></el-col
            >
            <el-col :span="8"
              ><div class="grid-content bg-purple-light">
                <el-form-item prop="name" label="负责人" class="label">
                  <el-input
                    placeholder="请输入"
                    clearable
                    class="card-input"
                    v-model="formData.personName"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="phone" label="联系电话" class="label">
                  <el-input
                    placeholder="请输入"
                    clearable
                    class="card-input"
                    v-model="formData.phone"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
        </el-form>
        <el-row type="flex" class="row-bg footer" justify="center">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-button round class="rowBtn1" @click="$router.back()"
                >返回</el-button
              >
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
      </div>
    </el-card>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { getWarehouse, postAddWarehouse, getCkWarehouse } from '@/api/warehouse'
export default {
  data() {
    return {
      shqValue: '',
      form: {},
      options: regionData, // 省市区数据
      selectedOptions: [], // 选中的地区
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
      formData: {
        code: '', // 仓库编码
        name: '', // 仓库名称
        type: '', // 仓库类型
        location: '', // 省市区
        address: '', // 详细地址
        surface: '', // 仓库面积
        personName: '', //  负责人
        phone: '', // 联系电话
        status: null,
        area: '', // 区
        city: '', // 城市
        province: '' // 省
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入仓库名称'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入仓库名称'
          }
        ],
        status: [
          {
            required: true,
            message: '阿巴'
          }
        ],
        phone: [
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    console.log(this.formData.status)
    this.getCkWarehouse()
    this.formData.location = [
      this.form.provinceCode,
      this.form.cityCode,
      this.form.areaCode
    ]
  },
  methods: {
    addressChange(arr) {
      console.log(arr)
      console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]])
      this.formData.province = arr[0]
      this.formData.city = arr[1]
      this.formData.area = arr[2]
      this.formData.location =
        CodeToText[arr[0]] + '/' + CodeToText[arr[1]] + '/' + CodeToText[arr[2]]
      console.log(this.formData.location)
    },
    wareType() {
      if (this.formData.type === '中转仓') {
        this.formData.type = 'ZZ'
      } else if (this.formData.type === '加工仓') {
        this.formData.type = 'JG'
      } else if (this.formData.type === '储备仓') {
        this.formData.type = 'CB'
      } else {
        this.formData.type = 'LC'
      }
    },
    async onSubmit() {
      this.wareType()
      console.log(this.formData)
      this.$refs.form.validate()
      await postAddWarehouse(this.formData)
      this.$router.back()
    },
    async getCkWarehouse() {
      const res = await getCkWarehouse()
      this.formData.code = res.data.data
      console.log(this.formData.code)
    }
  }
}
</script>

<style scoped lang="less">
.editPage {
  padding: 20px 20px 0 220px;
  .card-form {
    .card-input {
      margin-left: 35px;
      width: 300px;
      line-height: 38px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f8f5f5;
        height: 40px;
      }
      /deep/.el-input-group__append {
        height: 35px;
        background-color: #f3ebeb;
      }
    }
    .card-input1 {
      margin-left: 35px;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f3ebeb;
      }
    }
    .label {
      /deep/.el-form-item__label {
        font-size: 14px;
        margin-left: 35px;
      }
    }
    .card-input4 {
      margin-left: 30px;
      width: 668px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f8f5f5;
      }
    }
    /deep/.el-form-item__label {
      float: unset;
    }
    /deep/.el-form-item__error {
      margin-left: 35px;
    }
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
}
</style>
