<template>
  <div class="ckd">
    <div class="search">
      <el-card shadow="always" class="card">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple count">
              <p class="title">入库单号</p>
              <el-input
                placeholder="请输入"
                v-model="inputRkdh"
                clearable
                class="card-input"
              >
              </el-input></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple count">
              <p class="title">运单编号</p>
              <el-input
                placeholder="请输入"
                v-model="inputYdbh"
                clearable
                class="card-input"
              >
              </el-input></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple count">
              <p class="title">货主名称</p>
              <el-input
                placeholder="请输入"
                v-model="inputHzmc"
                clearable
                class="card-input"
              >
              </el-input></div
          ></el-col>
          <el-col :span="6">
            <el-button round class="btn1" @click="onSearch">搜索</el-button>
            <el-button round class="btn" @click="onReset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="divContentBox">
      <el-card shadow="always">
        <div class="content-btn">
          <el-button round class="btn1" type="primary"> 新增入库单 </el-button>
          <el-button round class="btn2" @click="onsubmitWork"
            >生成收货任务</el-button
          >
        </div>
        <div class="table">
          <el-table
            :data="list"
            border
            style="width: 100%"
            :header-cell-style="{
              background: '#f9f6ee',
              color: '#887e7e',
              'text-align': 'center'
            }"
            :row-style="{ height: '0' }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="changeList"
            ref="closeShow"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="code" label="入库单号" width="100">
            </el-table-column>
            <el-table-column prop="billCode" label="运单编号" width="120">
            </el-table-column>
            <el-table-column
              prop="planArrivalTime"
              label="计划到达时间"
              width="200"
            >
            </el-table-column>
            <el-table-column prop="ownerCode" label="货主编号" width="120">
            </el-table-column>
            <el-table-column prop="ownerName" label="货主名称" width="120">
            </el-table-column>
            <el-table-column prop="warehouseName" label="仓库名称" width="120">
            </el-table-column>
            <el-table-column prop="license" label="车牌号" width="120">
            </el-table-column>
            <el-table-column prop="deliveryName" label="送货人名称" width="120">
            </el-table-column>
            <el-table-column
              prop="deliveryPhone"
              label="送货人电话"
              width="120"
            >
            </el-table-column>
            <el-table-column prop="status" label="入库单状态" width="120">
            </el-table-column>
            <el-table-column prop="planNum" label="预计到货数" width="120">
            </el-table-column>
            <el-table-column prop="createName" label="创建人" width="100">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="medium"
                  >查看详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="list.length"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog :visible="isShow" width="30%" :before-close="handleClose">
      <div class="cardWork">
        <p class="oneWork">{{ checkedList.length }}个收货任务生成失败!</p>
        <p class="twoWork">失败原因如下</p>
        <p class="thereWork">{{ errorWhy }}</p>
      </div>
      <template #title>
        <p class="title">生成收货任务</p>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="handleClose"
          round
          style="color: #000"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPageDetail, postipsReceiving } from '@/api/warehouse'
export default {
  data() {
    return {
      isShow: false,
      inputRkdh: '',
      inputYdbh: '',
      inputHzmc: '',
      checkedIdList: [],
      list: [],
      checkedList: [],
      errorWhy: ''
    }
  },
  methods: {
    async getPageDetail() {
      const {
        data: { data }
      } = await getPageDetail({
        code: this.inputRkdh, // 入库单号
        billCode: this.inputYdbh, // 运单编号
        ownerName: this.inputHzmc, // 货主名称
        current: 1, // 当前页
        size: 10 // 每页显示几条
      })
      this.list = data.records
      console.log(this.list)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    onSearch() {
      this.getPageDetail()
    },
    onReset() {
      this.inputRkdh = ''
      this.inputYdbh = ''
      this.inputHzmc = ''
    },
    handleClick(str) {
      console.log(str)
      this.$router.push({
        path: '/navbar/CheckDetails'
      })
    },
    changeList(selection, row) {
      console.log(selection)
      this.checkedList = selection
      console.log(this.checkedList)
    },
    async onsubmitWork() {
      this.checkedList.forEach((item) => {
        if (this.checkedList.includes(item.id)) {
          return console.log(11)
        }
        this.checkedIdList.push(item.id)
      })
      if (this.checkedList.length <= 0) {
        this.$message.error('请选择入库单')
      } else {
        this.isShow = true
        const {
          data: { data }
        } = await postipsReceiving(this.checkedIdList)
        this.errorWhy = data.errors
        this.errorWhy = this.errorWhy.toString()
        console.log(this.errorWhy)
      }
    },
    handleClose() {
      this.isShow = false
      this.checkedList = []
      this.$refs.closeShow.clearSelection()
    }
  },
  created() {
    this.getPageDetail()
  },
  computed: {
    ...mapGetters(['pageList'])
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.ckd {
  padding: 20px 20px 0 220px;
  .card {
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 12px;
    .count {
      .title {
        font-size: 14px;
        margin-bottom: 15px;
        color: #afa096;
      }
      .card-input {
        width: 200px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #f8f5f5;
        border-radius: 6px;
        /deep/.el-input__inner {
          background-color: #f8f5f5;
        }
      }
    }
    .btn {
      margin: 30px 15px;
      font-size: 15px;
      color: #000;
      &:hover {
        background-color: #ff8e00;
      }
    }
    .btn1 {
      font-size: 15px;
      color: #000;
      margin: 30px 15px;
      background-color: #ffb200;
      &:hover {
        background-color: #ff8e00;
      }
    }
  }
  .divContentBox {
    padding: 10px 0;
    margin-bottom: 20px;
    border-radius: 12px;
    .content-btn {
      margin-bottom: 20px;
      .btn1 {
        background-color: #00be76;
        font-size: 15px;
        border: none;
        &:hover {
          background-color: #007a4c;
        }
      }
      .btn2 {
        margin-left: 30px;
        background-color: #f8f5f5;
        font-size: 15px;
        border: none;
        color: #000;
        &:hover {
          background-color: #ffb200;
          color: #000;
        }
      }
    }
    .block {
      margin-left: 300px;
    }
  }
  .title {
    margin: 0;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #332929;
    line-height: 22px;
  }
  .cardWork {
    box-sizing: border-box;
    height: 180px;
    weight: 300px;
    background: #f9f9f9;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 3px;
    padding: 21px 20px 14px 21px;
    .oneWork {
      height: 24px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #332929;
      line-height: 24px;
    }
    .twoWork {
      color: #d9021c;
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      line-height: 22px;
      margin-top: 11px;
      margin-bottom: 6px;
      text-align: center;
    }
    .thereWork {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #b5abab;
      line-height: 22px;
      padding-right: 10px;
      text-align: left;
    }
  }
}
</style>
