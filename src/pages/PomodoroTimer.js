// src/pages/PomodoroTimer.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDrawer from '../components/SidebarDrawer'; // 引入側邊抽屜
import '../assets/style/App.css'; // 更新為統一樣式
import searchIcon from '../assets/images/search.png';
import filterIcon from '../assets/images/filter.png';
import logoImg from '../assets/images/logo.png'; // 確保路徑正確

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1500); // 25分鐘 = 1500秒
  const [isRunning, setIsRunning] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // 控制側邊抽屜是否顯示
  const navigate = useNavigate();

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false); // 當倒數結束時，停止計時
    }
    return () => clearInterval(timer); // 清除計時器
  }, [isRunning, timeLeft]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1500); // 重置為 25 分鐘
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getTomatoCount = () => {
    const elapsed = 1500 - timeLeft;
    if (elapsed >= 1440) return 4; 
    if (elapsed >= 1080) return 3;
    if (elapsed >= 720) return 2;
    if (elapsed >= 360) return 1;
    return 0;
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev); // 切換抽屜顯示狀態
  };

  const goToSettings = () => {
    navigate('/Potatoset'); // 導航到設定頁
  };

  const goToStats = () => {
    navigate('/PomodoroStats'); // 導航到數據統計頁
  };

  return (
    <div className="pomodoro-timer-wrapper">
      {/* 頂部導航條 */}
      <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
        {/* 點擊 logo 以顯示/隱藏側邊抽屜 */}
        <img
          src={logoImg}
          alt="logo"
          className="mr-2 w-12 h-12 cursor-pointer"
          onClick={toggleDrawer}
        />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">番茄鐘計時器</h1>
        <div className="images">
          <img
            src={searchIcon}
            alt="search icon"
            onClick={goToStats}
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

      <div className="timer-circle section">
        <span>{formatTime(timeLeft)}</span>
      </div>

      <div className="controls">
        <button onClick={startTimer} disabled={isRunning} aria-label="開始計時">▶️</button>
        <button onClick={pauseTimer} disabled={!isRunning} aria-label="暫停計時">⏸️</button>
        <button onClick={resetTimer} aria-label="重置計時">🔄</button>
      </div>

      <div className="pomodoro-count">
        {[...Array(4)].map((_, index) => (
          <span
            key={index}
            className={index < getTomatoCount() ? 'tomato-filled' : 'tomato-empty'}
            role="img"
            aria-label="番茄"
          >
            🍅
          </span>
        ))}
      </div>
    </div>
  );
};

export default PomodoroTimer;
