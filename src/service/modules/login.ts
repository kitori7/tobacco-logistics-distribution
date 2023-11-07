import requests from "../index";
import { ILoginForm } from "@/pages/Login/types";
// import { IRequest } from "../request/type";

export function getCaptcha() {
  return requests.get<Blob>({
    url: "/userservice/captcha/captcha",
    responseType: "blob",
  });
}

export function postLogin(data: ILoginForm) {
  return requests.post({
    url: "/userservice/user/login",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  });
}
