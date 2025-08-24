<template>
  <div>
    <h2>CSV 匯入</h2>
    <input type="file" accept=".csv" @change="onFileChange" />
    <button @click="importFile" :disabled="!file || isLoading">匯入</button>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="successMsg" class="success">{{ successMsg }}</div>
    <div v-if="isLoading">匯入中...</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCsvImportStore } from '../stores/csvImport'
import { storeToRefs } from 'pinia'

const store = useCsvImportStore()
const { isLoading, error, successMsg } = storeToRefs(store)
const file = ref(null)

function onFileChange(e) {
  file.value = e.target.files[0]
}

function importFile() {
  if (file.value) {
    store.importCsv(file.value)
  }
}
</script>

<style scoped>
.error {
  color: red;
  margin: 8px 0;
}
.success {
  color: green;
  margin: 8px 0;
}
</style>
