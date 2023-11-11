<template>
  <div class="BoardInfo">
    <info-search
      @item-add="propItemAdd"
      @item-delete="propItemDelete"
      @item-search="propItemSearch"
      @item-reset="propItemReset"
      @item-state="propItemStateChange"
      :feedbackType="feedbackType"
    ></info-search>
    <info-table
      class="info-table"
      :table-data="boardStore.boardData?.dataCurrentPage"
      @item-click="propItemClick"
      ref="InfoTableRef"
    ></info-table>
    <info-item ref="InfoItemRef" @reply-click="propReplyClick"></info-item>
    <info-reply
      ref="InfoReplyRef"
      :replyType="feedbackType"
      @getnew-click="submitReplyClick"
    ></info-reply>
    <el-pagination
      layout="prev, pager, next"
      :current-page="pageData.pageNum"
      :page-size="pageData.pageSize"
      :total="boardStore.boardData.totalCount"
      @current-change="currentChange"
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
    pageSize: 6,
  });
  // 页码改变
  function currentChange(value: number) {
    pageData.value.pageNum = value;
    getDate();
  }
  const feedbackType = ref<"1" | "2">("1");
  function getDate(searchData: ISearch = {}) {
    console.log(pageData.value);
    boardStore
      .getBoardData({
        feedbackType: feedbackType.value,
        ...pageData.value,
        ...searchData,
      })
      .then(() => {
        pageData.value.pageNum = boardStore.boardData.currentPageNum;
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
  const InfoReplyRef = ref<InstanceType<typeof infoReply>>();
  import type { IBoardItem, IBoardSearchData } from "@/types/board";
  import { ISearch } from "@/types/board";
  // 表格点击
  function propItemClick(item: IBoardItem) {
    InfoItemRef.value?.handleOpen(item);
  }
  const InfoTableRef = ref<InstanceType<typeof InfoTable>>();
  // 表格删除
  function propItemDelete() {
    if (InfoTableRef.value?.deleteData) {
      console.log(InfoTableRef.value?.deleteData);
      boardStore.removeFeedbackAction(InfoTableRef.value?.deleteData);
    }
  }
  // 回复点击

  function propReplyClick(id: number) {
    InfoReplyRef.value?.handleReply(id);
  }
  // 提交回复点击
  function submitReplyClick() {
    InfoItemRef.value?.getReplyData();
  }
  // 添加点击
  const InfoAddRef = ref<InstanceType<typeof InfoAdd>>();
  function propItemAdd() {
    InfoAddRef.value?.handleOpen(feedbackType.value);
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
