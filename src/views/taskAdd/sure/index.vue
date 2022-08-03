<template>
  <div class="sure">
    <el-card shadow="always">
      <el-progress :percentage="setProgress" :format="setText" class="jdt">
      </el-progress>
    </el-card>
  </div>
</template>

<script>
import { getReceiptList, getSum } from '@/api/taskAdd'

export default {
  components: {},
  props: {},
  data() {
    return {
      goodsGroundingTotal: null,
      goodsRealTotal: null
    }
  },
  computed: {
    // 进度条
    setProgress() {
      console.log(parseInt((+this.goodsGroundingTotal / +this.goodsRealTotal).toFixed(1) * 100))
      if (this.goodsGroundingTotal > this.goodsRealTotal) {
        return 100
      } else {
        return 66
      }
    }
  },
  watch: {},
  created() {
    console.log(this.$store.state.sure.currtentMasterID)
    this.getReceiptList()
    this.getSum()
  },
  mounted() {
  },
  methods: {
    async getSum() {
      const res = await getSum(this.$store.state.sure.currtentMasterID)
      console.log(res)
      this.goodsRealTotal = res.data.data.goodsRealTotal
      this.goodsGroundingTotal = res.data.data.goodsGroundingTotal
    },
    async getReceiptList() {
      const res = await getReceiptList({
        masterId: this.$store.state.sure.currtentMasterID,
        current: 1,
        size: 10
      })
      console.log(res.data.data)
    },
    setText() {
      console.log(this.goodsGroundingTotal)
      return +this.goodsGroundingTotal + '/' + this.goodsRealTotal
    }

  }
}
</script>
<style scoped lang="less">
.sure {
  padding: 20px 20px 0 220px;

  .jdt {
    width: 200px;
    display: flex;
  }
}
</style>
