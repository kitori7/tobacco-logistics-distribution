<template>
  <div class="Group">
    <div class="groupControl">
      <div class="groupSearch">
        <el-form
          :inline="true"
          style="height: 100%; margin-top: 7px"
          v-model="searchCond"
        >
          <el-form-item label="姓名" label-width="60">
            <el-input
              v-model="searchCond.userName"
              placeholder="点击输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="工号" label-width="70">
            <el-input
              v-model="searchCond.workNumber"
              placeholder="点击输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="部门" label-width="70">
            <el-select v-model="searchCond.department">
              <el-option label="全部" value=""></el-option>
              <el-option
                v-for="item in groupList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option
            ></el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-button
        class="groupSearchButton"
        :icon="Search"
        @click="searchUser"
      ></el-button>
      <el-button class="groupSet" :icon="Tools" @click="openGroupSetting"
        >设置权限</el-button
      >
      <el-button class="groupAdd" :icon="Plus" @click="openGroupAdd"
        >添加用户</el-button
      >
    </div>
    <div class="useInfo">
      <div class="useInfoItem" v-for="item in userInfo">
        <div class="usePhoto">
          <img :src="item.avatar_path" alt="" />
          <el-button class="groupInfoItemButton" :icon="EditPen"></el-button>
        </div>
        <div>{{ item.user_name }}</div>
        <div>{{ item.position }}</div>
        <div>工号：{{ item.work_number }}</div>
      </div>
    </div>
    <div class="groupDialog">
      <GroupSetting
        :groupSetting="groupSettingOpenf"
        ref="groupSettingOpenf"
      ></GroupSetting>
      <GroupAdd
        :groupAdd="groupAddf"
        ref="groupAddf"
        @renew-user="searchUser"
      ></GroupAdd>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import GroupSetting from "./GroupSetting/GroupSetting.vue";
  import GroupAdd from "./GroupAdd/GroupAdd.vue";
  import { Plus, Search, Tools, EditPen } from "@element-plus/icons-vue";
  import { useGroupStore } from "@/store/group";
  import type { IuserInfo } from "@/types/group";
  const groupStore = useGroupStore();
  const searchCond = reactive({
    department: "",
    userName: "",
    workNumber: "",
  });
  const groupList = [
    "班组一",
    "班组二",
    "班组三",
    "班组四",
    "班组五",
    "班组六",
    "营销部",
  ];

  const userInfo = ref<IuserInfo[]>();
  groupStore.getAllUserAction({}).then((res) => {
    userInfo.value = res.data.map((i: IuserInfo) => {
      i.avatar_path = "http://172.16.0.166:8080/file" + i.avatar_path;
      return i;
    });
  });

  const groupSettingOpenf = ref();
  const groupAddf = ref();

  const openGroupAdd = () => {
    groupAddf.value.groupAddOpen = true;
  };
  const openGroupSetting = () => {
    groupSettingOpenf.value.groupSettingOpen = true;
  };
  function searchUser() {
    groupStore.getAllUserAction({ ...searchCond }).then((res) => {
      userInfo.value = res.data.map((i: IuserInfo) => {
        i.avatar_path = "http://172.16.0.166:8080/file" + i.avatar_path;
        return i;
      });
    });
  }
</script>
<style lang="scss" scoped>
  .Group {
    height: 76vh;
    margin: 0 3vw;
    padding: 0 2vw;
    display: flex;
    .groupControl {
      position: fixed;
      display: flex;
      height: 50px;
      width: 100%;
      .groupSearch {
        border: 2px solid #73e1ff;
      }
      .groupSearchButton {
        height: 100%;
        width: 50px;
        border-radius: 0%;
      }
      .groupSet,
      .groupAdd {
        margin: 0 0 0 40px;
        height: 100%;
        text-align: center;
        border: 2px solid #73e1ff;
      }
    }
    .useInfo::-webkit-scrollbar {
      display: none;
    }
    .useInfo {
      width: 100%;
      padding: 1vw;
      position: relative;
      top: 12%;
      border: 1px solid #73e1ff;
      display: flex;
      flex-wrap: wrap;
      overflow-x: hidden;
      overflow-y: auto;
      .useInfoItem {
        margin: 20px 30px;
        width: 190px;
        text-align: center;
        line-height: 23px;
        .usePhoto {
          width: 190px;
          height: 250px;
          border: 2px solid #73e1ff;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .groupInfoItemButton {
            position: absolute;
            bottom: -2px;
            right: -2px;
            border-radius: 0%;
          }
        }
      }
    }
  }
</style>
