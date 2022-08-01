<template>
  <div class="AddOutbound">
    <el-card shadow="always">
      <!--   步骤条   -->
      <el-steps :active="active" finish-status="success" space="40%" align-center class="steps">
        <el-step title="填写入库单基础信息"></el-step>
        <el-step title="填写货品清单"></el-step>
      </el-steps>
      <div v-if="active===0">
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
      </div>
      <div v-else>
        <el-card shadow="always">
          <div class="btn">
            <el-button round class="addBtn" @click="dialogVisible = true">添加货品</el-button>
            <el-button round class="delBtn" @click="dele">删除货品</el-button>
          </div>
          <div v-if="goodsId.length>0">
            <div class="goodstitle" v-if="goodsInfoList.length>0">
              <p>总计: <span>{{ goodsInfoList.length }}件</span>&nbsp;&nbsp;<span>总体积:{{
                  goodsInfoList[0].goodsVolume
                }}个货品</span>
              </p>
            </div>
            <el-table
              class="dialogTable"
              :header-cell-style="{'text-align':'center',background:'#f9f6ee'}"
              :cell-style="{'text-align':'center'}"
              @selection-change="goodsInfo"
              :data="addGoodsList"
              border
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="ownerName"
                label="货主名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsCode"
                label="货品编码"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsName"
                label="货品名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsTypeName"
                label="货品类型"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsPrice"
                label="货品单价(天)"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsGuaranteeDay"
                label="保质天数(天)"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsUnit"
                label="单位"
                width="150">
              </el-table-column>
              <el-table-column
                prop="goodsVolume"
                label="体积(m³)"
                width="150">
              </el-table-column>
              <el-table-column
                prop="planNum"
                label="到货数量"
                width="150">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template>
                  <el-button type="text" size="small" @click="dele">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="page"
              :current-page="1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="addGoodsList.length">
            </el-pagination>
          </div>
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
                <el-button type="warning" round class="rowBtn2" @click="goodSubmit"
                >提交
                </el-button
                >
              </div>
            </el-col
            >
          </el-row>
        </el-card>
      </div>
    </el-card>
    <el-dialog
      :visible="dialogVisible"
      width="60%"
      @close="dialogVisible=false">
      <template #title>
        <p class="dialogTitle">新增入库货品</p>
      </template>
      <p>货品</p>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-input
            class="dialoginput"
            placeholder="请输入名称/编码/条码"
            v-model="dialogInput"
            clearable>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="dialogBtn">
            <el-button round class="dialogSearch" @click="dialogSearch">查询</el-button>
            <el-button round class="dialogReset" @click="dialogReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
      <div class="title" v-if="goodNum.length>0">
        <p>当前已选&nbsp;&nbsp;<span>{{ goodNum.length }}个货品</span></p>
      </div>
      <el-table
        class="dialogTable"
        :header-cell-style="{'text-align':'center',background:'#f9f6ee'}"
        :cell-style="{'text-align':'center'}"
        @selection-change="handleSelectionChange"
        :data="goodsList"
        border
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="ownerName"
          label="货主名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="code"
          label="货品编码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="货品名称"
          width="150">
        </el-table-column>
        <el-table-column
          prop="goodsTypeName"
          label="货品类型"
          width="150">
        </el-table-column>
        <el-table-column
          prop="price"
          label="货品单价(天)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="guaranteeDay"
          label="保质天数(天)"
          width="150">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          width="150">
        </el-table-column>
        <el-table-column
          prop="volume"
          label="体积(m³)"
          width="150">
        </el-table-column>
      </el-table>
      <el-pagination
        class="page"
        @size-change="dialogSizeCgange"
        @current-change="dialogCurrentChange"
        :current-page="+goodsPage.current"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="+goodsPage.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="+total">
      </el-pagination>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" class="dialogQuxiao" round>取 消</el-button>
    <el-button type="primary" @click="dialogAdd" round class="dialogAdd">确认添加</el-button>
    </span>

    </el-dialog>
  </div>
</template>

<script>
import { getAddPK, getOwerId, getWareHouse, postOutBound, getOutBound, getGoods, postAddGoods } from '@/api/outbound'

