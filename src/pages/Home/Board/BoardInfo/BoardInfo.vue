<template>
  <div class="BoardInfo">
    <info-search
      @item-add="propItemAdd"
      @item-search="propItemSearch"
    ></info-search>
    <info-table class="info-table" :table-data="boardStore.boardData?.dataCurrentPage" @item-click="propItemClick"></info-table>
    <info-item ref="InfoItemRef"></info-item>
    <el-pagination layout="prev, pager, next" :total="80" />
    <InfoAdd ref="InfoAddRef"></InfoAdd>
  </div>
</template>
<script lang="ts" setup>
  import { useBoardStore } from "@/store/board";
  import InfoSearch from "./cpn/InfoSearch/InfoSearch.vue";
  import InfoTable from "./cpn/InfoTable/InfoTable.vue";
  import InfoItem from "./cpn/InfoItem/InfoItem.vue";
  import InfoAdd from "./cpn/InfoAdd/InfoAdd.vue";

  const boardStore = useBoardStore();
  onMounted(() => {
    boardStore.getBoardData({
      feedbackType: "1",
      pageNum: 1,
      pageSize: 10,
    });
  });

  const InfoItemRef = ref<InstanceType<typeof InfoItem>>();
  import type { IBoardItem } from "@/types/board";
  import { ISearch } from "@/types/board";
  // 表格点击
  function propItemClick(item: IBoardItem) {
    console.log(item);
    InfoItemRef.value?.handleOpen(item);
  }

  // 添加点击
  const InfoAddRef = ref<InstanceType<typeof InfoAdd>>();
  function propItemAdd() {
    InfoAddRef.value?.handleOpen();
  }

  // 搜索点击
  function propItemSearch(searchData: ISearch) {
    console.log(searchData);
  }
</script>
<style lang="scss" scoped>
  .BoardInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .info-table{
      flex: 1;
    }
  }
</style>
