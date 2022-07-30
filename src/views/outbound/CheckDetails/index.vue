<template>
  <div class="CheckDetails">
    <el-card shadow="always">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="基础信息" name="1">
          <div>
            <el-steps :space="200" :active="1" finish-status="success">
              <el-step title="已完成" process-status="success"></el-step>
              <el-step title="已完成" process-status="process "></el-step>
              <el-step title="已完成"></el-step>
              <el-step title="已完成"></el-step>
              <el-step title="已完成"></el-step>
              <el-step title="已完成"></el-step>
            </el-steps>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="less">
.CheckDetails {
  padding: 20px 20px 0 220px;
}
</style>
