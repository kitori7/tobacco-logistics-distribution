<template>
  <div class="btn">
    <el-button type="primary" color="#73e5ff" :icon="icon" >
      {{content}}
    </el-button>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps({
    icon: {
      type: String,
      default: "Edit",
    },
    content: {
      type: String,
      default: "异常信息",
    },
  });
  props
</script>
<style lang="scss" scoped></style>
