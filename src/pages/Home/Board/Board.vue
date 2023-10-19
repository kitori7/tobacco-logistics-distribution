<template>
  <div class="Board">
    <TbSideDecoration class="tb-side-decoration-components"></TbSideDecoration>
    <div class="board-right">
      <BorderBox9 :color="['#73e5ff','#73e5ff']" >
      <tb-button content="添加异常信息"/>
      <tb-button content="批量删除" />
      <tb-table />
    </BorderBox9>
    </div>
  
  </div>
</template>
<script lang="ts" setup>
  import TbTable from "@/components/TbTable/TbTable.vue";
  import TbButton from "@/components/TbButton/TbButton.vue";
  import TbSideDecoration from "@/components/TbSideDecoration/TbSideDecoration.vue"
  import { BorderBox9 } from '@dataview/datav-vue3';


</script>
<style lang="scss" scoped>
  .Board {
    width: 100%;
    .tb-side-decoration-components{
      float: left;
    }
    .board-right{
      margin-left: 110px;
      width: 85%;
      height: 80vh;
      .dv-border-box-9 {
      margin-left: 50px;
  }
    }
  }

</style>
