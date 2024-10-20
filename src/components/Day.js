import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  // 當過濾的事件或日期改變時，更新當天的事件
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  // 獲取當前日期的樣式（例如：是否為今天）
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {/* 顯示星期標題，僅在第一行顯示 */}
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        {/* 顯示日期 */}
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      {/* 顯示當天的所有事件 */}
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day); // 設定選中的日期
          setShowEventModal(true); // 顯示事件模態框
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)} // 設定選中的事件
            style={{
              backgroundColor: evt.label.includes("#") ? evt.label : undefined, // 如果標籤是自定義顏色，使用內聯樣式
            }}
            className={`p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate ${
              !evt.label.includes("#") ? `bg-${evt.label}-200` : "" // 如果標籤不是自定義顏色，使用 Tailwind 顏色類別
            }`}
          >
            {evt.title} {/* 顯示事件標題 */}
          </div>
        ))}
      </div>
    </div>
  );
}
