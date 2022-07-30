<template>
  <div class="ckd">
    <div class="search">
      <el-card shadow="always" class="card">
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="grid-content bg-purple count">
              <p class="title">仓库编号</p>
              <el-input
                placeholder="请输入"
                v-model="inputCkbh"
                clearable
                class="card-input"
              >
              </el-input></div
          ></el-col>
          <el-col :span="6"
            ><div class="grid-content bg-purple count">
              <p class="title">仓库名称</p>
              <el-input
                placeholder="请输入"
                v-model="inputCkmc"
                clearable
                class="card-input"
              >
              </el-input></div
          ></el-col>
          <el-col :span="6">
            <el-form :inline="true" class="demo-form-inline card-select">
              <el-form-item label="仓库状态">
                <el-select v-model="formInline" placeholder="请选择">
                  <el-option label="全部" value="quanbu"></el-option>
                  <el-option label="停用" value="tingyong"></el-option>
                  <el-option label="启用" value="qiyong"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
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
          <el-button
            round
            class="btn1"
            type="primary"
            @click="$router.push('addWareHouse')"
          >
            新增仓库
          </el-button>
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
          >
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="code" label="仓库编码" width="100">
            </el-table-column>
            <el-table-column prop="name" label="仓库名称" width="120">
            </el-table-column>
            <el-table-column
              prop="type"
              label="仓库类型"
              width="120"
              height="20"
            >
            </el-table-column>
            <el-table-column prop="location" label="省/市/区" width="180">
            </el-table-column>
            <el-table-column prop="address" label="详细地址" width="180">
            </el-table-column>
            <el-table-column prop="status" label="仓库状态" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.status === 0 ? '停用' : '启用' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="surface" label="仓库面积m²" width="120">
            </el-table-column>
            <el-table-column prop="includedNum" label="库区数量" width="120">
            </el-table-column>
            <el-table-column prop="personName" label="负责人" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="联系电话" width="120">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  type="text"
                  size="medium"
                  >编辑</el-button
                >
                <el-button
                  @click="handleStatus(scope.row)"
                  type="text"
                  size="medium"
                  >{{ scope.row.status === 0 ? '启用' : '停用' }}</el-button
                >
                <el-button type="text" size="medium" @click="deleteLike()"
                  >删除</el-button
                >
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
    <el-dialog :visible="dialogVisible" width="30%" :before-close="handleClose">
      <template #title>
        <p class="title">确认{{ editStatus === 0 ? '停用' : '启用' }}</p>
      </template>
      <span
        >确定要{{ editStatus === 0 ? '停用' : '启用' }}：{{
          tableName
        }}吗?</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" round>取 消</el-button>
        <el-button type="primary" @click="onEditStatus" round>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWarehouse, putWarehouseStatus } from '@/api/warehouse'
export default {
  data() {
    return {
      dialogVisible: false,
      inputCkbh: '',
      inputCkmc: '',
      list: [],
      formInline: '',
      status: '',
      editStatus: '',
      tableName: '',
      current: [],
      currentList: [],
      page: {
        size: 10,
        current: 1
      },
      total: null
    }
  },
  methods: {
    // 删除操作
    deleteLike() {
      this.$notify({
        title: '提示',
        message: ({ style: 'color: #757c83' }, '演示系统,不支持此操作')
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.size = val
      this.getWarehouse()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.current = val
      console.log(this.page.current)
      this.getWarehouse()
    },
    // 搜索
    onSearch() {
      this.getWarehouse()
    },
    // 重置
    onReset() {
      this.inputCkbh = ''
      this.inputCkmc = ''
      this.formInline = ''
      this.getWarehouse()
    },
    async handleEdit(str) {
      console.log(str)
      this.$store.dispatch('editPage/editWareHouse', str.id)
      this.$router.push({
        path: '/navbar/editPage'
      })
    },
    // 请求数据
    async getWarehouse() {
      const {
        data: { data }
      } = await getWarehouse({
        like_code: this.inputCkbh, // 入库单号
        like_name: this.inputCkmc, // 运单编号
        status: this.status, // 货主名称
        current: this.page.current, // 当前页
        size: this.page.size // 每页显示几条
      })
      this.list = data.records
      this.total = data.total
      console.log(data)
    },
    handleStatus(str) {
      console.log(str)
      this.tableName = str.name
      this.dialogVisible = true
      if (str.status === 0) {
        this.editStatus = 1
      } else {
        this.editStatus = 0
      }
      this.current = str
      console.log(this.editStatus)
    },
    async onEditStatus() {
      await putWarehouseStatus({
        id: this.current.id,
        status: this.editStatus
      })
      this.dialogVisible = false
      this.getWarehouse()
    },
    handleClose() {
      console.log(111)
    }
  },
  created() {
    this.getWarehouse()
  },
  computed: {
    ...mapGetters(['pageList'])
  },
  mounted() {},
  watch: {
    formInline: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log(val)
        if (val === 'qiyong') {
          this.status = 1
        } else if (val === 'tingyong') {
          this.status = 0
        } else {
          this.status = ''
        }
      }
    }
  }
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
    .card-select {
      width: 200px;
      height: 40px;
      line-height: 40px;
      margin-top: -8px;
      /deep/.el-input__inner {
        background-color: #f8f5f5;
        border-radius: 6px;
      }
      /deep/.el-form-item__label {
        color: #afa096;
        margin-top: -10px;
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
  /deep/.el-dialog__header {
    height: 56px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    .title {
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
