import requests from "../index";

import type { IBoardSearchData, IBoard, ICond } from "@/types/board";
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
