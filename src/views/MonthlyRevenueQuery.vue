
<template>
  <el-card class="revenue-query-card">
    <template #header>
      <div class="header-row">
        <span>每月營收查詢</span>
        <el-button type="primary" @click="fetchData" :loading="isLoading">查詢</el-button>
      </div>
    </template>

    <el-alert v-if="error" :title="error" type="error" show-icon class="mb-2" />

    <div class="mb-2" v-if="data.length">
      <el-select v-model="selectedCompany" placeholder="請選擇公司" clearable filterable style="width: 220px">
        <el-option
          v-for="item in companyOptions"
          :key="item.companyId"
          :label="item.companyName + ' (' + item.companyId + ')'"
          :value="item.companyId"
        />
      </el-select>
      <template v-if="selectedCompany">
        <el-tag class="ml-2">當月營收總和：{{ sumRevenue }}</el-tag>
        <el-tag class="ml-2">上月營收總和：{{ sumLastMonthRevenue }}</el-tag>
        <el-tag class="ml-2" type="success">相減：{{ sumRevenue - sumLastMonthRevenue }}</el-tag>
      </template>
    </div>

  <el-table v-if="data.length" :data="filteredData" border stripe style="width: 100%" height="800">
      <el-table-column prop="dataYearMonth" label="資料年月" width="110" />
      <el-table-column prop="companyId" label="公司代號" width="100" />
      <el-table-column prop="companyName" label="公司名稱" width="140" />
      <el-table-column prop="industryName" label="產業別" width="120" />
      <el-table-column prop="revenue" label="營業收入-當月營收" width="140" />
      <el-table-column prop="lastMonthRevenue" label="營業收入-上月營收" width="140" />
      <el-table-column prop="lastYearMonthRevenue" label="營業收入-去年當月營收" width="160" />
  <el-table-column prop="moMChange" label="營業收入-上月比較增減(%)" width="120" align="right" />
  <el-table-column prop="yoYChange" label="營業收入-去年同月增減(%)" width="120" align="right" />
      <el-table-column prop="accRevenue" label="累計營業收入-當月累計營收" width="170" />
      <el-table-column prop="lastYearAccRevenue" label="累計營業收入-去年累計營收" width="170" />
  <el-table-column prop="accChange" label="累計營業收入-前期比較增減(%)" width="120" align="right" />
  <el-table-column prop="memo" label="備註" width="200" show-overflow-tooltip />
    </el-table>
    <el-empty v-else-if="!isLoading" description="無資料" />
    <el-skeleton v-if="isLoading" :rows="5" animated />
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMonthlyRevenueStore } from '../stores/monthlyRevenue'
import { storeToRefs } from 'pinia'
import { ElCard, ElButton, ElTable, ElTableColumn, ElAlert, ElEmpty, ElSkeleton, ElSelect, ElOption, ElTag } from 'element-plus'

const store = useMonthlyRevenueStore()
const { data, isLoading, error } = storeToRefs(store)

const selectedCompany = ref<string | null>(null)

const companyOptions = computed(() => {
  // 依公司代號唯一
  const map = new Map<string, { companyId: string, companyName: string }>()
  data.value.forEach(item => {
    if (!map.has(item.companyId)) {
      map.set(item.companyId, { companyId: item.companyId, companyName: item.companyName })
    }
  })
  return Array.from(map.values())
})

const filteredData = computed(() => {
  if (!selectedCompany.value) return data.value
  return data.value.filter(item => item.companyId === selectedCompany.value)
})

const sumRevenue = computed(() => {
  return filteredData.value.reduce((sum, item) => sum + (item.revenue || 0), 0)
})
const sumLastMonthRevenue = computed(() => {
  return filteredData.value.reduce((sum, item) => sum + (item.lastMonthRevenue || 0), 0)
})

function fetchData() {
  store.fetchMonthlyRevenue()
}
</script>

table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid #ccc;
  padding: 4px 8px;
  text-align: center;
}
.error {
  color: red;
  margin: 8px 0;
}
<style scoped>
.revenue-query-card {
  max-width: 100vw;
  margin: 32px auto;
}
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mb-2 {
  margin-bottom: 16px;
}
.ml-2 {
  margin-left: 8px;
}
</style>
