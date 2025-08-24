import { defineStore } from 'pinia'
import api from '../utils/axios'

export interface CsvImportState {
  isLoading: boolean
  error: string | null
  successMsg: string | null
}

export const useCsvImportStore = defineStore('csvImport', {
  state: (): CsvImportState => ({
    isLoading: false,
    error: null,
    successMsg: null
  }),
  actions: {
    async importCsv(file: File) {
      this.isLoading = true
      this.error = null
      this.successMsg = null
      const formData = new FormData()
      formData.append('file', file)
      try {
  const res = await api.post('/api/MonthlyRevenue/import', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        if (res.data.isSuccess) {
          this.successMsg = res.data.msg || '匯入成功'
        } else {
          this.error = res.data.msg || '匯入失敗'
        }
      } catch (e: any) {
        this.error = e.message || 'API 錯誤'
      } finally {
        this.isLoading = false
      }
    }
  }
})
