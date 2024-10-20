import React from "react";

export default function SidebarDrawer({ isOpen, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <button
        className="p-4 text-gray-600 hover:text-gray-800"
        onClick={onClose}
      >
        Close
      </button>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">功能選單</h2>
        <ul>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            活動
          </li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            學習助手
          </li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            AI助手
          </li>
          <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer">
            個人資訊
          </li>
        </ul>
      </div>
    </div>
  );
}
