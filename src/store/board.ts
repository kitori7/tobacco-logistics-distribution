import { defineStore } from "pinia";
import type {
  IBoardSearchData,
  IBoard,
  IAddData,
  InfoDetail,
  ICond,
} from "@/types/board";
import {
  addFeedback,
  getConditions,
  getList,
  getInfoDetail,
  postInfoAdd,
  removeFeedback,
} from "@/service/modules/board";

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

  // 添加异常信息
  async function addFeedbackAction(data: IAddData) {
    const res = await addFeedback(data);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }
  // 删除异常信息
  async function removeFeedbackAction(ids: string) {
    const res = await removeFeedback(ids);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }
  // 处理详情数据
  const detail = ref<InfoDetail[]>();
  async function getDetailData(id: number) {
    const res = await getInfoDetail(id);
    console.log(id);
    detail.value = res.data;
  }
  // 处理信息添加
  const addState = ref<number>(1);
  async function postInfoAddAction(addReply: any) {
    const res = await postInfoAdd(addReply);
    console.log(res);
    console.log(addReply);
    addState.value = res.code;
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
    // 删除反馈
    removeFeedbackAction,
    // 处理详情数据
    detail,
    getDetailData,
    addState,
    postInfoAddAction,
  };
});
