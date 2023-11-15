import requests from "../index";
import { addUserForm , userAuthorityDataType } from "@/types/group";
import { IRequest } from "../request/type";

// 添加用户接口
export function postAddUser(data: addUserForm) {
    return requests.post<IRequest<any>>({
        url: "/userservice/user/add",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data,
    });
}
//设置权限接口
export function setUserAuthority(authority: userAuthorityDataType) {
    return requests.post<IRequest<any>>({
        url: "/userservice/user/set",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data:authority,
    });
}