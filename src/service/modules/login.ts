import requests from "../index";
import { ILoginForm } from "@/pages/Login/types";
import { IRequest } from "../request/type";
import { ILoginData } from "@/types/login";
import Axios from "axios";
// 获取二维码
export function getCaptcha() {
  return Axios.get<Blob>(
    "http://172.16.0.166:8080/userservice/captcha/captcha",
    { responseType: "blob" }
  );
}
// 登录接口
export function postLogin(data: ILoginForm) {
  return requests.post<IRequest<ILoginData>>({
    url: "/userservice/user/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      captcha: data.captcha,
    },
    data,
  });
}
