import { defineStore } from "pinia";
import type {
  IUserSearch,
  addUserForm,
  IUserAuthorityDataType,
  IAllOperations,
  IOperations,
  IRole,
  IUserInfo,
} from "@/types/group";
import {
  postAddUser,
  setUserAuthority,
  getAllAuthority,
  userAvatar,
  getAllUser,
  getRoles,
  getRoleOperations,
  getEditUserInfo,
  updateUserInfo,
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
  const AllAuthority = ref<IAllOperations[]>([]);
  async function getAllAuthorityAction() {
    const res = await getAllAuthority();
    AllAuthority.value = res.data;
  }
  // 获取角色列表
  const roles = ref<IRole[]>([]);
  async function getRoleAction() {
    const res = await getRoles();
    roles.value = res.data;
  }
  //设置权限
  async function setUserAuthorityAction(authority: IUserAuthorityDataType) {
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

  // 获取角色已有权限
  const roleAuthority = ref<IOperations[]>([]);
  async function getRoleOperationsAction(role_id: number) {
    const res = await getRoleOperations(role_id);
    roleAuthority.value = res.data;
  }

  //获取编辑用户信息
  const editUserInfo = ref<IUserInfo[]>([]);
  async function getEditUserInfoAction(work_number: string) {
    const res = await getEditUserInfo(work_number);
    editUserInfo.value = res.data;
  }
  //修改用户信息
  async function updateUserInfoAction(data: IUserInfo) {
    const res = await updateUserInfo(data);
    if (res.code === 200) {
      ElMessage.success(res.msg);
    }
    return res;
  }

  return {
    postAddUserAction,
    setUserAuthorityAction,
    roles,
    getAllAuthorityAction,
    getRoleAction,
    AllAuthority,
    userAvatarAction,
    getAllUserAction,
    roleAuthority,
    getRoleOperationsAction,
    editUserInfo,
    getEditUserInfoAction,
    updateUserInfoAction,
  };
});
