# React Calendar Component
這是一個基於React和Redux的日曆元件，支援單日或範圍選擇，該元件適用於需要日期選擇功能的應用程式，例如行程規劃、預約系統等。
## 功能
- **月份切換**：
  - 透過左右箭頭按鈕切換上個月或下個月。
- **日期選擇**：
  - 支援選擇單一日期作為起始日期。
  - 支援選擇日期範圍（起始日期與結束日期）。
- **狀態管理**：
  - 使用Redux管理日曆的狀態（當前月份、年份、選擇的日期）。
- **動態日期渲染**：
  - 自動計算每個月天數。
  - 顯示上個月和下個月的補充日期（灰色顯示）。
- **樣式**：
  - 當前日期（黃色顯示）。
  - 選擇的日期及範圍內的日期（藍色顯示）。
- **效能優化**：
  - 使用 `useMemo` 與 `useCallback` 避免不必要的重新渲染。
## 依賴
- **React**: `^18.0.0` 或更高版本
- **Redux**: 用於狀態管理
- **react-redux**: 用於連接React與Redux
- **lucide-react**: 提供箭頭圖標（`ChevronLeft` 和 `ChevronRight`）
- **Styled-components**: 用於樣式化
- **Vite**: 作為建構工具，快速開發與打包專案
- **TypeScript**: 提供靜態類型檢查，增強程式碼可靠性
## 安裝與設定
1. 使用 Vite 初始化專案（若尚未建立專案）：
```bash!
npm create vite@latest my-app --template react
cd my-app
npm install
```
2. 安裝 `Styled-Components` 、 `Redux` 、 `Lucide`
```bash!
npm install styled-components
npm install @reduxjs/toolkit react-redux
npm install lucide-react
```
## 運行專案
- 使用 `Vite` 啟動開發伺服器：
```bash!
npm run dev
```
- 打包生產版本：
```bash!
npm run build
```
- 打包預覽：
```bash!
npm run perview
```
## 元件邏輯說明
- 日期計算：
    - 使用 useMemo 計算當前月份天數 (daysInMonth) 和第一天的星期索引 (firstDayIndex)。計算上個月和下個月需顯示的日期，並根據總格子數（35 或 42）填充。
- 日期選擇邏輯：
    - 點擊日期時，若尚未選擇起始日期，則設為 selectedStartDate。
    - 若已有起始日期，且新選擇的日期晚於或等於起始日期，則設為 selectedEndDate。
    - 若新選擇的日期早於起始日期，則重設起始日期並清除結束日期。
- 樣式狀態：
    - isToday: 當前日期（與系統日期相同）。
    - isActive: 已選擇的起始日期。
    - isInRange: 在選擇範圍內的日期。
    - isNonCurrentMonth: 上個月或下個月的日期（灰色顯示）。
## 注意事項
- 時區問題：日期使用 `JavaScript` 的 `Date` 物件，可能受系統時區影響，建議標準化處理。
國際化：目前顯示為中文（例如「年」、「月」、「日」），如需多語言支援，需自行擴展。
## 未來改進建議
- 添加年份選擇下拉選單。
- 支援多語言顯示（例如英文、其他語言的月份名稱）。
- 提供清除已選日期範圍的按鈕。