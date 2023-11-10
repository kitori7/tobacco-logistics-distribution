import { defineStore } from "pinia";
import type { IBoardSearchData, IBoard, IAddData } from "@/types/board";
import { addFeedback, getConditions, getList } from "@/service/modules/board";
import { ICond } from "../types/board";
export const useBoardStore = defineStore("board", () => {
  // 加载中
  const loading = ref<boolean>(false);
  // 列表数据
  const boardData = ref<IBoard>({
    currentPageNum: 1,
    dataCurrentPage: [],
    pageSize: 5,
    totalCount: 0,
    totalPageNum: 0,
  });
  async function getBoardData(data: IBoardSearchData) {
    loading.value = true;
    const res = await getList(data);
    boardData.value = res.data;
    loading.value = false;
  }

  //下拉框数据
  const cond = ref<ICond>();
  async function getCondAction() {
    loading.value = true;
    const res = await getConditions();
    cond.value = res.data;
    loading.value = false;
  }

  // 添加数据
  async function addFeedbackAction(data: IAddData) {
    const res = await addFeedback(data);
    console.log(res);
  }
  return {
    // 加载中
    loading,
    // 列表数据
    boardData,
    getBoardData,
    // 下拉框数据
    cond,
    getCondAction,
    // 添加反馈
    addFeedbackAction,
  };
});
