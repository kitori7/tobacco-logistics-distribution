<template>
  <div class="home">
    <div class="main">
      <div class="title"></div>
      <div class="menu">
        <div
          v-for="(item, index) in MenuList"
          :class="{ active: activeMenu === index }"
          :key="index"
          @click="handleMenu(item.router,index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { MenuList } from "./config";
  import {useRouter} from 'vue-router';
  const router = useRouter()
  const activeMenu = ref<number>(0);
  function handleMenu(activeRouter: string,index: number) {
    activeMenu.value = index;
    router.push(activeRouter)
  }
</script>
<style lang="scss" scoped>
  .home {
    box-sizing: border-box;
    height: 100vh;
    width: 100vw;
    background: url("@/assets/images/background.png") center no-repeat;
    background-size: cover;
    padding: 5px 30px;
    display: flex;
    flex-direction: column;
    .main {
      display: flex;
      justify-content: space-between;
      .title {
        width: 472px;
        height: 100px;
        background: url("@/assets/images/title.png") center no-repeat;
        background-size: contain;
      }
      .menu {
        margin-left: 150px;
        display: flex;
        flex: 1;
        justify-content: space-around;
        align-items: center;
        height: 100px;
        div {
          padding: 0 15px;
          display: flex;
          align-items: center;
          height: 45px;
          font-size: 20px;
          cursor: pointer;
          transition: all .2s;
          &.active {
            background-color: #006a94;
            box-shadow:
              rgba(0, 0, 0, 0.25) 0px 14px 28px,
              rgba(0, 0, 0, 0.22) 0px 10px 10px;
          }
        }
      }
    }
    .content{
      flex: 1;
    }
  }
</style>
