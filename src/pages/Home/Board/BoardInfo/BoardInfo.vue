<template>
  <div class="BoardInfo">
    <info-search></info-search>
    <info-table class="info-table" @item-click="propItemClick"></info-table>
    <info-item ref="InfoItemRef"></info-item>
  </div>
</template>
<script lang="ts" setup>
  import InfoSearch from "./cpn/InfoSearch/InfoSearch.vue";
  import InfoTable from "./cpn/InfoTable/InfoTable.vue";
  import InfoItem from "./cpn/InfoItem/InfoItem.vue";

  const InfoItemRef = ref<InstanceType<typeof InfoItem>>()
  import type { User } from "./types";
  // 表格点击
  function propItemClick(rowIndex: number, item: User) {
    console.log(rowIndex, item);
    console.log({...InfoItemRef.value});
    InfoItemRef.value?.handleOpen(rowIndex, item)
  }
</script>
<style lang="scss" scoped>
.BoardInfo{
  .info-table{
    height: 58vh;
    overflow: auto;
  }
}
</style>
