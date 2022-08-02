<template>
  <div class="taskReceive">
    <div class="search">
      <el-card shadow="always" class="card">
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple count">
              <p class="title">任务编号</p>
              <el-input
                placeholder="请输入"
                v-model="dataList.code"
                clearable
                class="card-input"
              >
              </el-input>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple count">
              <p class="title">货主名称</p>
              <el-input
                placeholder="请输入"
                v-model="dataList.ownerName"
                clearable
                class="card-input"
              >
              </el-input>
            </div
            >
          </el-col>
          <el-col :span="6"
          >
            <div class="grid-content bg-purple count">
              <p class="title">收货状态</p>
              <el-select v-model="dataList.status" placeholder="请选择" clearable class="card-input">
                <el-option
                  v-for="item in statusGoods"
                  :key="item.value"
                  :label="item.value"
                  :value="item.type">
                </el-option>
              </el-select>
            </div
            >
          </el-col>
          <el-col :span="6">
            <el-button round class="btn1" @click="onSearch">搜索</el-button>
            <el-button round class="btn" @click="onReset">重置</el-button>
          </el-col>
        </el-row>
      </el-card>
      <div class="divContentBox">
        <el-card shadow="always">
          <div class="content-btn">
            <el-button round class="btn1" type="primary" @click="goodsFinish"> 收货完成</el-button>
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
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="code" label="收货任务编号" width="150">
              </el-table-column>
              <el-table-column prop="receiptCode" label="入库单号" width="150">
              </el-table-column>
              <el-table-column
                prop="createName"
                label="创建人"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="200">
              </el-table-column>
              <el-table-column prop="ownerName" label="货主名称" width="150">
              </el-table-column>
              <el-table-column prop="warehouseName" label="仓库名称" width="150">
              </el-table-column>
              <el-table-column prop="areaName" label="库区名称" width="150">
              </el-table-column>
              <el-table-column prop="planNum" label="预计到货数" width="150">
              </el-table-column>
              <el-table-column
                :formatter="formatterStatus"
                prop="status"
                label="收货状态"
                width="150"
              >
              </el-table-column>
              <el-table-column prop="receiverName" label="收货人" width="150">
              </el-table-column>
              <el-table-column prop="realNum" label="实收总数" width="150">
              </el-table-column>
              <el-table-column prop="differenceNum" label="收货差异" width="150">
              </el-table-column>
              <el-table-column prop="completionTime" label="收货完成时间" width="200">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template v-slot="scoped">
                  <div>
                    <el-button
                      @click="currentFihsh(scoped.row)"
                      type="text"
                      size="medium"
                    >查看详情
                    </el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="+dataList.current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="+dataList.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="+total"
              >
              </el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog :visible="isShow" width="30%" @close="isShow = false">
      <div class="cardWork">
        <p class="oneWork">{{ currentList.length }}个收货任务生成失败!</p>
        <p class="twoWork">失败原因如下</p>
        <p class="thereWork">{{ errorWhy }}</p>
      </div>
      <template #title>
        <p class="title">生成收货任务</p>
      </template>
      <template #footer>
        <el-button
          type="primary"
          @click="isShow = false"
          round
          style="color: #000"
        >确 定
        </el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getReceiving, goodsFinish } from '@/api/taskReceive'

export default {
  components: {},
  props: {},
  data() {
    return {
      errorWhy: [],
      isShow: false,
      total: null,
      list: [],
      statusGoods: [
        {
          type: 1,
          value: '待分配'
        },
        {
          type: 2,
          value: '收货中'
        },
        {
          type: 3,
          value: '收货完成'
        },
        {
          type: 4,
          value: '已取消'
        }
      ],
      dataList: {
        code: '',
        status: null,
        ownerName: '',
        current: 1,
        size: 10
      },
      currentList: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getReceiving()
  },
  mounted() {
  },
  methods: {
    // 状态格式化
    formatterStatus(a, b, cellValue) {
      return this.statusGoods.find((item) => item.type === cellValue)?.value || ''
    },
    // 表格数据
    async getReceiving() {
      const obj = {}
      for (const key in this.dataList) {
        if (this.dataList[key]) {
          obj[key] = this.dataList[key]
        }
      }
      const { data } = await getReceiving(obj)
      this.list = data.data.records
      console.log(data)
      this.size = data.data.size
      this.current = data.current
      this.total = data.data.total
    },
    // 条数
    handleSizeChange(val) {
      console.log(val)
    },
    // 页码
    handleCurrentChange(val) {
      console.log(val)
      this.current = val
      this.getReceiving()
    },
    changeList(current) {
      this.currentList = current
      console.log(this.currentList)
    },
    async onReset() {
      this.dataList.code = ''
      this.dataList.ownerName = ''
      this.dataList.status = ''
      await this.getReceiving()
    },
    async onSearch() {
      await this.getReceiving()
    },
    //  收货任务
    async goodsFinish() {
      const idList = []
      this.currentList.forEach(item => {
        idList.push(item.id)
      })
      const { data } = await goodsFinish(idList)
      this.errorWhy = data.data.errors
      console.log(data.data.errors)
      this.errorWhy = this.errorWhy.toString()
      this.isShow = true
    },
    // 查看详情
    currentFihsh(curr) {
      console.log(curr)
      this.$store.commit('CheckDetails/edit', curr.masterId)
      this.$router.push('taskCheckDetails')
    }
  }
}
</script>
<style scoped lang="less">
.taskReceive {
  padding: 20px 20px 0 220px;

  .card {
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

      /deep/ .el-input__inner {
        background-color: #f8f5f5;
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
      margin-top: 20px;
      margin-left: 300px;
    }
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
