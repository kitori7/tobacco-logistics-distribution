import { defineStore } from "pinia";
import type { IBoardSearchData, IBoard ,InfoDetail,ICond,IaddReply} from "@/types/board";
import {
  getConditions,
  getList,
  getInfoDetail,
  postInfoAdd,
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
  // 处理详情数据
  const detail = ref<InfoDetail[]>()
  async function getDetailData(id: number) {
    const res = await getInfoDetail(id);
    console.log(id);
    detail.value = res.data 
  }
  // 处理信息添加
  async function postInfoAddAction(addReply:IaddReply) {
    const res = await postInfoAdd(addReply);
    console.log(res);
    console.log(addReply);
    
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
    // 处理详情数据
    detail,
    getDetailData,
    postInfoAddAction,
  };
});
