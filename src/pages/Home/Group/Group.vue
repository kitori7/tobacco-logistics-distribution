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
            <el-input v-model="searchCond.user_name"></el-input>
          </el-form-item>
          <el-form-item label="工号">
            <el-input v-model="searchCond.work_number"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="searchCond.position"></el-select>
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
      <div class="useInfoItem" v-for="item in info">
        <div class="usePhoto">
          <el-button class="groupInfoItemButton" :icon="EditPen"></el-button>
        </div>
        <div>{{ item.name }}</div>
        <div>{{ item.position }}</div>
        <div>工号：{{ item.jobNumber }}</div>
      </div>
    </div>
    <div class="groupDialog">
      <GroupSetting
        :groupSetting="groupSettingOpenf"
        ref="groupSettingOpenf"
      ></GroupSetting>
      <GroupAdd :groupAdd="groupAddf" ref="groupAddf"></GroupAdd>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import GroupSetting from "./GroupSetting/GroupSetting.vue";
  import GroupAdd from "./GroupAdd/GroupAdd.vue";
  import { Plus, Search, Tools, EditPen } from "@element-plus/icons-vue";
  import { useGroupStore } from "@/store/group";
  const groupStore = useGroupStore();
  const searchCond = reactive({
    position: "",
    user_name: "",
    work_number: "",
  });
  console.log(groupStore.getAllUserAction);

  interface useInfo {
    name: string;
    position: string;
    jobNumber: number;
  }
  const info: useInfo[] = [
    {
      name: "张三",
      position: "职位一",
      jobNumber: 12399,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
    {
      name: "张四",
      position: "职位二",
      jobNumber: 45699,
    },
  ];
  const groupSettingOpenf = ref();
  const groupAddf = ref();

  const openGroupAdd = () => {
    groupAddf.value.groupAddOpen = true;
  };
  const openGroupSetting = () => {
    groupSettingOpenf.value.groupSettingOpen = true;
  };
  function searchUser() {
    console.log(searchCond);

    groupStore.getAllUserAction(searchCond);
  }
</script>
<style lang="scss" scoped>
  .Group {
    height: 76vh;
    padding: 0 10px;
    display: flex;
    .groupControl {
      position: fixed;
      margin-left: 30px;
      display: flex;
      height: 50px;

      .groupSearch {
        flex: 12;
        border: 2px solid #73e1ff;
        .el-form-item {
          width: 25%;
        }
      }
      .groupSearchButton {
        height: 100%;
        width: 50px;
        border-radius: 0%;
      }
      .groupSet,
      .groupAdd {
        margin: 0 20px 0 50px;
        flex: 1;
        height: 100%;
        text-align: center;
        border: 2px solid #73e1ff;
      }
      .groupAdd {
        margin: 0 50px;
        flex: 1;
      }
    }
    .useInfo::-webkit-scrollbar {
      display: none;
    }
    .useInfo {
      position: relative;
      border: 1px solid #73e1ff;
      top: 12%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-x: hidden;
      overflow-y: auto;
      .useInfoItem {
        margin: 2vh 1vw;
        width: 190px;
        text-align: center;
        line-height: 23px;
        .usePhoto {
          width: 190px;
          height: 250px;
          border: 2px solid #73e1ff;
          position: relative;
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
