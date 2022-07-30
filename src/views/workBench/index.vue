<template>
  <div class="workBench">
    <div class="main">
      <!-- 图片 -->
      <div class="banner">
        <div class="left">
          <img
            src="http://www-wms-java.itheima.net/img/dashboard-banner-left@2x.5afd2949.png"
            alt=""
            class="leftbg"
          />
          <img
            src="http://www-wms-java.itheima.net/img/avatar@2x.4f4a758f.png"
            alt=""
            class="lefttx"
          />
          <p class="lefttitle">仓储管理员</p>
        </div>
        <div class="center">
          <p class="center-title">我不是为了输赢，我就是认真！</p>
          <p class="center-name">—— 罗永浩</p>
        </div>
        <div class="right">
          <img
            src="http://www-wms-java.itheima.net/img/dashboard-banner-right@2x.28195570.png"
            alt=""
            class="right-pic"
          />
        </div>
        <div class="site">
          <p>北京总仓</p>
        </div>
        <div class="tzggcerd">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>通知/公告</span>
            </div>
            <div class="text item">
              <p>紧急盘点通知</p>
              <p class="time">2020.12.30 18:23:14</p>
            </div>
            <div class="text item">
              <p>运维服务更新通知</p>
              <p class="time">2020.12.30 18:23:14</p>
            </div>
            <div class="text item">
              <p>客户入库变更通知</p>
              <p class="time">2020.12.30 18:23:14</p>
            </div>
            <div class="text item">
              <p>五一放假通知</p>
              <p class="time">2020.12.30 18:23:14</p>
            </div>
            <div class="text item">
              <p>品达物流系统对接通知</p>
              <p class="time">2020.12.30 18:23:14</p>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 待办事项 -->
      <div class="Backlog">
        <p>待办信息</p>
        <div class="dbxx">
          <el-card
            shadow="hover"
            class="dbxx-card"
            v-for="(item, index) in todos"
            :key="index"
          >
            <div @click="onTodos(item)">
              <div class="header">
                <i class="el-icon-sold-out rkicon"></i>
                <span class="rkd">{{ item.name }}</span>
              </div>
              <div class="footer">
                <span class="xz">新增</span>
                <span class="shuju">{{ item.value1 }}</span>
                <span class="dsh2">待审核</span>
                <span class="shuju2">{{ item.value2 }}</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 任务导航 -->
      <div class="taskNav">
        <p>任务导航</p>
        <div class="kapian">
          <el-card
            shadow="hover"
            class="taskNav-card"
            v-for="item in taskList"
            :key="item.id"
          >
            <div class="flex">
              <i
                :class="item.icon"
                :style="`background-color:${item.color}`"
                class="taskNav-icon"
              ></i>
              <span class="taskNav-text">{{ item.text }}</span>
            </div>
          </el-card>
        </div>
      </div>
      <!-- 柱状图 -->
      <div class="myEchart">
        <div class="header">
          <p>入库/出库信息</p>
          <div class="btn">
            <el-button
              @click="changeList('w')"
              :class="{ show: isShow === 'w' ? true : false }"
            >
              <span>本周</span>
            </el-button>
            <el-button
              @click="changeList('e')"
              :class="{ show: isShow === 'e' ? true : false }"
            >
              <span>本月</span>
            </el-button>
            <el-button
              @click="changeList('c')"
              :class="{ show: isShow === 'c' ? true : false }"
            >
              <span>全年</span>
            </el-button>
          </div>
        </div>
        <div style="height: 400px" id="main"></div>
      </div>
      <!-- 环形图 饼状图 -->
      <div class="libs">
        <div class="ringTu">
          <p>库存使用情况</p>
          <div id="ringTuhuan" style="height: 354px"></div>
        </div>
        <div class="bingtu">
          <p>库区使用情况</p>
          <div id="peiTu" style="height: 354px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHistogramList, getStockStatus, getAreaStatus } from '@/api/user.js'
