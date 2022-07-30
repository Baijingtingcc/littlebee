<template>
  <div class="tag">
    <el-tag class="gzt">工作台</el-tag>
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
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.tag {
  background-color: #f5f1f1;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  position: relative;
  .gzt {
    padding: 0 15px 0 15px;
    font-size: 13px;
    height: 36px;
    margin: 15px 20px;
    background-color: #fff;
    color: #b5abab;
    border: none;
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
