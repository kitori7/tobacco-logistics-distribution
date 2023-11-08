import { defineStore } from "pinia";
import type { IBoardSearchData, IBoard } from "@/types/board";
import { getList } from "@/service/modules/board";
export const useBoardStore = defineStore("board", () => {
  // // ref变量 → state 属性
  // const count = ref(0);
  // // computed计算属性 → getters
  // const double = computed(() => {
  //   return count.value * 2;
  // });
  // // function函数 → actions
  // function increment() {
  //   count.value++;
  // }

  // return { count, double, increment };

  // 送货员token
  const token = ref(
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJMb2dpbk5hbWUiOiJ4aWFvbWluZyIsInBhc3N3b3JkIjoiMSIsInVzZXJOYW1lIjoieGlhb21pbmciLCJ1c2VySWQiOiIxIn0.Wc0srbcOSnVrid1NC29vJGf5GSS6ws7x5m7FIz6RgCM"
  );
  localStorage.setItem("token",token.value)

  // 客户专员token
  // const token = ref("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJMb2dpbk5hbWUiOiJ4aWFvd2FuZyIsInBhc3N3b3JkIjoiMiIsInVzZXJOYW1lIjoieGlhb3dhbmciLCJ1c2VySWQiOiIyIn0.zwhirBu0rT5ZCl3EmsfyaOj3A4J-W53QktcuVzOwSEE")

  // 列表数据
  const boardData = ref<IBoard>({
    currentPageNum: 1,
    dataCurrentPage: [],
    pageSize: 5,
    totalCount: 0,
    totalPageNum: 0,
  });
  async function getBoardData(data: IBoardSearchData) {
    const res = await getList(data);
    boardData.value = res.data;
  }
  return {
    // token,
    boardData,
    getBoardData,
  };
});
