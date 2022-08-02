<template>
  <div class="CheckDetails">
    <div v-if="active === 3">
      <el-card shadow="always">
        <el-collapse @change="handleChange" v-model="collName">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <el-steps :active="active" space="40%" class="Twostep">
                <el-step title="新建" :description="newTime[0]"></el-step>
                <el-step title="已取消" :description="newTime[1]"></el-step>
              </el-steps>
            </div>
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">入库单号</p>
                    <p class="data">{{ detailedInfo.code }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">创建时间</p>
                    <p class="data">{{ detailedInfo.createTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">计划到达时间</p>
                    <p class="data">{{ detailedInfo.planArrivalTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">仓库名称</p>
                    <p class="data">{{ detailedInfo.warehouseName }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div v-else-if="active === 0">
      <el-card shadow="always">
        <el-collapse @change="handleChange" v-model="collName">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <el-steps :active="active" space="40%" class="sixStep">
                <el-step title="新建" :description="newTime[0]"></el-step>
                <el-step title="收货中"></el-step>
                <el-step title="收货完成"></el-step>
                <el-step title="上架中"></el-step>
                <el-step title="上架完成"></el-step>
              </el-steps>
            </div>
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">入库单号</p>
                    <p class="data">{{ detailedInfo.code }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">创建时间</p>
                    <p class="data">{{ detailedInfo.createTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">计划到达时间</p>
                    <p class="data">{{ detailedInfo.planArrivalTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">仓库名称</p>
                    <p class="data">{{ detailedInfo.warehouseName }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="货主信息" name="3">
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">货主编号</p>
                    <p class="data">{{ owner.code }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">货主名称</p>
                    <p class="data">{{ owner.name }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">联系人</p>
                    <p class="data">{{ owner.personName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">联系电话</p>
                    <p class="data">{{ owner.phone }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="货品信息" name="4">
            <div>暂无入库单</div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="运输信息" name="5">
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">运单编号</p>
                    <p class="data">{{ detailedInfo.billCode }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">承运商</p>
                    <p class="data">{{ detailedInfo.carrierName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">计划到达时间</p>
                    <p class="data">{{ detailedInfo.planArrivalTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">发货人姓名</p>
                    <p class="data">{{ detailedInfo.shipperName }}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px" :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">送货人姓名</p>
                    <p class="data">{{ detailedInfo.deliveryName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">送货人电话</p>
                    <p class="data">{{ detailedInfo.deliveryPhone }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="任务信息" name="6">
            <div class="shrw">
              <div class="titlerw">
                <p>收货任务</p>
              </div>
              <div class="card-status">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务编号</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务状态</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">收货人</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">开始时间</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px" :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">完成时间</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">实收数量</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
    <div v-else>
      <el-card shadow="always">
        <el-collapse @change="handleChange" v-model="collName">
          <el-collapse-item title="基础信息" name="1">
            <div>
              <el-steps :active="active" space="40%" class="sixStep">
                <el-step title="新建" :description="newTime[0]"></el-step>
                <el-step title="收货中" :description="newTime[1]"></el-step>
                <el-step title="收货完成" :description="newTime[2]"></el-step>
                <el-step title="上架中" :description="newTime[3]"></el-step>
                <el-step title="上架完成" :description="newTime[4]"></el-step>
              </el-steps>
            </div>
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">入库单号</p>
                    <p class="data">{{ detailedInfo.code }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">创建时间</p>
                    <p class="data">{{ detailedInfo.createTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">计划到达时间</p>
                    <p class="data">{{ detailedInfo.planArrivalTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">仓库名称</p>
                    <p class="data">{{ detailedInfo.warehouseName }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="货主信息" name="3">
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">货主编号</p>
                    <p class="data">{{ owner.code }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">货主名称</p>
                    <p class="data">{{ owner.name }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">联系人</p>
                    <p class="data">{{ owner.personName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">联系电话</p>
                    <p class="data">{{ owner.phone }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="货品信息" name="4">
            <div>
              <div class="title">
                <p>总计:20个总体积15.0m²</p>
              </div>
              <el-table
                :header-cell-style="{'text-align':'center',background:'#f9f6ee'}"
                :cell-style="{'text-align':'center'}"
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                  fixed
                  prop="date"
                  label="序号"
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="ownerName"
                  label="货主名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="goodsCode"
                  label="货品编号"
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
                  label="货品单价(元)"
                  width="150">
                </el-table-column>
                <el-table-column
                  fixed="goodsGuaranteeDay"
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
                  label="体积"
                  width="150">
                </el-table-column>
                <el-table-column
                  prop="groundingNum"
                  label="预计到货数"
                  width="100">
                </el-table-column>
              </el-table>
              <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="+page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="+total">
              </el-pagination>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="运输信息" name="5">
            <div class="card-status">
              <el-row :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">运单编号</p>
                    <p class="data">{{ detailedInfo.billCode }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">承运商</p>
                    <p class="data">{{ detailedInfo.carrierName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">计划到达时间</p>
                    <p class="data">{{ detailedInfo.planArrivalTime }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">发货人姓名</p>
                    <p class="data">{{ detailedInfo.shipperName }}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px" :gutter="20">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">送货人姓名</p>
                    <p class="data">{{ detailedInfo.deliveryName }}</p>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <p class="text">送货人电话</p>
                    <p class="data">{{ detailedInfo.deliveryPhone }}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <el-card shadow="always" class="card">
        <el-collapse @change="handleChange">
          <el-collapse-item title="任务信息" name="6">
            <div class="shrw">
              <div class="titlerw">
                <p>收货任务</p>
              </div>
              <div class="card-status">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务编号</p>
                      <p class="data">{{ receivingEntity.code }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务状态</p>
                      <p class="data">{{ receivingEntity.status }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">收货人</p>
                      <p class="data">{{ receivingEntity.receiverName }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">开始时间</p>
                      <p class="data">{{ receivingEntity.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px" :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">完成时间</p>
                      <p class="data">{{ receivingEntity.completionTime }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">实收数量</p>
                      <p class="data">{{ receivingEntity.realNum }}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="sjrw">
              <div class="titlerw">
                <p>上架任务</p>
              </div>
              <div class="card-status">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务编号</p>
                      <p class="data">{{ groundingEntity.code }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">任务状态</p>
                      <p class="data">{{ groundingEntity.status }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">上架人</p>
                      <p class="data">{{ groundingEntity.personName }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">开始时间</p>
                      <p class="data">{{ groundingEntity.createTime }}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px" :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">完成时间</p>
                      <p class="data">{{ groundingEntity.completionTime }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">实上数量</p>
                      <p class="data">{{ groundingEntity.groundingNum }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">差异合计</p>
                      <p class="data">{{ groundingEntity.differenceNum }}</p>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <p class="text">损益合计</p>
                      <p class="data">{{ detailedInfo.idMoney }}</p>
                    </div>
                  </el-col>
                </el-row>
                <p class="symx">损益明细</p>
                <el-table
                  :header-cell-style="{'text-align':'center',background:'#f9f6ee'}"
                  :cell-style="{'text-align':'center'}"
                  :data="idList"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="code"
                    label="损益单号"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="warehouseName"
                    label="仓库名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="locationName"
                    label="库位名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="ownerName"
                    label="货主名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="goodsName"
                    label="货品名称"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="idNum"
                    label="损益数量"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="idMoney"
                    label="损益金额"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="updateTime"
                    label="处理时间"
                    width="250">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    label="损益单状态"
                    width="150">
                  </el-table-column>
                </el-table>
                <el-pagination
                  class="page"
                  :current-page="1"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="idList.length">
                </el-pagination>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getCurrentOut, getOutBound } from '@/api/outbound'

export default {
  data() {
    return {
      collName: '1',
      active: null,
      currentId: '',
      owner: [],
      tableData: [],
      detailedInfo: {},
      newTime: [],
      receivingEntity: {},
      groundingEntity: {},
      idList: [],
      page: {
        current: 1,
        size: 10
      },
      total: null
    }
  },
  created() {
    this.currentId = this.$store.state.outbound.Outcurrtent.id
    this.getCurrentOut()
    this.getOutBound()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.current = val
      this.getOutBound()
    },
    // 货品信息
    async getOutBound() {
      const { data } = await getOutBound({
        masterId: this.currentId,
        current: this.page.current,
        size: this.page.size
      })
      this.tableData = data.data.records
      this.page.size = data.data.size
      this.total = data.data.total
    },
    // 当前数据的详细信息
    async getCurrentOut() {
      const { data } = await getCurrentOut(this.currentId)
      console.log(data)
      this.detailedInfo = data.data
      this.owner = data.data.owner
      this.active = data.data.status
      this.newTime = data.data.timeArray
      this.receivingEntity = data.data.receivingEntity
      this.groundingEntity = data.data.groundingEntity
      this.idList = data.data.idList
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="less">
.CheckDetails {
  padding: 20px 20px 0 220px;

  .card-status {
    background: #fdfcf9;
    border: 1px solid #f7f2f1;
    padding: 25px 30px;

    .text {
      font-size: 14px;
      color: #b8b2b1;
    }

    .data {
      margin-top: 2px;
      font-size: 15px;
      color: #000;
    }
  }

  .Twostep {
    margin: 40px 0 40px 350px;
  }

  .sixStep {
    margin: 40px 0 40px 70px;
  }

  .card {
    margin-top: 40px;

    .title {
      width: 200px;
      height: 32px;
      line-height: 30px;
      background: #fff9eb;
      border: 1px solid #ffb200;
      padding: 0 25px;
      margin: 20px 0;
    }

    .titlerw {
      width: 130px;
      height: 32px;
      line-height: 30px;
      background: #fff9eb;
      border: 1px solid #ffb200;
      padding: 0 25px;
      margin: 20px 0;
    }
  }

  .symx {
    margin: 20px 0;
    color: #000;
    font-size: 15px;
  }

  .page {
    margin-left: 280px;
    margin-top: 20px;
  }
}
</style>
