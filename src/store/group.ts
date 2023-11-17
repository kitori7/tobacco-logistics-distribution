import { defineStore } from "pinia";
import type {
  addUserForm,
  userAuthorityDataType
} from "@/types/group";
import {
  postAddUser,
  setUserAuthority,
  getAllAuthority,
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
    //获取权限
    const AllAuthority = ref<any[]>()
    async function getAllAuthorityAction() {
        const res = await getAllAuthority();
        AllAuthority.value = res.data
        console.log(AllAuthority.value);
    }
    //设置权限
    async function setUserAuthorityAction(authority: userAuthorityDataType) {
        const res = await setUserAuthority(authority);
        if (res.code === 200) {
            ElMessage.success(res.msg);
        }
    }
    return {
        postAddUserAction,
        setUserAuthorityAction,
        getAllAuthorityAction,
        AllAuthority,
    };
});
