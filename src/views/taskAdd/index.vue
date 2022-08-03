<template>
  <div class="task-add">
    <div class="search">
      <el-card shadow="always" class="card">
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple count">
              <p class="title">上架编号</p>
              <el-input
                placeholder="请输入"
                v-model="inputSjbh"
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
              <p class="title">入库单号</p>
              <el-input
                placeholder="请输入"
                v-model="inputRkdh"
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
                v-model="inputHzmc"
                clearable
                class="card-input"
              >
              </el-input>
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
          <div class="table">
            <el-table
              :default-sort="{prop: 'date', order: 'descending'}"
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
              ref="closeShow"
            >
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column prop="code" label="上架任务编号" width="150">
              </el-table-column>
              <el-table-column prop="receiptCode" label="入库单号" width="150">
              </el-table-column>
              <el-table-column
                sortable
                prop="createTime"
                label="创建时间"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="ownerName" sortable label="货主名称" width="150">
              </el-table-column>
              <el-table-column prop="warehouseName" label="仓库名称" width="150">
              </el-table-column>
              <el-table-column prop="areaName" label="库区名称" width="150">
              </el-table-column>
              <el-table-column prop="personName" label="负责人" width="200">
              </el-table-column>
              <el-table-column
                prop="status" :formatter="formatterTask"
                :filters="taskList"
                :filter-method="filterHandler"
                label="上架状态" width="150">
              </el-table-column>
              <el-table-column
                prop="groundingNum"
                label="货品数量"
                width="150"
              >
              </el-table-column>
              <el-table-column prop="realNum" label="实收总数" width="150">
              </el-table-column>
              <el-table-column prop="groundingNum" label="上架数量" width="150">
              </el-table-column>
              <el-table-column prop="differenceNum" label="差异总数" width="150">
              </el-table-column>
              <el-table-column prop="completionTime" sortable label="收货完成时间" width="200">
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
                :current-page="page.current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="+total"
              >
              </el-pagination>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { getGroundingList } from '@/api/taskAdd'

export default {
  components: {},
  props: {},
  data() {
    return {
      inputHzmc: '',
      inputRkdh: '',
      inputSjbh: '',
      list: [],
      page: {
        size: 10,
        current: 1
      },
      total: null,
      taskList: [
        {
          value: 1,
          text: '待分配'
        },
        {
          value: 2,
          text: '上架中'
        }, {
          value: 3,
          text: '上架完成'
        },
        {
          value: 4,
          text: '已取消'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getGroundingList()
  },
  mounted() {
  },
  methods: {
    // 筛选
    filterHandler(value, row, column) {
      const property = column.property
      return row[property] === value
    },
    // 格式化状态
    formatterTask(a, b, cellVal) {
      return this.taskList.find(item => item.value === cellVal)?.text
    },
    // 查看详情
    currentFihsh(current) {
      this.$store.commit('sure/sureEdit', current.masterId)
      this.$router.push('sure')
    },
    // 页码
    handleCurrentChange(val) {
      console.log(val)
      this.page.current = val
      this.getGroundingList()
    },
    // 条数
    handleSizeChange(val) {
      console.log(val)
      this.page.size = val
      this.getGroundingList()
    },
    // 重置
    onReset() {
      this.inputSjbh = ''
      this.inputRkdh = ''
      this.inputHzmc = ''
      this.getGroundingList()
    },
    // 搜索
    onSearch() {
      this.getGroundingList()
    },
    // 表格数据
    async getGroundingList() {
      const { data: { data } } = await getGroundingList({
        current: this.page.current,
        size: this.page.size,
        code: this.inputSjbh,
        receiptCode: this.inputRkdh,
        ownerName: this.inputHzmc
      })
      this.list = data.records
      console.log(data)
      this.total = data.total
    }
  }
}
</script>
<style scoped lang="less">
.task-add {
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
}
</style>
