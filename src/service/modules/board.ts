import requests from "../index";

import type {
  IBoardSearchData,
  IBoard,
  ICond,
  InfoDetail,
  IAddReply,
  IAddData,
} from "@/types/board";
import { IRequest } from "../request/type";

export function getList(params: IBoardSearchData) {
  return requests.get<IRequest<IBoard>>({
    url: "/guestbook/feedback/list",
    params,
  });
}

// 获取下拉框数据
export function getConditions() {
  return requests.get<IRequest<ICond>>({
    url: "/guestbook/feedback/getConditionsData",
  });
}

// 添加add
export function addFeedback(data: IAddData) {
  return requests.post<IRequest<any>>({
    url: "/guestbook/feedback/add",
    data,
  });
}
// 处理信息详情
export function getInfoDetail(id: number) {
  return requests.get<IRequest<InfoDetail[]>>({
    url: `/guestbook/feedback/details/${id}`,
  });
}
// 处理信息添加
export function postInfoAdd(addReply: IAddReply) {
  return requests.post<any>({
    url: "/guestbook/feedback/addReply",
    data: addReply,
  });
}
