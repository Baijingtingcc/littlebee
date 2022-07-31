<template>
  <div class="AddOutbound">
    <el-card shadow="always">
      <!--   步骤条   -->
      <el-steps :active="active" finish-status="success" space="40%" align-center class="steps">
        <el-step title="填写入库单基础信息"></el-step>
        <el-step title="填写货品清单"></el-step>
      </el-steps>
      <el-form :model="formData" :rules="rules" ref="form">
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="入库单号" class="label" prop="code">
                <el-input
                  v-model="formData.code"
                  clearable
                  class="card-input2"
                  disabled
                ></el-input>
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="运单编号" class="label" prop="billCode">
                <el-input class="card-input1" placeholder="请输入" v-model="formData.billCode"></el-input>
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="计划到达时间" class="label" prop="planArrivalTime">
                <el-date-picker
                  class="card-input1"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  v-model="formData.planArrivalTime"
                  type="datetime"
                  :picker-options="pickerOptions0"
                  placeholder="选择日期时间">
                </el-date-picker>
                <!--                <el-date-picker-->
                <!--                  -->
                <!--                  format="yyyy-MM-DD HH:mm:ss"-->
                <!--                  v-model="formData.planArrivalTime"-->
                <!--                  type="datetime"-->
                <!--                  -->
                <!--                  placeholder="选择日期时间">-->
                <!--                </el-date-picker>-->
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item
                label="货主"
                class="label"
                prop="ownerId"
              >
                <el-autocomplete
                  @blur="ownerBlur"
                  class="card-input1"
                  popper-class="my-autocomplete"
                  v-model="state"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入货主名称/编码"
                  :trigger-on-focus="false"
                  @select="handleSelect">
                  <i
                    class="el-icon-search"
                    slot="suffix"
                    @click="handleIconClick">
                  </i>
                  <template v-slot="{ item }">
                    <div class="name">{{ item.name }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </div
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="仓库" class="label" prop="warehouseId">

                <el-select
                  @focus="changeFocus"
                  class="card-input1"
                  v-model="formData.warehouseId"
                  placeholder="请选择仓库">
                  <el-option
                    clearable
                    v-for="item in ware"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="发货人姓名" class="label" prop="shipperName">
                <el-input class="card-input1" placeholder="请输入" v-model="formData.shipperName"></el-input>
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="送货人姓名" class="label" prop="deliveryName">
                <el-input
                  v-model="formData.deliveryName"
                  clearable
                  class="card-input1"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item
                label="送货人电话"
                class="label"
                prop="deliveryPhone"
              >
                <el-input class="card-input1" placeholder="请输入" v-model="formData.deliveryPhone"></el-input>
              </el-form-item>
            </div
            >
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple">
              <el-form-item label="备注" class="label">
                <el-input class="card-input1" placeholder="请输入" v-model="formData.remark"></el-input>
              </el-form-item>
            </div
            >
          </el-col>
        </el-row>
      </el-form>
      <el-row type="flex" class="row-bg footer" justify="center">
        <el-col :span="6"
        >
          <div class="grid-content bg-purple">
            <el-button round class="rowBtn1" @click="$router.back()">返回</el-button>
          </div>
        </el-col
        >
        <el-col :span="2"
        >
          <div class="grid-content bg-purple">
            <el-button type="warning" round class="rowBtn2" @click="onSubmit"
            >下一步
            </el-button
            >
          </div>
        </el-col
        >
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getAddPK, getOwerId, getWareHouse, postOutBound } from '@/api/outbound'

export default {
  name: 'AddOutbound',
  components: {},
  props: {},
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      active: 0,
      formData: {
        billCode: '', // 运单编号
        code: '', // 入库单号
        deliveryName: '', // 送货人
        deliveryPhone: '', // 电话
        ownerId: '', // 货主 传id
        planArrivalTime: '', // 到达时间
        remark: '', // 备注
        shipperName: '', // 发货人
        status: 1, // 状态
        warehouseId: '' // 仓库id
      },
      rules: {
        code: [
          {
            required: true,
            message: '请输入入库单号'
          }
        ],
        billCode: [
          {
            required: true,
            message: '请输入运单编号'
          }
        ],
        deliveryName: [
          {
            required: true,
            message: '请输入送货人姓名'
          }
        ],
        deliveryPhone: [
          {
            required: true,
            message: '请输入电话号码'
          },
          {
            pattern: /^1[3-9]\d{9}$/,
            trigger: 'blur',
            message: '请输入正确的电话号码'
          }
        ],
        ownerId: [
          {
            required: true,
            message: '请选择货主'
          }
        ],
        warehouseId: [
          {
            required: true,
            message: '请选择仓库'
          }
        ],
        planArrivalTime: [
          {
            required: true,
            message: '请选择计划到达时间'
          }
        ],
        shipperName: [
          {
            required: true,
            message: '请输入发货人姓名'
          }
        ]
      },
      page: {
        size: 10,
        current: 1
      },
      owner: [],
      ware: [],
      restaurants: [],
      state: '',
      ownerPun: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getAddPK()
    this.getOwerId()
  },
  mounted() {
    this.restaurants = this.owner
  },
  methods: {
    ownerBlur() {
      console.log(this.ownerPun)
      if (this.ownerPun.length === 0) {
        this.state = ''
      }
    },
    // 点击提交
    async onSubmit() {
      await this.$refs.form.validate()
      console.log(this.formData)
      await postOutBound(this.formData)
      this.$message.success('新增成功')
      this.active = 1
      this.$router.back()
    },
    // 步骤条
    // 仓库输入框
    changeFocus() {
      if (this.formData.ownerId === '') {
        this.$message.error('请先选择货主')
      }
    },
    // 搜索建议
    querySearch(queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      this.ownerPun = results
      cb(results)
    },
    // 搜索建议
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.name.indexOf(queryString) === 0)
      }
    },
    // 选择货主发送仓库请求
    async handleSelect(item) {
      this.state = item.name
      this.formData.ownerId = item.id
      const { data } = await getWareHouse({
        ownerId: this.formData.ownerId
      })
      data.data.forEach(item => {
        const res = {
          id: item.id,
          name: item.name
        }
        this.ware.push(res)
      })
    },
    handleIconClick(ev) {
      console.log(ev)
    },
    //  获取货主id
    async getOwerId() {
      const { data } = await getOwerId(this.page)
      data.data.records.forEach(item => {
        const res = {
          id: item.ownerId,
          name: item.ownerName
        }
        this.owner.push(res)
      })
      console.log(this.owner)
    },
    // 获取入库单号
    async getAddPK() {
      const res = await getAddPK()
      console.log(res)
      this.formData.code = res.data.data
    }
  }
}
</script>
<style scoped lang="less">
.AddOutbound {
  padding: 20px 20px 0 220px;

  .steps {
    margin-left: 250px;
    margin-bottom: 50px;
    margin-top: 50px;
  }

  .card-input1 {
    margin-left: 35px;
    width: 220px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    background-color: #f8f5f5;
    border: none;

    /deep/ .el-input__inner {
      background-color: #f8f5f5;
    }
  }

  .card-input2 {
    margin-left: 35px;
    width: 220px;
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    border: none;
    background-color: #f3ebeb;

    /deep/ .el-input__inner {
      background-color: #f3ebeb;
    }
  }

  .label {
    /deep/ .el-form-item__label {
      font-size: 12px;
      margin-left: 35px;
      color: #8c8282;
    }
  }

  .footer {
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

  /deep/ .el-form-item__error {
    margin-left: 35px;
  }
}
</style>
