import { defineStore } from "pinia";
import type {
  IUserSearch,
  addUserForm,
  userAuthorityDataType,
} from "@/types/group";
import {
  postAddUser,
  setUserAuthority,
  getAllAuthority,
  userAvatar,
  getAllUser,
} from "@/service/modules/group";


export const useGroupStore = defineStore("group", () => {
  //添加用户
  async function postAddUserAction(userData: addUserForm) {
    const res = await postAddUser(userData);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
    return res;
  }
  //获取权限
  const AllAuthority = ref<any[]>();
  async function getAllAuthorityAction() {
    const res = await getAllAuthority();
    AllAuthority.value = res.data;
    console.log(AllAuthority.value);
  }
  //设置权限
  async function setUserAuthorityAction(authority: userAuthorityDataType) {
    const res = await setUserAuthority(authority);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
  }
  // 上传头像
  async function userAvatarAction(avatar: any) {
    const res = await userAvatar(avatar);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
    return res;
  }
  async function getAllUserAction(searchData: IUserSearch) {
    const res = await getAllUser(searchData);
    return res;
  }
  return {
    postAddUserAction,
    setUserAuthorityAction,
    getAllAuthorityAction,
    AllAuthority,
    userAvatarAction,
    getAllUserAction,
  };
});
