<template>
  <div class="navigation">
    <el-row class="tac">
      <el-col :span="12" class="nav">
        <h1><img src="@/assets/beelogo.png" alt="" class="logo"/></h1>
        <el-menu
          active-text-color="#ffb200"
          default-active="2"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu nav-item"></i>
            <span slot="title" class="nav-item">工作台</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-tickets nav-item"></i>
              <span class="nav-item">基础信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="nav-item"
                v-for="(item, index) in basicInformation"
                :key="index"
                :index="item.id"
                @click="changeTags(item)"
              >{{ item.text }}
              </el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i
                class="iconfont icon-shangwuguanli nav-item"
                style="margin: 0 10px 0 3px; fontsize: 18px"
              ></i>
              <span class="nav-item">商务管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="nav-item"
                v-for="(item, index) in management"
                :key="index"
                :index="item.id"
                @click="changeTags(item)"
              >{{ item.text }}
              </el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i
                class="iconfont icon-kunei nav-item"
                style="margin: 0 10px 0 3px; fontsize: 18px"
              ></i>
              <span class="nav-item">库内管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="nav-item"
                v-for="(item, index) in Library"
                :key="index"
                :index="item.id"
                @click="changeTags(item)"
              >{{ item.text }}
              </el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i
                class="iconfont icon-rukuguanli nav-item"
                style="margin: 0 10px 0 3px; fontsize: 18px"
              ></i>
              <span class="nav-item">入库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="nav-item"
                v-for="(item, index) in warehouse"
                :key="index"
                :index="item.id"
                @click="changeTags(item)"
              >{{ item.text }}
              </el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i
                class="iconfont icon-chukuguanli nav-item"
                style="margin: 0 10px 0 3px; fontsize: 18px"
              ></i>
              <span class="nav-item">出库管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                class="nav-item"
                v-for="(item, index) in warehouseChu"
                :key="index"
                :index="item.id"
                @click="changeTags(item)"
              >{{ item.text }}
              </el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
    <div class="tag">
      <el-tag class="gzt" @click="onRouter">工作台</el-tag>
      <el-tag
        closable
        class="close"
        v-for="(item, index) in tags"
        :key="index"
        @close="handleClose(item)"
      >
        {{ item.text }}
      </el-tag>
      <div class="righttag">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-back">关闭左侧</el-dropdown-item>
            <el-dropdown-item icon="el-icon-right">关闭右侧</el-dropdown-item>
            <el-dropdown-item icon="el-icon-close">关闭其他</el-dropdown-item>
            <el-dropdown-item icon="el-icon-error">关闭全部</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      // 基础信息
      basicInformation: [
        {
          id: '1 - 1',
          text: '仓库管理'
        },
        {
          id: '1 - 2',
          text: '库区管理'
        },
        {
          id: '1 - 3',
          text: '库位管理'
        },
        {
          id: '1 - 4',
          text: '库位视图'
        },
        {
          id: '1 - 5',
          text: '货品管理'
        },
        {
          id: '1 - 6',
          text: '货品类型管理'
        }
      ],
      // 商务管理
      management: [
        {
          id: '1-7',
          text: '货主管理'
        },
        {
          id: '1-8',
          text: '承运商管理'
        }
      ],
      // 库内管理
      Library: [
        {
          id: '1-9',
          text: '盘点单'
        },
        {
          id: '1-10',
          text: '盘点任务'
        },
        {
          id: '1-11',
          text: '库存损益'
        },
        {
          id: '1-12',
          text: '实时库存'
        }
      ],
      // 入库管理
      warehouse: [
        {
          id: '1-13',
          text: '入库单'
        },
        {
          id: '1-14',
          text: '收货任务'
        },
        {
          id: '1-15',
          text: '上架任务'
        }
      ],
      // 出库管理
      warehouseChu: [
        {
          id: '1-16',
          text: '出库单'
        },
        {
          id: '1-17',
          text: '拣货任务'
        },
        {
          id: '1-18',
          text: '交接任务'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['tags'])
  },
  methods: {
    onRouter() {
      this.$router.push('/navbar/navigation')
    },
    changeTags(key) {
      this.$store.commit('homePage/setTags', key)
      if (key.text === '入库单') {
        this.$router.push('/navbar/outbound')
      } else if (key.text === '仓库管理') {
        this.$router.push('/navbar/Warehouse')
      } else if (key.text === '库区管理') {
        this.$router.push('reservoir')
      } else if (key.text === '库位管理') {
        this.$router.push('location')
      }

      console.log(key)
    },
    // 移除tag标签
    handleClose(tag) {
      console.log(tag)
      this.$store.commit('homePage/editTags', tag)
      this.onRouter()
    }
  }
}
</script>

<style scoped lang="less">
.navigation {
  width: 100%;
  height: 100%;
  position: relative;

  .tac {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #fff;
    z-index: 9999;

    .nav {
      width: 100%;
    }
  }

  h1 {
    .logo {
      width: 150px;
      height: 65px;
    }
  }
}

.nav-item {
  color: #887e7e;
}

.tag {
  background-color: #f5f1f1;
  width: 1160px;
  height: 65px;
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 200px;

  .gzt {
    padding: 0 15px 0 15px;
    font-size: 13px;
    height: 36px;
    margin: 15px 20px;
    background-color: #fff;
    color: #b5abab;
    border: none;
    cursor: pointer;
  }

  .el-tag {
    line-height: 36px;
  }

  .close {
    font-size: 13px;
    height: 36px;
    background-color: #fff;
    color: #b5abab;
    border: none;
    margin-right: 15px;
    cursor: pointer;
  }

  .righttag {
    // margin-left: 850px;
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 6px;
    position: absolute !important;
    right: 34px;
    top: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