import * as echarts from 'echarts'
import { mapGetters } from 'vuex'
// import header from '@/components/header.vue'
export default {
  // components: { header },
  data() {
    return {
      taskList: [
        {
          id: 1,
          text: '收货任务',
          icon: 'iconfont icon-kache',
          color: '#0076ff'
        },
        {
          id: 2,
          text: '上架任务',
          icon: 'iconfont icon-shangjia',
          color: '#52d4f3'
        },
        {
          id: 3,
          text: '盘点任务',
          icon: 'iconfont icon-pdrw',
          color: '#ff7100'
        },
        {
          id: 4,
          text: '拣货任务',
          icon: 'iconfont icon-jianhuo',
          color: '#ff609e'
        },
        {
          id: 5,
          text: '交换任务',
          icon: 'iconfont icon-jjrw',
          color: '#ffb200'
        }
      ],
      // 柱状图
      option: {
        tooltip: {},
        legend: {
          data: ['入库', '出库'],
          top: '95%',
          left: '40%'
        },
        xAxis: {
          data: []
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '入库',
            type: 'bar',
            data: [],
            itemStyle: {
              color: '#ff7100'
            },
            barGap: '0%'
          },
          {
            name: '出库',
            type: 'bar',
            data: this.dayList2,
            itemStyle: {
              color: '#ffb200'
            }
          }
        ]
      },
      // 环形图
      options: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#ccc', '#ffbb00'],
        series: [
          {
            type: 'pie',
            radius: ['45%', '60%'],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '15',
                fontWeight: 'bold',
                color: ['#faf0ef', '#ffbb00']
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: '', name: '' },
              { value: '', name: '' }
            ]
          }
        ]
      },
      // 饼状图
      optionpei: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          right: '25%',
          top: '30%',
          icon: 'circle',
          selectedMode: false,
          itemGap: 20,
          formatter: function (name) {
            let total = 0
            let target
            const data = [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出库区' },
              { value: 677, name: '暂存库区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ]
            for (let i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                target = data[i].value
              }
            }
            return (
              name +
              '        ' +
              ((target / total) * 100).toFixed() +
              '%' +
              '        ' +
              target
            )
          }
        },
        color: ['#0076ff', '#52d4f3', '#5d7092', '#ffb200', '#ff7100'],
        series: [
          {
            type: 'pie',
            radius: '60%',
            center: ['25%', '53%'],
            label: {
              normal: {
                position: 'inner',
                show: true,
                formatter: '{c}',
                color: '#fff'
              }
            },
            data: [
              { value: 348, name: '拣货区' },
              { value: 487, name: '出库区' },
              { value: 677, name: '暂存库区' },
              { value: 126, name: '进货暂存区' },
              { value: 298, name: '出货暂存区' }
            ],
            itemStyle: {
              borderWidth: 2,
              borderColor: '#fff',
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          }
        ]
      },
      isShow: 'w'
    }
  },
  computed: {
    ...mapGetters(['todos'])
  },
  created() {
    this.$store.dispatch('login/getTodo')
    this.getHistogramList()
    this.getStockStatus()
    this.getAreaStatus()
  },
  methods: {
    onTodos(todo) {
      console.log(todo)
      if (todo.name === '入库单') {
        this.$router.push({
          path: '/navbar/outbound'
        })
      }
    },
    // 饼状图
    pieChart() {
      const myChart = echarts.init(document.getElementById('peiTu'))
      myChart.setOption(this.optionpei)
    },
    // 柱状图
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option)
    },
    // 环形图
    circularDiagram() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('ringTuhuan'))
      // 指定图表的配置项和数据
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.options)
    },
    // 柱状图请求
    async getHistogramList() {
      const res = await getHistogramList(this.isShow)
      this.option.xAxis.data = res.data.data.x
      this.option.series[0].data = res.data.data.data[0].data
      this.option.series[1].data = res.data.data.data[1].data
      console.log(res.data.data.data[0].data)
    },
    // 点击事件
    changeList(str) {
      console.log(str)
      this.isShow = str
      this.getHistogramList()
    },
    // 环形图请求
    async getStockStatus() {
      const { data } = await getStockStatus()
      console.log(data.data[0].value)
      this.options.series[0].data[0].value = data.data[0].value
      this.options.series[0].data[0].name = data.data[0].name
      this.options.series[0].data[1].value = data.data[1].value
      this.options.series[0].data[1].name = data.data[1].name
      console.log(this.options.series[0].data[0].value)
    },
    // 饼图请求 没有数据 无语
    async getAreaStatus() {
      const res = await getAreaStatus()
      console.log(res)
    }
  },
  mounted() {
    this.drawChart()
    this.circularDiagram()
    this.pieChart()
  },
  watch: {
    // 数据更新后视图需要重绘 监视option的变化 重新调用
    option: {
      deep: true,
      handler() {
        this.drawChart()
      }
    },
    options: {
      deep: true,
      handler() {
        this.circularDiagram()
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  width: 1165px;
  height: 100%;
  background-color: #fdfafa;
  padding-bottom: 20px;
}
.workBench {
  padding-left: 200px;
}
.banner {
  display: flex;
  margin: 15px 20px;
  width: 800px;
  height: 148px;
  background: linear-gradient(270deg, #ffc771, #ffa634);
  box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
  border-radius: 12px;
  position: relative;
  .left {
    position: relative;
    width: 165px;
    .leftbg {
      width: 166px;
      height: 148px;
    }
    .lefttx {
      position: absolute;
      top: 31px;
      left: 43px;
      height: 62px;
    }
    .lefttitle {
      position: absolute;
      left: 36px;
      bottom: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #332929;
      line-height: 22px;
    }
  }
  .center {
    width: 300px;
    margin-top: 15px;
    margin-left: 20px;
    .center-name {
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fff;
      line-height: 25px;
      margin-left: 150px;
    }
    .center-title {
      width: 300px;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      line-height: 25px;
    }
  }
  .right {
    .right-pic {
      width: 300px;
      height: 148px;
      margin-left: 20px;
    }
  }
  .site {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 147px;
    height: 40px;
    background: #f8f5f5;
    border-radius: 6px;
    opacity: 0.79;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    p {
      font-size: 14px;
      font-weight: 500;
      color: #332929;
    }
  }
}
.Backlog {
  p {
    margin: 0;
    margin-bottom: 15px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #332929;
    line-height: 22px;
  }
  box-sizing: border-box;
  width: 800px;
  height: 300px;
  padding: 15px;
  margin: 20px 20px;
  background: #fff;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  border-radius: 12px;
  .dbxx {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    .dbxx-card {
      &:hover {
        background-color: #fff;
      }
      background-color: #fbf7f7;
      width: 250px;
      height: 210px;
      .header {
        display: flex;
        align-items: center;
        .rkicon {
          width: 50px;
          height: 50px;
          background-color: #0076ff;
          border-radius: 10px;
          color: #fff;
          font-size: 35px;
          text-align: center;
          line-height: 50px;
        }
        .rkd {
          font-size: 20px;
          margin-left: 15px;
        }
      }
      .footer {
        margin-top: 80px;
        display: flex;
        align-items: center;
        .xz {
          font-size: 20px;
          font-weight: normal;
          color: #978b96;
        }
        .shuju {
          margin: -10px 5px;
          font-size: 35px;
          color: #000;
        }

        .dsh2 {
          margin: 0px 5px 0 35px;
          font-size: 20px;
          font-weight: normal;
          color: #978b96;
        }
        .shuju2 {
          margin: -10px 5px;
          font-size: 35px;
          color: #0076ff;
        }
      }
    }
  }
}
.tzggcerd {
  margin-left: 10px;
  .box-card {
    box-sizing: border-box;
    width: 261px !important;
    height: 465px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 30px;
  }
  .text {
    font-size: 14px;
    .time {
      font-size: 12px;
      color: #887e7e;
    }
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
  .clearfix {
    font-weight: 700;
  }

  .box-card {
    width: 480px;
  }
}
.taskNav {
  .kapian {
    display: flex;
  }
  box-sizing: border-box;
  width: 1080px;
  height: 200px;
  background: #fff;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  border-radius: 12px;
  padding: 15px;
  margin: 15px 20px;
  p {
    margin: 0;
    margin-bottom: 15px;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #332929;
    line-height: 22px;
  }
  .taskNav-card {
    box-sizing: border-box;
    width: 188px;
    height: 120px;
    display: flex;
    align-items: center;
    margin-left: 15px;
    /deep/.el-card__body {
      width: 100%;
      height: 100%;
    }
    .flex {
      display: flex;
      align-items: center;
      margin-top: 10px;
      .taskNav-icon {
        display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        font-size: 25px;
        color: #fff;
        text-align: center;
        line-height: 50px;
      }
      .taskNav-text {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
  .taskNav-card {
    background-color: #fbf7f7;
    &:hover {
      background-color: #fff;
    }
  }
}
.myEchart {
  height: 500px;
  background: #fff;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  border-radius: 12px;
  padding: 25px;
  margin: 15px 20px;
  .header {
    display: flex;
    justify-content: space-between;
    p {
      margin: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      line-height: 22px;
    }
    .btn {
      color: '#fff';
      margin-right: 50px;
      .show {
        background-color: #ffb200;
        font-size: 16px;
        span {
          color: #fff;
        }
      }
      .el-button {
        color: 'black';
        font-size: 16px;
      }
    }
  }
}
// 环形 饼状图
.libs {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-left: 20px;
  margin-bottom: 50px;
  .ringTu {
    width: 30%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    margin-right: 20px;
    p {
      margin: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      line-height: 22px;
    }
  }
  .bingtu {
    width: 70%;
    height: 354px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    p {
      margin: 0;
      margin-bottom: 15px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      line-height: 22px;
    }
  }
}
</style>
