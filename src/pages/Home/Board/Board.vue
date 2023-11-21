<template>
  <div class="Board">
    <el-button class="vertical">班组信息</el-button>
    <TbSideDecoration class="tb-side-decoration-components"></TbSideDecoration>
    <div class="board-right">
      <BorderBox9 :color="['#73e5ff', '#73e5ff']">
        <router-view></router-view>
      </BorderBox9>
    </div>
    <div class="btn-content">
      <el-button
        :class="{ vertical: true, active: currentIndex === 1 }"
        @click="routerChange('1')"
        >物流反馈</el-button
      >
      <el-button
        :class="{ vertical: true, active: currentIndex === 2 }"
        @click="routerChange('2')"
        >营销反馈</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TbSideDecoration from "@/components/TbSideDecoration/TbSideDecoration.vue";
  import { BorderBox9 } from "@dataview/datav-vue3";
  import { useRouter, useRoute } from "vue-router";

  const router = useRouter();
  const route = useRoute();
  // 切换
  const currentIndex = ref<number>(Number(route.query.feedbackType));
  function routerChange(query: string) {
    router.push({ path: "/home/board/info", query: { feedbackType: query } });
    currentIndex.value = Number(query);
  }
</script>
<style lang="scss" scoped>
  .Board {
    box-sizing: border-box;
    display: flex;
    color: $processed;
    .tb-side-decoration-components {
      margin-left: 5px;
    }
    .board-right {
      .dv-border-box-9 {
        width: 85vw;
        box-sizing: border-box;
        padding: 1.5vh 2.5vw 0px 2.5vw;
        margin-left: 2.5vw;
      }
    }
    .btn-content {
      width: 20px;
      display: flex;
      flex-direction: column;

      .el-button {
        --el-color-primary: #73e1ff;
        --el-button-bg-color: #73e1ff;
        --el-button-border-color: #46899c;
        --el-button-text-color: rgb(0, 0, 51);
        --el-button-hover-bg-color: #041c3f;
        --el-button-hover-border-color: #1f3d45;
      }

      .el-button.active {
        color: var(--el-button-hover-text-color);
        border-color: var(--el-button-hover-border-color);
        background-color: var(--el-button-hover-bg-color);
        outline: none;
      }

      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
</style>
