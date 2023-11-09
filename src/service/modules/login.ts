import requests from "../index";
import { ILoginForm } from "@/pages/Login/types";
import { IRequest } from "../request/type";
import { ILoginData } from "@/types/login";
// 获取二维码
export function getCaptcha() {
  return requests.get<Blob>({
    url: "/userservice/captcha/captcha",
    responseType: "blob",
  });
}
// 获取二维码文本
export function getCaptchaText() {
  return requests.get({
    url: "/userservice/captcha/get",
  });
}
export function postLogin(data: ILoginForm) {
  return requests.post<IRequest<ILoginData>>({
    url: "/userservice/user/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
}
