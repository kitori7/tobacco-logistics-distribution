<template>
    <div class="AnalyzeTable">
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        size="small"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="selection" />
        <el-table-column type="index" label="序号" />
        <el-table-column prop="domain" label="配送域" width="180" />
        <el-table-column prop="line" label="线路名称" width="180" />
        <el-table-column prop="deliverer" label="送货员" width="60" />
        <el-table-column prop="client" label="客户专员" width="65" />
        <el-table-column prop="encode" label="客户编码" width="65" />
        <el-table-column prop="customer" label="客户名称" width="75" />
        <el-table-column prop="address" label="客户地址" />
        <el-table-column prop="info" label="异常信息反馈" />
      </el-table>
      <el-pagination layout="prev, pager, next" :total="80" />
    </div>
  </template>
  <script lang="ts" setup>
    import type { User } from "./types";
    const tableRowClassName = ({ rowIndex }: { row: User; rowIndex: number }) => {
      if (rowIndex % 2 == 1) {
        return "odd";
      } else if (rowIndex % 2 == 0) {
        return "even";
      }
      return "";
    };
  
    const tableData: User[] = [
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
      {
        domain: "某配送域",
        line: "某路线",
        deliverer: "送货甲",
        client: "专员甲",
        encode: 12345,
        customer: "客户甲",
        address: "某地址",
        info: "没开门",
      },
    ];
  </script>
  <style lang="scss" scoped>
    .AnalyzeTable {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
  </style>
  