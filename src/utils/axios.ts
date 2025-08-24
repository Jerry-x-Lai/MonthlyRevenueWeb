import axios from 'axios'

console.log('API baseURL:', import.meta.env.VITE_API_BASE_URL)

// 根據 Vite 環境變數自動設定 baseURL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000
})

// 請求攔截器
api.interceptors.request.use(
  config => {
    // 這裡可加入 token 或自訂 header
    // config.headers['Authorization'] = 'Bearer ...'
    return config
  },
  error => Promise.reject(error)
)

// 回應攔截器
api.interceptors.response.use(
  response => {
    // 可統一處理回應資料
    return response
  },
  error => {
    // 可統一處理錯誤
    // 例如：顯示錯誤訊息、跳轉登入頁等
    return Promise.reject(error)
  }
)

export default api
