<template>
  <div class="home">
    <div class="title"></div>
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
  .home {
    height: 100vh;
    width: 100vw;
    background: url("@/assets/images/background.png") center no-repeat;
    background-size: cover;
    .title {
      width: 472px;
      height: 80px;
      background: url("@/assets/images/title.png") center no-repeat;
      background-size: contain;
    }
  }
</style>
