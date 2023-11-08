<template>
  <div class="InfoSearch">
    <div class="title">
      <div class="round notProcessed"></div>
      <p>营销反馈</p>
      <el-select
        v-model="searchForm.feedbackStatus"
        placeholder="全部信息"
        size="small"
      >
        <el-option label="全部" value="">
          <div class="sRound round all"></div>
          <span>全部</span>
        </el-option>
        <el-option label="未处理" value="0">
          <div class="sRound round notProcessed"></div>
          <span>未处理</span>
        </el-option>
        <el-option label="处理中" value="1">
          <div class="sRound round dispose"></div>
          <span>处理中</span>
        </el-option>
        <el-option label="已处理" value="2">
          <div class="sRound round processed"></div>
          <span>已处理</span>
        </el-option>
        <el-option label="无需处理" value="3">
          <div class="sRound round notDispose"></div>
          <span>无需处理</span>
        </el-option>
      </el-select>
    </div>
    <div class="search-content">
      <el-form :inline="true" label-width="100px" :model="searchForm">
        <el-form-item label="订单日期">
          <el-date-picker
            v-model="time"
            value-format="YYYY-MM-DD hh:mm:ss"
            type="datetimerange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="客户编码">
          <el-input v-model="searchForm.customerCode"></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="大区名称">
          <el-select v-model="searchForm.areaName"></el-select>
        </el-form-item>
        <el-form-item label="送货路径">
          <el-select v-model="searchForm.routeId"></el-select>
        </el-form-item>
        <el-form-item label="送货部">
          <el-select></el-select>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button :icon="Search" @click="handleSearch">搜索</el-button>
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
  import type { ISearch } from "@/types/board";
  const emit = defineEmits(["itemAdd", "itemSearch"]);
  // 点击提交
  // 时间处理
  const time = ref();
  watch(time, (newValue) => {
    searchForm.value.orderStartDate = newValue[0]
    searchForm.value.orderEndDate = newValue[1]
  });
  const searchForm = ref<ISearch>({
    contactName: "",
    areaName: "",
    customerCodeL: "",
    feedbackStatus: "1",
    orderEndDate: "",
    orderStartDate: "",
  });

  function handleSearch() {
    emit("itemSearch", { ...searchForm.value });
  }
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
