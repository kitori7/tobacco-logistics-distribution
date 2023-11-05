<template>
  <div class="InfoSearch">
    <div class="title">
      <div class="round notProcessed"></div>
      <p>营销反馈</p>
      <el-select  placeholder="全部信息" size="small">
        <el-option label="全部" value="全部">
          <div class="sRound round all"></div>
          <span>全部</span>
        </el-option>
        <el-option label="未处理" value="未处理">
          <div class="sRound round notProcessed"></div>
          <span>未处理</span>
        </el-option>
        <el-option label="处理中" value="处理中">
          <div class="sRound round dispose"></div>
          <span>处理中</span>
        </el-option>
        <el-option label="已处理" value="已处理">
          <div class="sRound round processed"></div>
          <span>已处理</span>
        </el-option>
        <el-option value="全部">
          <div class="sRound round notDispose"></div>
          <span>无需处理</span>
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
        <el-form-item label="配送域">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="送货路径">
          <el-select></el-select>
        </el-form-item>
        <el-form-item label="送货部">
          <el-select></el-select>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button :icon="Search">搜索</el-button>
        <el-button :icon="Refresh">重置</el-button>
      </div>
    </div>
    <div class="btn-content">
      <el-button :icon="Plus" @click="handleAdd">添加异常信息</el-button>
      <el-button :icon="Delete">批量删除</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { Search, Refresh, Plus, Delete } from "@element-plus/icons-vue";
  const emit = defineEmits(["itemAdd"]);
  // 点击提交
  function handleAdd() {
    emit("itemAdd");
  }
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
    .search-content {
      display: flex;
      margin-top: 20px;
      padding: 10px 40px 0px 40px;
      border: 2px solid $processed;
      .el-form-item {
        width: 30%;
      }
      .search-btn {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: start;
      }
      .el-button + .el-button {
        margin-top: 10%;
        margin-left: 0;
      }
    }
    .btn-content {
      margin: 5px 0;
    }
  }
</style>
