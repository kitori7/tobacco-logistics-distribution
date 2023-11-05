import requests from "../index";

import type { IBoardSearchData, IBoard } from "@/types/board";
import { IRequest } from "../request/type";

export function getList(params: IBoardSearchData) {
  return requests.get<IRequest<IBoard>>({
    url: "/guestbook/feedback/list",
    params,
  });
}
