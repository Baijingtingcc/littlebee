<template>
  <div class="ckd">
    <div class="search">
      <el-card shadow="always" class="card">
        <el-row :gutter="20">
          <el-col :span="6"
          >
            <div class="grid-content bg-purple count">
              <p class="title">库区名称</p>
              <el-input
                placeholder="请输入"
                v-model="page.areaName"
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
              <p class="title">库位名称</p>
              <el-input
                placeholder="请输入"
                v-model="page.name"
                clearable
                class="card-input"
              >
              </el-input>
            </div
            >
          </el-col>
          <el-col :span="6">
            <el-form :inline="true" class="demo-form-inline card-select">
              <el-form-item label="仓库状态">
                <el-select v-model="formInline" placeholder="请选择">
                  <el-option label="全部" value="2"></el-option>
                  <el-option label="停用" value="0"></el-option>
                  <el-option label="启用" value="1"></el-option>
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
            @click="$router.push('addLocation')"
          >
            新增库位
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
            <el-table-column prop="warehouseName" label="所属仓库" width="100">
            </el-table-column>
            <el-table-column prop="areaCode" label="库区编号" width="120">
            </el-table-column>
            <el-table-column
              prop="areaName"
              label="库区名称"
              width="120"
              height="20"
            >
            </el-table-column>
            <el-table-column
              prop="code"
              label="库位编号"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="库位名称"
              width="180"
            >
            </el-table-column>
            <el-table-column
              prop="temperatureType"
              label="温度类型"
              width="100"
              :formatter="formatterTemperature"
            />
            <el-table-column
              prop="bearingType"
              label="承重类型"
              width="100"
              :formatter="formatterBearing"
            />
            <el-table-column
              prop="useType"
              label="用途属性"
              width="100"
              :formatter="formatterCache"
            />
            <el-table-column prop="status" label="停用状态" width="120">
              <template v-slot="{row}">
                <span>{{ row.status === 0 ? '停用' : '启用' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="maxNum" label="承载上限" width="120">
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="200">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="240">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.row)"
                  type="text"
                  size="medium"
                >编辑
                </el-button
                >
                <el-button
                  @click="handleStatus(scope.row)"
                  type="text"
                  size="medium"
                >{{ scope.row.status === 0 ? '启用' : '停用' }}
                </el-button
                >
                <el-button type="text" size="medium" @click="deleteLike()"
                >删除
                </el-button
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
import { putWarehouseStatus } from '@/api/warehouse'
import { getLocation } from '@/api/location'

export default {
  data() {
    return {
      dialogVisible: false,

      list: [],
      formInline: null,
      status: '',
      editStatus: '',
      tableName: '',
      page: {
        areaName: '',
        name: '',
        size: 10,
        current: 1
      },
      total: null,
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
      ]
    }
  },
  methods: {
    // 请求数据
    async getLocation() {
      const { data: { data } } = await getLocation(this.page)
      console.log(data)
      this.total = data.total
      this.list = data.records
    },
    formatterTemperature(a, b, cellValue) {
      const useType = this.temperatureType.find(
        (item) => item.type === cellValue
      )?.value
      return useType || '未知'
    },
    formatterBearing(a, b, cellValue) {
      const useType = this.bearingType.find(
        (item) => item.type === cellValue
      )?.value
      return useType || '未知'
    },
    formatterCache(a, b, cellValue) {
      const useType = this.cache.find((item) => item.type === cellValue)?.value
      return useType || '未知'
    },
    deleteLike() {
      this.$notify({
        title: '提示',
        message: ({ style: 'color: #757c83' }, '演示系统,不支持此操作')
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.size = val
      this.getLocation({
        status: this.formInline
      })
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.current = val
      console.log(this.page.current)
      this.getLocation()
    },
    // 搜索
    onSearch() {
      console.log(this.formInline)
      console.log(this.page)
      this.getLocation()
    },
    // 重置
    onReset() {
      this.page.name = ''
      this.page.areaName = ''
      this.formInline = ''
      this.getLocation()
    },
    // 跳转到添加页面
    async handleEdit(str) {
      console.log(str)
      this.$store.commit('reservoir/edit', str.id)
      this.$router.push({
        path: 'addReservoir'
      })
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
      console.log(this.editStatus)
      this.dialogVisible = false
      // this.getReservoir()
    },
    handleClose() {
      console.log(111)
    }
  },
  created() {
    this.getLocation()
  },
  computed: {},
  mounted() {
  },
  watch: {}
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

        /deep/ .el-input__inner {
          background-color: #f8f5f5;
        }
      }
    }

    .card-select {
      width: 200px;
      height: 40px;
      line-height: 40px;
      margin-top: -8px;

      /deep/ .el-input__inner {
        background-color: #f8f5f5;
        border-radius: 6px;
      }

      /deep/ .el-form-item__label {
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

  /deep/ .el-dialog__header {
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
