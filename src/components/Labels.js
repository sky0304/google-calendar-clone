import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked }) // 更新標籤的選擇狀態
            }
            style={{
              color: lbl.includes("#") ? lbl : undefined, // 如果標籤是自定義顏色，使用內聯樣式顯示顏色
            }}
            className={`form-checkbox h-5 w-5 rounded focus:ring-0 cursor-pointer ${
              !lbl.includes("#") ? `text-${lbl}-400` : "" // 如果標籤不是自定義顏色，使用 Tailwind 顏色類別
            }`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span> {/* 顯示標籤名稱 */}
        </label>
      ))}
    </React.Fragment>
  );
}
