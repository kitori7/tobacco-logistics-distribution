<template>
  <div class="Board">
    <tb-button content="添加异常信息"/>
    <tb-button content="批量删除" />
    <tb-table />
  </div>
</template>
<script lang="ts" setup>
  import TbTable from "@/components/TbTable/TbTable.vue";
  import TbButton from "@/components/TbButton/TbButton.vue";
</script>
<style lang="scss" scoped>
  .Board {
    width: 100%;
  }
</style>
