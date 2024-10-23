// src/components/Day.js
import dayjs from "dayjs"; // 引入 dayjs 來處理日期
import React, { useContext, useState, useEffect } from "react"; // 引入必要的 React 函數和 hooks
import GlobalContext from "../context/GlobalContext"; // 引入全局上下文，方便管理應用狀態

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]); // 用於儲存當天的事件
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext); // 使用全局上下文，獲取設定日期、顯示事件模態框等函數

  // 當過濾的事件或日期變更時，更新當天的事件
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events); // 設置當前日期的所有事件
  }, [filteredEvents, day]);

  // 獲取當前日期的樣式（例如：是否為今天）
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7" // 當前日期的特殊樣式
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 只在第一行顯示星期標題 */}
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()} {/* 顯示星期，例如 MON, TUE 等 */}
          </p>
        )}
        {/* 顯示日期數字 */}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format("DD")} {/* 顯示日期，例如 01, 02 等 */}
        </p>
      </header>
      {/* 顯示當天的所有事件 */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day); // 設定選中的日期，存儲於全局狀態中
          setShowEventModal(true); // 顯示事件模態框，讓使用者可以新增事件
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)} // 點擊事件以選中並編輯
            style={{
              backgroundColor: evt.label.includes("#") ? evt.label : undefined,
              // 如果標籤顏色是自定義的 HEX 值，則直接使用內聯樣式
            }}
            className={`p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${
              !evt.label.includes("#") ? `bg-${evt.label}-200` : ""
              // 如果標籤顏色不是自定義顏色，則使用 Tailwind 預設的背景顏色類別
            }`}
          >
            {evt.title} {/* 顯示事件標題 */}
          </div>
        ))}
      </div>
    </div>
  );
}
