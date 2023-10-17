<template>
  <div class="Board">
    <btn addbtnText="添加异常信息" icon="" />

    <btn addbtnText="批量删除" icon="" />

    <UserTable/>
  </div>
</template>
<script lang="ts" setup>
import UserTable from '@/components/UserTable.vue';
import btn from '@/components/btn.vue';
</script>
<style lang="scss" scoped>
.Board {
  width: 100%;
}
</style>