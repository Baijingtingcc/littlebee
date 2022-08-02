<template>
  <div class="CheckDetails">
    <el-card shadow="always">
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
          ref="closeShow"
        >
          <el-table-column type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="ownerName" label="货主名称" width="150">
          </el-table-column>
          <el-table-column prop="goodsCode" label="货品编号" width="150">
          </el-table-column>
          <el-table-column
            prop="goodsName"
            label="货品名称"
            width="200"
          >
          </el-table-column>
          <el-table-column prop="goodsTypeName" label="货品类型" width="200">
          </el-table-column>
          <el-table-column prop="goodsPrice" label="货品单价" width="150">
          </el-table-column>
          <el-table-column prop="goodsGuaranteeDay" label="保质天数(天)" width="150">
          </el-table-column>
          <el-table-column prop="goodsUnit" label="单位" width="150">
          </el-table-column>
          <el-table-column prop="goodsVolume" label="体积(m³)" width="150">
          </el-table-column>
          <el-table-column
            prop="planNum"
            label="到货数量"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="realNum" label="实收总数" width="150">
          </el-table-column>
          <el-table-column prop="realDifferenceNum" label="收货差异" width="150">
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
            :total="10"
          >
          </el-pagination>
        </div>
        <div class="celcanBtn">
          <el-button round class="celBtn" @click="celcanBtn">返回</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getReceiptList } from '@/api/taskReceive'

export default {
  components: {},
  props: {},
  data() {
    return {
      page: {
        size: 10,
        current: 1
      },
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
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.$store.state.CheckDetails.currtentMasterID)
    this.getReceiving()
  },
  mounted() {
  },
  methods: {
    // 格式化
    formatterStatus(a, b, cellValue) {
      return this.statusGoods.find((item) => item.type === cellValue)?.value || ''
    },
    handleCurrentChange(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      console.log(val)
    },
    // 表格数据
    async getReceiving() {
      const { data: { data } } = await getReceiptList({
        masterId: this.$store.state.CheckDetails.currtentMasterID,
        current: this.page.current,
        size: this.page.size
      })
      console.log(data)
      this.list = data.records
    },
    celcanBtn() {
      this.$store.commit('CheckDetails/close')
      this.$router.back()
    }
  }
}
</script>
<style scoped lang="less">
.CheckDetails {
  padding: 20px 20px 0 220px;

  .block {
    margin-top: 20px;
    margin-left: 300px;
  }

  .celcanBtn {
    margin-top: 65px;
    display: flex;
    justify-content: center;

    .celBtn {
      width: 170px;
      height: 40px;
      background-color: #f8f5f5;
      color: #000;

      &:hover {
        background-color: #ffb200;
      }
    }
  }
}
</style>
