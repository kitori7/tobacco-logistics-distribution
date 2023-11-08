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
        >营销反馈</el-button
      >
      <el-button
        :class="{ vertical: true, active: currentIndex === 2 }"
        @click="routerChange('2')"
        >物流反馈</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TbSideDecoration from "@/components/TbSideDecoration/TbSideDecoration.vue";
  import { BorderBox9 } from "@dataview/datav-vue3";
  import { useRouter ,useRoute} from "vue-router";

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
