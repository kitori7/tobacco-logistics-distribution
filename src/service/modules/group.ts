import requests from "../index";
import { IUserSearch, IuserInfo, addUserForm, userAuthorityDataType } from "@/types/group";
import { IRequest } from "../request/type";

// 添加用户接口
export function postAddUser(userData: addUserForm) {
  return requests.post<IRequest<any>>({
    url: "/userservice/user/add",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: userData,
  });
}
//获取权限点列表接口
export function getAllAuthority() {
  return requests.get<IRequest<any>>({
    url: "/userservice/user/get/operations",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
//设置权限接口
export function setUserAuthority(authority: userAuthorityDataType) {
  return requests.post<IRequest<any>>({
    url: "/userservice/user/set",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: authority,
  });
}
// 上传头像
export function userAvatar(data: any) {
  return requests.post<IRequest<string>>({
    url: "/userservice/user/avatar",
    data,
  });
}
// 查询用户

export function getAllUser(searchData: IUserSearch) {
  return requests.get<IRequest<IuserInfo[]>>({
    url: "/userservice/user/search",
    params: searchData,
  });
}
