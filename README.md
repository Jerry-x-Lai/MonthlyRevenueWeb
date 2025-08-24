
# MonthlyRevenueWeb

## 技術棧
- Vue 3 (Composition API)
- Vite
- TypeScript
- Pinia (狀態管理)
- Element Plus (UI 美化)
- Axios (API 請求)

## 啟動方式
```bash
pnpm install
pnpm run dev
```
預設會載入 `.env.dev`，API baseURL 為 `http://localhost:5242/`

## 環境變數
- `.env.dev`：本機開發
- `.env.stage`：測試環境
- `.env.production`：正式環境

## 主要功能
- 每月營收查詢（API: `/api/MonthlyRevenue`）
- CSV 匯入（API: `/api/MonthlyRevenue/import`）
- 查詢結果以 Element Plus Table 呈現，支援公司下拉選單、營收加總與差異計算

## UI 框架
- 全站採用 Element Plus，表格、按鈕、下拉、提示等皆已美化

