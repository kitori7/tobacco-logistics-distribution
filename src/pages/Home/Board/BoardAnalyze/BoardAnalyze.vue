<template>
  <div class="BoardAnalyze">
    <AnalyzeSearch></AnalyzeSearch>
    <AnalyzeTable></AnalyzeTable>
  </div>
</template>
<script lang="ts" setup>
import AnalyzeSearch from './cpn/AnalyzeSearch/AnalyzeSearch.vue'
import AnalyzeTable from './cpn/AnalyzeTable/AnalyzeTable.vue'
</script>
<style lang="scss" scoped>
.BoardAnalyze {
  color:red
}
</style>