import { defineStore } from "pinia";
import type{ 
    addUserRuleForm,
    userAuthorityDataType,
} from "@/types/group";
import {
    postAddUser,
    setUserAuthority,
} from "@/service/modules/group";

export const useGroupStore = defineStore("group", () => {

    //添加用户
    async function postAddUserAction(userData: addUserRuleForm) {
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
    return {
        postAddUserAction,
        setUserAuthorityAction,
    };
});