export default {
  name: 'AddOutbound',
  components: {},
  props: {},
  data() {
    return {
      addGoodsList: [],
      goodNum: [],
      dialogInput: '',
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
      ownerPun: [],
      dialogVisible: false,
      goodsList: [],
      goodsPage: {
        size: 10,
        current: 1
      },
      total: null,
      dialogOwnerId: '',
      goodsId: [],
      dialogMasterId: '',
      goodsInfoList: []
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
    dialogSizeCgange(val) {
      console.log(`每页 ${val} 条`)
    },
    dialogCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.goodsPage.current = val
    },
    handleSelectionChange(selection) {
      this.goodNum = selection
      console.log(this.goodNum)
    },
    // 删除货品
    dele() {
      this.$notify({
        title: '提示',
        message: ({ style: 'color: #757c83' }, '演示系统,不支持此操作')
      })
    },
    // 输入框失焦
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
      const res = await postOutBound(this.formData)
      this.dialogMasterId = res.data.data.id
      this.dialogOwnerId = res.data.data.ownerId
      await this.getGoods()
      this.getOutBound()
      this.$message.success('新增成功')
      this.active = 1
    },
    async getOutBound() {
      const { data } = await getOutBound({
        current: this.page.current,
        size: this.page.size,
        masterId: this.dialogMasterId
      })
      this.addGoodsList = data.data.records
      console.log(data)
    },
    // 获取货品信息
    async getGoods() {
      const goods = await getGoods({
        goods: this.dialogInput,
        current: this.goodsPage.current,
        size: this.goodsPage.size,
        ownerId: this.dialogOwnerId
      })
      this.goodsList = goods.data.data.records
      this.goodsPage.current = goods.data.data.current
      this.goodsPage.size = goods.data.data.size
      this.total = goods.data.data.total
      console.log(goods)
      console.log(this.goodsList)
    },
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
    },
    //  查询货品
    dialogSearch() {
      this.getGoods()
    },
    //  重置
    dialogReset() {
      this.dialogInput = ''
      this.getGoods()
    },
    // 添加货品
    async dialogAdd() {
      this.goodNum.forEach(item => {
        this.goodsId.push(item.id)
      })
      await postAddGoods({
        goodsIds: this.goodsId,
        masterId: this.dialogMasterId
      })
      await this.getOutBound()
      this.dialogVisible = false
    },
    goodsInfo(selection) {
      this.goodsInfoList = selection
      console.log(this.goodsInfoList.goodsVolume)
    }
  },
  goodSubmit() {
    this.$router.push('outbound')
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

  .btn {
    margin: 50px 20px;

    .addBtn {
      background-color: #00be76;
      color: #fff;
      font-size: 15px;
      border: none;

      &:hover {
        background-color: #007a4c;
      }
    }

    .delBtn {
      margin-left: 50px;
      background-color: #f8f5f5;
      font-size: 15px;
      color: #000;
      border: none;

      &:hover {
        background-color: #ffb200;
      }
    }
  }

  .dialogTitle {
    padding: 15px;
    height: 50px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    font-weight: 700;
    font-size: 14px;
  }

  /deep/ .el-dialog__header {
    padding: 0;
  }

  .dialoginput {
    width: 450px;
    margin-top: 10px;

    /deep/ .el-input__inner {
      background-color: #f8f5f5;
    }
  }

  .dialogBtn {
    margin-left: 70px;
    margin-top: 10px;

    .dialogReset {
      background-color: #f8f5f5;
      color: #000;
      border: none;
      margin-left: 20px;

      &:hover {
        background-color: #ffb200;
      }
    }

    .dialogSearch {
      background-color: #ffb200;
      color: #000;
      border: none;

      &:hover {
        background-color: #ff8e00;
      }
    }
  }

  .dialogTable {
    margin-top: 20px;
  }

  .dialog-footer {
    .dialogAdd {
      background-color: #ffb200;
      color: #000;
      border: none;
      margin-left: 20px;

      &:hover {
        background-color: #ff8e00;
      }
    }

    .dialogQuxiao {
      background-color: #f8f5f5;
      color: #000;
      border: none;

      &:hover {
        background-color: #ffb200;
      }
    }
  }

  .title {
    width: 140px;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 5px;
    margin: 20px 0;

    span {
      color: #ffbd25;
    }
  }

  .goodstitle {
    width: 250px;
    height: 32px;
    line-height: 30px;
    background: #fff9eb;
    border: 1px solid #ffb200;
    padding: 0 5px;
    margin: 20px 0;
  }

  .page {
    margin-left: 150px;
    margin-top: 20px;
  }
}
</style>
