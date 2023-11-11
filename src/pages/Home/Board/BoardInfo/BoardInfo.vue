<template>
  <div class="BoardInfo">
    <info-search
      @item-add="propItemAdd"
      @item-search="propItemSearch"
      @item-reset="propItemReset"
      @item-state="propItemStateChange"
      :feedbackType="feedbackType"
    ></info-search>
    <info-table
      class="info-table"
      :table-data="boardStore.boardData?.dataCurrentPage"
      @item-click="propItemClick"
    ></info-table>
    <info-item ref="InfoItemRef" @reply-click="propReplyClick"></info-item>
    <info-reply ref="InfoReplyRef" :replyType="feedbackType"></info-reply>
    <el-pagination
      layout="prev, pager, next"
      :current-page="pageData.pageNum"
      :page-size="pageData.pageSize"
      :total="boardStore.boardData.totalCount"
      @current-change="getDate()"
    />
    <InfoAdd ref="InfoAddRef"></InfoAdd>
  </div>
</template>
<script lang="ts" setup>
  import { useRoute } from "vue-router";
  import { useBoardStore } from "@/store/board";
  import InfoSearch from "./cpn/InfoSearch/InfoSearch.vue";
  import InfoTable from "./cpn/InfoTable/InfoTable.vue";
  import InfoItem from "./cpn/InfoItem/InfoItem.vue";
  import InfoAdd from "./cpn/InfoAdd/InfoAdd.vue";
  import infoReply from "./cpn/InfoReply/infoReply.vue";

  const boardStore = useBoardStore();
  const route = useRoute();
  const pageData = ref<IBoardSearchData>({
    pageNum: 1,
    pageSize: 10,
  });
  const feedbackType = ref<"1" | "2">();
  function getDate(searchData: ISearch = {}) {
    boardStore.getBoardData({
      feedbackType: feedbackType.value,
      ...pageData.value,
      ...searchData,
    });
  }
  watch(
    () => route.query.feedbackType,
    (newValue) => {
      feedbackType.value = newValue as "1" | "2";
      getDate();
    },
    { immediate: true }
  );
  const InfoItemRef = ref<InstanceType<typeof InfoItem>>();
  import type { IBoardItem, IBoardSearchData } from "@/types/board";
  import { ISearch } from "@/types/board";
  // 表格点击
  function propItemClick(item: IBoardItem) {
    InfoItemRef.value?.handleOpen(item);
  }
  // 回复点击
  const InfoReplyRef = ref<InstanceType<typeof infoReply>>();
  function propReplyClick(id: number) {
    InfoReplyRef.value?.handleReply(id);
  }
  // 添加点击
  const InfoAddRef = ref<InstanceType<typeof InfoAdd>>();
  function propItemAdd() {
    InfoAddRef.value?.handleOpen();
  }
  // 下拉框选择
  function propItemStateChange(searchData: ISearch) {
    getDate(searchData);
  }
  // 搜索点击
  function propItemSearch(searchData: ISearch) {
    getDate(searchData);
  }
  // 重置点击
  function propItemReset() {
    getDate();
  }
</script>
<style lang="scss" scoped>
  .BoardInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .info-table {
      flex: 1;
    }
  }
</style>
