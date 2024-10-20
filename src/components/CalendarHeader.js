import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import logo from "../assets/logo.png"; // logo圖標
import GlobalContext from "../context/GlobalContext";
import SidebarDrawer from "./SidebarDrawer"; // 引入側邊欄組件

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 控制側邊欄的顯示狀態

  // 處理上個月的按鈕點擊
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  // 處理下個月的按鈕點擊
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  // 重設到當前月份
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month()
    );
  }

  // 切換側邊欄顯示狀態
  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
      {/* Logo 加上 onClick 來顯示或隱藏側邊欄 */}
      <img
        src={logo}
        alt="calendar"
        className="mr-2 w-12 h-12 cursor-pointer"
        onClick={toggleSidebar}
      />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">一本萬曆</h1>
      <button
  onClick={handleReset}
  className="border border-black rounded py-2 px-4 mr-5"
>
  Today
</button>

      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>

      {/* 側邊欄 */}
      <SidebarDrawer isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </header>
  );
}
