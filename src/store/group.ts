import { defineStore } from "pinia";
import type{ 
    addUserForm 
} from "@/types/group";
import {
    postAddUser
} from "@/service/modules/group";

export const useGroupStore = defineStore("group", () => {

    //添加用户
    async function postAddUserAction(data: addUserForm) {
        const res = await postAddUser(data);
        if (res.code === 200) {
            ElMessage.success(res.msg);
        }
    }
        return {
            postAddUserAction
    };
});