import { useNavigate } from "react-router-dom";

export default function SidebarDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNavigateToChat = () => {
    navigate("/chat");
    onClose(); // 關閉側邊欄
  };

  const handleNavigateToHome = () => {
    navigate("/calendar");
    onClose(); // 關閉側邊欄
  };

  const handleNavigateToActivity = () => {
    navigate("/activity");
    onClose(); // 關閉側邊欄
  };

  const handleNavigateToPomodoro = () => {
    navigate("/pomodoro");
    onClose(); // 關閉側邊欄
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`} // 使用更高的 z-index
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
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleNavigateToHome}
          >
            主頁
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleNavigateToActivity}
          >
            活動
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleNavigateToPomodoro}
          >
            學習助手 
          </li>
          <li
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer"
            onClick={handleNavigateToChat}
          >
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
