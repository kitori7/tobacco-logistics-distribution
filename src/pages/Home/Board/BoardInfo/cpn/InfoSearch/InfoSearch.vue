<template>
  <div class="InfoSearch">
    <div class="title">
      <div class="round notProcessed"></div>
      <p>营销反馈</p>
      <el-select v-model="test" placeholder="全部信息" size="small">
        <el-option value="全部">
          <div class="sRound"></div>
          <span>全部</span>
        </el-option>
        <el-option label="未处理" value="未处理">
          <div class="sRound round notProcessed"></div>
          <span>未处理</span>
        </el-option>
        <el-option label="已处理" value="已处理">
          <div class="sRound round processed"></div>
          <span>已处理</span>
        </el-option>
      </el-select>
    </div>
    <div class="search-content">
      <el-form :inline="true" label-width="100px">
        <el-form-item label="订单日期">
          <el-date-picker></el-date-picker>
        </el-form-item>
        <el-form-item label="客户编码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <ElButton>搜索</ElButton>
        </el-form-item>
        <el-form-item label="配送域">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="送货路径">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="送货部">
          <el-select></el-select>
        </el-form-item>
        <el-form-item>
          <ElButton>重置</ElButton>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const test = ref("全部");
</script>
<style lang="scss" scoped>
  .InfoSearch {
    .title {
      display: flex;
      align-items: center;

      p {
        margin: 0 15px;
      }
    }
    .search-content{
      margin-top: 20px;
      padding: 10px 40px 0px 40px;
      border: 2px solid $processed;
    }
  }
  .round {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    &.notProcessed {
      background-color: $notProcessed;
    }
    &.processed {
      background-color: $processed;
    }
  }

  .sRound {
    width: 10px;
    height: 10px;
    margin: 0px 5px;
  }
</style>
