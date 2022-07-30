<template>
  <div class="editPage">
    <el-card shadow="always">
      <div class="grid-content bg-purple">
        <el-form class="card-form" :model="formData" :rules="rules">
          <el-row class="row-bg">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="code" label="仓库编码" class="label">
                  <el-input
                    clearable
                    class="card-input1"
                    disabled
                    v-model="formData.code"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple-light">
                <el-form-item prop="name" label="仓库名称" class="label">
                  <el-input
                    clearable
                    class="card-input"
                    v-model="formData.name"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="type" label="仓库类型" class="label">
                  <el-select
                    v-model="formData.type"
                    clearable
                    placeholder="请选择"
                    class="card-input"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item></div
            ></el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            style="margin-top: 5px"
          >
            <el-col :span="22">
              <el-form-item prop="type" label="省/市/区" class="label">
                <el-cascader
                  :options="optionsAdd"
                  disabled
                  clearable
                  class="card-input4"
                  v-model="formData.location"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
            justify="space-between"
            style="margin-top: 15px"
          >
            <el-col :span="16">
              <el-form-item label="详细地址" class="label">
                <el-input
                  clearable
                  class="card-input4"
                  v-model="formData.address"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="仓库状态" class="typeTabel" prop="status">
                <el-radio v-model="formData.status" :label="1">启用</el-radio>
                <el-radio v-model="formData.status" :label="0">停用</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="row-bg">
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="code" label="仓库面积" class="label">
                  <el-input
                    clearable
                    class="card-input"
                    v-model="formData.surface"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple-light">
                <el-form-item prop="name" label="负责人" class="label">
                  <el-input
                    clearable
                    class="card-input"
                    v-model="formData.personName"
                  ></el-input>
                </el-form-item></div
            ></el-col>
            <el-col :span="8"
              ><div class="grid-content bg-purple">
                <el-form-item prop="type" label="联系电话" class="label">
                  <el-input
                    clearable
                    class="card-input"
                    v-model="formData.phone"
                  ></el-input>
                </el-form-item></div
            ></el-col>
          </el-row>
        </el-form>
        <el-row type="flex" class="row-bg footer" justify="center">
          <el-col :span="6"
            ><div class="grid-content bg-purple">
              <el-button round class="rowBtn1" @click="$router.back()"
                >返回</el-button
              >
            </div></el-col
          >
          <el-col :span="2"
            ><div class="grid-content bg-purple">
              <el-button type="warning" round class="rowBtn2" @click="onSubmit"
                >提交</el-button
              >
            </div></el-col
          >
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { putWarehouseStatus, getWarehouse } from '@/api/warehouse'
export default {
  data() {
    return {
      optionsAdd: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      options: [
        {
          value: '中转仓',
          type: 'ZZ'
        },
        {
          value: '加工仓',
          type: 'JG'
        },
        {
          value: '储备仓',
          type: 'CB'
        },
        {
          value: '冷藏仓',
          type: 'LC'
        }
      ],
      formData: {
        code: '', // 仓库编码
        name: '', // 仓库名称
        type: '', // 仓库类型
        location: '', // 省市区
        address: '', // 详细地址
        surface: '', // 仓库面积
        personName: '', //  负责人
        phone: '', // 联系电话
        status: null
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入仓库名称'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入仓库名称'
          }
        ],
        status: [
          {
            required: true,
            message: '阿巴'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['currList'])
  },
  created() {
    console.log(this.currList)
    this.formData = this.currList
    this.wareType()
    console.log(this.formData.status)
  },
  methods: {
    wareType() {
      if (this.currList.type === 'ZZ') {
        this.formData.type = '中转仓'
      } else if (this.currList.type === 'JG') {
        this.formData.type = '加工仓'
      } else if (this.currList.type === 'CB') {
        this.formData.type = '储备仓'
      } else {
        this.formData.type = '冷藏仓'
      }
    },
    async onSubmit() {
      await putWarehouseStatus(this.formData)
      try {
        this.$router.back()
        this.$message.success('修改成功')
      } catch (error) {
        this.$message.warning('修改失败，请稍候再试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.editPage {
  padding: 20px 20px 0 220px;
  .card-form {
    .card-input {
      margin-left: 35px;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f8f5f5;
      }
    }
    .card-input1 {
      margin-left: 35px;
      width: 300px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f3ebeb;
      }
    }
    .label {
      /deep/.el-form-item__label {
        font-size: 14px;
        margin-left: 35px;
      }
    }
    .card-input4 {
      margin-left: 30px;
      width: 668px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #f8f5f5;
      border-radius: 6px;
      /deep/.el-input__inner {
        background-color: #f8f5f5;
      }
    }
    /deep/.el-form-item__label {
      float: unset;
    }
    /deep/.el-form-item__error {
      margin-left: 35px;
    }
  }
  .footer {
    margin-top: 20px;
    .rowBtn1 {
      width: 150px;
      background-color: #f8f5f5;
      color: #000;
      margin-left: -60px;
      border: none;
      &:hover {
        background-color: #ffb200;
      }
    }
    .rowBtn2 {
      width: 150px;
      background-color: #ffb200;
      color: #000;
      margin-left: -60px;
      &:hover {
        background-color: #ff8e00;
      }
    }
  }
}
</style>
