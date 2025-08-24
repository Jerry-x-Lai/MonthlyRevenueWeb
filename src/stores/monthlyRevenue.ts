import { defineStore } from 'pinia'
import api from '../utils/axios'

export interface MonthlyRevenueItem {
    companyId: string
    companyName: string
    industryName: string
    dataYearMonth: string
    reportDate: string
    revenue: number
    lastMonthRevenue: number
    lastYearMonthRevenue: number
    moMChange: number
    yoYChange: number
    accRevenue: number
    lastYearAccRevenue: number
    accChange: number
    memo: string
}

export interface MonthlyRevenueState {
    data: MonthlyRevenueItem[]
    isLoading: boolean
    error: string | null
}

export const useMonthlyRevenueStore = defineStore('monthlyRevenue', {
    state: (): MonthlyRevenueState => ({
        data: [],
        isLoading: false,
        error: null
    }),
    actions: {
        async fetchMonthlyRevenue() {
            this.isLoading = true
            this.error = null
            try {
              const res = await api.get('/api/MonthlyRevenue')
                console.log("res", res);
                if (res.data.isSuccess) {
                    this.data = res.data.data
                } else {
                    this.error = res.data.msg || '查詢失敗'
                }
            } catch (e: any) {
                this.error = e.message || 'API 錯誤'
            } finally {
                this.isLoading = false
            }
        }
    }
})
