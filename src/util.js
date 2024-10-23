// src/util.js
import dayjs from "dayjs"; // 引入 dayjs 庫，用於處理日期和時間

// 定義 `getMonth` 函數，接受一個參數 `month`，默認為當前月份
export function getMonth(month = dayjs().month()) {
  month = Math.floor(month); // 確保 `month` 為整數（去除小數部分）
  const year = dayjs().year(); // 獲取當前年份
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day(); 
  // 獲取當前月份的第一天是星期幾，返回 0（週日）到 6（週六）之間的值

  let currentMonthCount = 0 - firstDayOfTheMonth; 
  // 計算當前月份的日期偏移量，讓行事曆能顯示上個月的幾天
  
  // 創建一個包含 5 行的陣列，每行包含 7 天（每週），這樣能確保完整顯示一個月
  const daysMatrix = new Array(5).fill([]).map(() => {
    // 每一行包含 7 天的日期，使用內部 `.map()` 來生成這些天
    return new Array(7).fill(null).map(() => {
      currentMonthCount++; // 增加計數器，從第一天開始計算每一天
      return dayjs(new Date(year, month, currentMonthCount)); 
      // 返回當前計數器對應的日期，這樣包括了當前月、上個月和下個月的日期
    });
  });

  return daysMatrix; // 返回一個 5x7 的日期矩陣，每個元素是一個 `dayjs` 對象
}
