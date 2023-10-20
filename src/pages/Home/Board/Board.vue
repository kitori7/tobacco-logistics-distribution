<template>
  <div class="Board">
    <TbSideDecoration class="tb-side-decoration-components"></TbSideDecoration>
    <div class="board-right">
      <BorderBox9 :color="['#73e5ff', '#73e5ff']">
        <router-view></router-view>
      </BorderBox9>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import TbSideDecoration from "@/components/TbSideDecoration/TbSideDecoration.vue";
  import { BorderBox9 } from "@dataview/datav-vue3";
</script>
<style lang="scss" scoped>
  .Board {
    color: $processed;
    width: 100%;
    .tb-side-decoration-components {
      float: left;
    }
    .board-right {
      margin-left: 110px;
      width: 85%;
      height: 80vh;
      .dv-border-box-9 {
        box-sizing: border-box;
        padding: 15px 25px;
        margin-left: 50px;
      }
    }
  }
</style>
