<template>
  <div class="InfoTable">
    <el-table
      v-loading="loading"
      :data="props.tableData"
      :row-class-name="tableRowClassName"
      size="small"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column type="selection" />
      <el-table-column type="index" label="序号" />
      <el-table-column prop="areaName" label="配送域" width="180" />
      <el-table-column prop="storeName" label="线路名称" width="180" />
      <el-table-column prop="deliveryName" label="送货员" width="60" />
      <el-table-column prop="customerManagerName" label="客户专员" width="65" />
      <el-table-column prop="customerCode" label="客户编码" width="65" />
      <el-table-column prop="contactName" label="客户名称" width="75" />
      <el-table-column prop="storeAddress" label="客户地址" />
      <el-table-column prop="feedbackInformation" label="异常信息反馈" />
      <el-table-column label="操作" width="60">
        <template #default="scope">
          <el-button link size="small" @click="handleEdit(scope.row)"
            ><el-icon color="rgb(204,255,255)" size="15"><Edit /></el-icon
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" setup>
  import type { IBoardItem } from "@/types/board";
  import { storeToRefs } from "pinia";
  import { Edit } from "@element-plus/icons-vue";
  const emit = defineEmits(["itemClick"]);
  import { useBoardStore } from "@/store/board";
  const boardStore = useBoardStore();
  const { loading } = storeToRefs(boardStore);
  interface IProps {
    tableData?: IBoardItem[];
  }
  const props = withDefaults(defineProps<IProps>(), {
    tableData: () => {
      return [];
    },
  });
  const tableRowClassName = ({
    rowIndex,
  }: {
    row: IBoardItem;
    rowIndex: number;
  }) => {
    if (rowIndex % 2 == 1) {
      return "odd";
    } else if (rowIndex % 2 == 0) {
      return "even";
    }
    return "";
  };

  // 点击编辑
  function handleEdit(item: IBoardItem) {
    emit("itemClick", item);
  }
</script>
<style lang="scss" scoped>
  .InfoTable {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
