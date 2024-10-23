// src/pages/PomodoroStats.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDrawer from '../components/SidebarDrawer'; // 引入側邊抽屜
import searchIcon from '../assets/images/search.png'; // 添加搜尋圖標的相對路徑
import filterIcon from '../assets/images/filter.png'; // 添加篩選圖標的相對路徑
import logoImg from '../assets/images/logo.png'; // 確保路徑正確
import '../assets/style/PomodoroStats.css'; // 引入相對應的CSS檔案

const PomodoroStats = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // 控制側邊抽屜是否顯示
  const navigate = useNavigate(); // 獲取 navigate 方法

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev); // 切換抽屜顯示狀態
  };

  const goToSettings = () => {
    navigate('/settings'); // 導航到設定頁
  };

  return (
    <div className="data-statistics-wrapper">
      {/* 頂部導航條 */}
      <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
        {/* 點擊 logo 以顯示/隱藏側邊抽屜 */}
        <img
          src={logoImg}
          alt="logo"
          className="mr-2 w-12 h-12 cursor-pointer"
          onClick={toggleDrawer}
        />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">數據統計</h1>
        <div className="images">
          <img
            src={searchIcon}
            alt="search icon"
            onClick={() => navigate('/PomodoroStats')}
            style={{ cursor: 'pointer', filter: 'brightness(0) invert(1)' }}
          />
          <img
            src={filterIcon}
            alt="filter icon"
            onClick={goToSettings}
            style={{ cursor: 'pointer', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </header>

      {/* 側邊抽屜 */}
      <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="data-statistics">
        <div className="pomodoro-counts">
          <div className="pomodoro-item1">
            <p>今日番茄數</p>
            <h1>4</h1>
          </div>
          <div className="pomodoro-item2">
            <p>總番茄數</p>
            <h1>4</h1>
          </div>
        </div>

        <div className="focus-time">
          <div className="focus-item1">
            <p>今日專注時間</p>
            <h1>1h40m</h1>
          </div>
          <div className="focus-item2">
            <p>總專注時間</p>
            <h1>1h40m</h1>
          </div>
        </div>

        <div className="time-chart">
          <p>專注時間</p>
          <div className="time-filter">
            <button className="selected">日</button>
            <button>週</button>
            <button>月</button>
          </div>
          <div className="chart">
            {/* 用 div 模擬圖表的樣式 */}
            {[...Array(24)].map((_, i) => (
              <div key={i} className={`bar ${i === 20 ? 'active-bar' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroStats;
