import { defineStore } from "pinia";
import { getCaptcha, postLogin } from "@/service/modules/login";
import type { ILoginForm } from "@/pages/Login/types";

export const useLoginStore = defineStore("login", () => {
  // 二维码模块
  const captcha = ref<string>();
  async function getCaptchaAction() {
    const res = await getCaptcha();
    const url = URL.createObjectURL(res);
    captcha.value = url;
  }
  // 登录模块
  const userInfo = ref();
  async function loginAction(data: ILoginForm) {
    const res = await postLogin(data);
    console.log(res);
  }

  return {
    // 二维码
    captcha,
    getCaptchaAction,
    // 登录
    loginAction,
    userInfo,
  };
});
