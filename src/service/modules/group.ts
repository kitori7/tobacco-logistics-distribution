import requests from "../index";
import { IRequest } from "../request/type";
import type { IuserAdd } from "@/types/group";
export function userAvatar(data:any) {
  return requests.post<IRequest<any>>({
    url: "/userservice/user/avatar",
    data,
  });
}
export function userAdd(data:IuserAdd) {
  return requests.post<IRequest<any>>({
    url: "/userservice/user/add",
    data,
  });
}
