<template>
  <div class="BoardInfo">
    <info-search @item-add="propItemAdd"></info-search>
    <info-table class="info-table" @item-click="propItemClick"></info-table>
    <info-item ref="InfoItemRef"></info-item>
    <InfoAdd ref="InfoAddRef"></InfoAdd>
  </div>
</template>
<script lang="ts" setup>
  import InfoSearch from "./cpn/InfoSearch/InfoSearch.vue";
  import InfoTable from "./cpn/InfoTable/InfoTable.vue";
  import InfoItem from "./cpn/InfoItem/InfoItem.vue";
  import InfoAdd from "./cpn/InfoAdd/InfoAdd.vue";

  const InfoItemRef = ref<InstanceType<typeof InfoItem>>()
  import type { User } from "./types";
  // 表格点击
  function propItemClick(rowIndex: number, item: User) {
    console.log(rowIndex, item);
    console.log({...InfoItemRef.value});
    InfoItemRef.value?.handleOpen(rowIndex, item)
  }

  // 添加点击
  const InfoAddRef = ref<InstanceType<typeof InfoAdd>>()
  function propItemAdd(){
    InfoAddRef.value?.handleOpen()
  }
</script>
<style lang="scss" scoped>
.BoardInfo{
  display: flex;
  flex-direction: column;
}
</style>
