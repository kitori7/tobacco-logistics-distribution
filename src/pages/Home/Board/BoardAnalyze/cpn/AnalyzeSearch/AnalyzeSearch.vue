<template>
  <div class="AnalyzeSearch">
    <el-form :inline="true" style="height: 100%;" label-width="100">
      <el-form-item label="订单日期">
        <el-date-picker></el-date-picker>
      </el-form-item>
      <el-form-item label="客户名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="客户编码">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="送货部">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="送货路线">
        <el-select></el-select>
      </el-form-item>
      <el-form-item label="暂存卷烟">
        <el-select></el-select>
      </el-form-item>
    </el-form>
    <div class="btn-content">
      <el-button>一键清空</el-button>
      <el-button>确认查询</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.AnalyzeSearch {
  display: flex;
  margin: 20px; 
  align-items: center;
  .btn-content{
    transform: translate(0,-25%);
    width:400px;
  }
}
</style>