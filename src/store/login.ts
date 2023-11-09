import { defineStore } from "pinia";
import { getCaptcha, getCaptchaText, postLogin } from "@/service/modules/login";
import type { ILoginForm } from "@/pages/Login/types";
import { ILoginData } from "@/types/login";

export const useLoginStore = defineStore("login", () => {
  // 二维码模块
  const captcha = ref<string>();
  async function getCaptchaAction() {
    getCaptcha().then((res) => {
      const url = URL.createObjectURL(res);
      captcha.value = url;
      setTimeout(()=>{
        getCaptchaText().then((text) => {
          console.log(text);
        });
      },3000)
    });
  }
  // 登录模块
  const userInfo = ref<ILoginData>();
  const token = ref<string>();
  async function loginAction(data: ILoginForm) {
    const res = await postLogin(data);
    token.value = res.data.token;
    localStorage.setItem("token", token.value);
    userInfo.value = res.data;
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value?.user));
    localStorage.setItem(
      "operation",
      JSON.stringify(userInfo.value?.operation)
    );
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
