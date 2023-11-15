import requests from "../index";
import { addUserForm } from "@/types/group";
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