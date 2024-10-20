import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { FaStar } from "react-icons/fa";
import { ChromePicker } from "react-color"; // 引入顏色選擇器

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  // 從 localStorage 中獲取自定義顏色
  const [customLabels, setCustomLabels] = useState(() => {
    const savedCustomLabels = localStorage.getItem("customLabels");
    return savedCustomLabels ? JSON.parse(savedCustomLabels) : [];
  });

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  const [priority, setPriority] = useState(selectedEvent ? selectedEvent.priority : 1);
  const [startTime, setStartTime] = useState(selectedEvent ? selectedEvent.startTime : "");
  const [endTime, setEndTime] = useState(selectedEvent ? selectedEvent.endTime : "");
  const [customColor, setCustomColor] = useState(""); // 自定義顏色
  const [showColorPicker, setShowColorPicker] = useState(false); // 是否顯示顏色選擇器

  function handleStarClick(value) {
    setPriority(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      priority,
      startTime,
      endTime,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent }); // 更新現有事件
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent }); // 新增新事件
    }

    setShowEventModal(false); // 關閉模態框
  }

  function handleAddCustomColor() {
    if (customColor) {
      setCustomLabels((prevLabels) => {
        const updatedLabels = [...prevLabels, customColor];
        localStorage.setItem("customLabels", JSON.stringify(updatedLabels)); // 更新 localStorage
        return updatedLabels;
      });
      setSelectedLabel(customColor);
      setCustomColor("");
      setShowColorPicker(false);
    }
  }

  function handleDeleteCustomColor(color) {
    setCustomLabels((prevLabels) => {
      const updatedLabels = prevLabels.filter((lbl) => lbl !== color);
      localStorage.setItem("customLabels", JSON.stringify(updatedLabels)); // 更新 localStorage
      return updatedLabels;
    });
    if (selectedLabel === color) {
      setSelectedLabel(labelsClasses[0]); // 刪除後將選中標籤設置為默認顏色
    }
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">drag_handle</span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false); // 刪除事件並關閉模態框
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">close</span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            {/* 標題輸入框 */}
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">schedule</span>
            {/* 顯示選擇的日期 */}
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">access_time</span>
            {/* 開始時間輸入框 */}
            <div className="flex gap-x-2 items-center">
              <label htmlFor="startTime" className="text-gray-600">Start Time:</label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>
            <span className="material-icons-outlined text-gray-400">access_time</span>
            {/* 結束時間輸入框 */}
            <div className="flex gap-x-2 items-center">
              <label htmlFor="endTime" className="text-gray-600">End Time:</label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              />
            </div>
            <span className="material-icons-outlined text-gray-400">segment</span>
            {/* 描述輸入框 */}
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">priority_high</span>
            {/* 緊急程度選擇（星星） */}
            <div className="flex items-center gap-x-2">
              <label htmlFor="priority" className="text-gray-600">Priority:</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <FaStar
                    key={value}
                    size={24}
                    color={value <= priority ? "#f39c12" : "#e4e5e9"}
                    className="cursor-pointer"
                    onClick={() => handleStarClick(value)}
                  />
                ))}
              </div>
            </div>
            <span className="material-icons-outlined text-gray-400">bookmark_border</span>
            {/* 標籤選擇和刪除按鈕 */}
            <div className="flex gap-x-2 mb-4">
              {labelsClasses.map((lblClass, i) => (
                <div key={i} className="flex items-center">
                  <span
                    onClick={() => setSelectedLabel(lblClass)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer bg-${lblClass}-500`}
                  >
                    {selectedLabel === lblClass && (
                      <span className="material-icons-outlined text-white text-sm">check</span>
                    )}
                  </span>
                </div>
              ))}
              {customLabels.map((customLbl, i) => (
                <div key={i} className="flex items-center">
                  <span
                    onClick={() => setSelectedLabel(customLbl)}
                    style={{ backgroundColor: customLbl }}
                    className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    {selectedLabel === customLbl && (
                      <span className="material-icons-outlined text-white text-sm">check</span>
                    )}
                  </span>
                  {/* 刪除自定義顏色按鈕 */}
                  <button
                    onClick={() => handleDeleteCustomColor(customLbl)}
                    className="ml-1 text-red-500 hover:text-red-700"
                  >
                    刪除
                  </button>
                </div>
              ))}
              {/* 添加自定義顏色按鈕 */}
              <button
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="border rounded-full p-1 ml-2"
              >
                <span className="material-icons-outlined text-gray-500">add</span>
              </button>
            </div>
            {/* 顯示顏色選擇器 */}
            {showColorPicker && (
              <div className="mb-4">
                <ChromePicker
                  color={customColor}
                  onChange={(updatedColor) => setCustomColor(updatedColor.hex)}
                />
                <button
                  onClick={handleAddCustomColor}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
                >
                  添加顏色
                </button>
              </div>
            )}
          </div>
        </div>
        {/* 提交按鈕 */}
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            儲存
          </button>
        </footer>
      </form>
    </div>
  );
}
