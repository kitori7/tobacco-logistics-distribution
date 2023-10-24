<template>
  <div class="InfoItem">
    <el-dialog v-model="isOpen">{{ id }}</el-dialog>
  </div>
</template>
<script lang="ts" setup>
  import type { User } from "../../types";

  const isOpen = ref<boolean>(false);
  const id = ref<number>();
  function handleOpen(rowIndex: number, item: User) {
    isOpen.value = true;
    console.log(item);
    id.value = rowIndex;
  }

  defineExpose({
    handleOpen: handleOpen,
  });
</script>
<style lang="scss" scoped>
  .InfoItem {
    color: red;
  }
</style>
