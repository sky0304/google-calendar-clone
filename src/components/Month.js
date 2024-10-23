// src/components/Month.js
import React from "react";
import Day from "./Day";

export default function Month({ month }) {
  // 當 `month` 尚未初始化或不是有效的陣列時，顯示 "Loading..." 提示
  if (!month || !Array.isArray(month) || month.length === 0) {
    return <div>Loading calendar data...</div>; // 當 `month` 未初始化時顯示載入提示
  }

  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {/* 使用網格布局來顯示整個月份，每一列代表一周中的一天 */}
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
            // 將每一天的資料傳遞給 `Day` 組件，並傳遞 `rowIdx` 以確定顯示的行數
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
