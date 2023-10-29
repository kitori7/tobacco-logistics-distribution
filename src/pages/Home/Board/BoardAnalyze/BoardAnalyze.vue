<template>
  <div class="BoardAnalyze">
    <AnalyzeSearch></AnalyzeSearch>
    <AnalyzeTable class="analyze-table"></AnalyzeTable>
  </div>
</template>
<script lang="ts" setup>
import AnalyzeSearch from './cpn/AnalyzeSearch/AnalyzeSearch.vue'
import AnalyzeTable from './cpn/AnalyzeTable/AnalyzeTable.vue'
</script>
<style lang="scss" scoped>
.BoardAnalyze {
  .analyze-table{
    height: 64vh;
    overflow: auto;
  }
}
</style>