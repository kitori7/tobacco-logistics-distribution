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
        :class="{ vertical: true, active: currentIndex === 0 }"
        @click="routerChange('/board/info')"
        >异常信息</el-button
      >
      <el-button
        :class="{ vertical: true, active: currentIndex === 1 }"
        @click="routerChange('/board/analyze')"
        >异常分析</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TbSideDecoration from "@/components/TbSideDecoration/TbSideDecoration.vue";
  import { BorderBox9 } from "@dataview/datav-vue3";
  import { useRouter } from "vue-router";

  const router = useRouter();
  // 切换
  const currentIndex = ref<number>(0);
  function routerChange(route: string) {
    if (route === "/board/info") {
      currentIndex.value = 0;
    } else {
      currentIndex.value = 1;
    }
    router.push(route);
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
        padding: 15px 25px 0px 25px;
        margin-left: 50px;
      }
    }

    .btn-content {
      width: 20px;
      display: flex;
      flex-direction: column;
      .el-button + .el-button {
        margin-left: 0;
      }
    }
  }
</style>
