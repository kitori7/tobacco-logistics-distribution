import { defineStore } from "pinia";
import type {
  addUserForm,
  userAuthorityDataType
} from "@/types/group";
import {
  postAddUser,
  setUserAuthority,
  userAvatar,
} from "@/service/modules/group";

export const useGroupStore = defineStore("group", () => {
  //添加用户
  async function postAddUserAction(userData: addUserForm) {
    const res = await postAddUser(userData);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }
  //设置权限
  async function setUserAuthorityAction(authority: userAuthorityDataType) {
    const res = await setUserAuthority(authority);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }
  async function userAvatarAction(avatar: any) {
    const res = await userAvatar(avatar);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }

 
  return {
    postAddUserAction,
    setUserAuthorityAction,
    userAvatarAction,
  };
});