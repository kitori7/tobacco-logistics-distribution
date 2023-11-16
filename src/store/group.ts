import { defineStore } from "pinia";
import { userAdd, userAvatar } from "@/service/modules/group";
import type { IuserAdd } from "@/types/group";
export const useBoardStore = defineStore("group", () => {
  async function userAvatarAction(avatar: any) {
    const res = await userAvatar(avatar);
  }

  async function userAddAction(userAddData: IuserAdd) {
    const res = await userAdd(userAddData);
  }
  return{
    userAddAction,
    userAvatarAction
  }
});
