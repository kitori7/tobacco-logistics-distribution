<template>
  <div class="btn">
    <el-button type="primary" color="#73e5ff" :icon="icon" >
      {{addbtnText}}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
// @ts-ignore
  const props = defineProps({
    icon: {
      type: String,
      default: "Edit",
    },
    addbtnText: {
      type: String,
      default: "异常信息",
    },
  });
</script>
<style lang="scss" scoped></style>
