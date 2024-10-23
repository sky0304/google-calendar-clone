// src/pages/Calendar.js
import React, { useContext, useState, useEffect } from "react"; // 引入必要的 React 函數和 hooks（useState、useEffect）
import CalendarHeader from "../components/CalendarHeader"; // 引入日曆標題組件
import Sidebar from "../components/Sidebar"; // 引入側邊欄組件
import Month from "../components/Month"; // 引入顯示月份的組件
import EventModal from "../components/EventModal"; // 引入事件模態框組件
import GlobalContext from "../context/GlobalContext"; // 引入全局上下文
import { getMonth } from "../util"; // 引入自定義函數 `getMonth`，用於獲取當前月份的日期矩陣

export default function Calendar() {
  const { showEventModal } = useContext(GlobalContext); // 使用 `useContext` 從全局上下文中獲取 `showEventModal`，用於控制是否顯示事件模態框
  const [currentMonth, setCurrentMonth] = useState([]); // 定義 `currentMonth` 狀態，初始值為空數組，存儲當前月份的日期矩陣

  useEffect(() => {
    // 使用 `useEffect` 在組件掛載時設置當前月份
    setCurrentMonth(getMonth()); // 調用 `getMonth` 函數獲取當前月份的日期矩陣，並設置為 `currentMonth` 的狀態
  }, []); // 空依賴數組表示這段代碼只在組件初次渲染後執行一次

  return (
    <div className="h-screen flex flex-col"> 
      {/* 整個頁面設置為一個垂直方向的 flex 布局，佔據全屏高度 */}
      <CalendarHeader /> 
      {/* 顯示日曆標題部分 */}
      <div className="flex flex-1"> 
        {/* 設置內部內容為水平方向的 flex 布局，並佔據剩餘空間 */}
        <Sidebar /> 
        {/* 顯示側邊欄，包括小日曆、添加事件按鈕等功能 */}
        <Month month={currentMonth} /> 
        {/* 將 `currentMonth` 作為 `month` 屬性傳遞給 `Month` 組件，用於顯示當前月份的日期矩陣 */}
      </div>
      {showEventModal && <EventModal />}
      {/* 如果 `showEventModal` 為 true，則顯示 `EventModal` 組件，用於添加或編輯事件 */}
    </div>
  );
}
