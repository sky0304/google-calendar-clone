// src/pages/Potatoset.js
import React, { useState } from 'react';
import '../assets/style/Potatoset.css'; // 使用正確的相對路徑
import timeIcon from '../assets/images/time.png';
import soundIcon from '../assets/images/sound.png';
import searchIcon from '../assets/images/search.png'; // 添加搜尋圖標的相對路徑
import filterIcon from '../assets/images/filter.png'; // 添加篩選圖標的相對路徑
import logoImg from '../assets/images/logo.png'; // 確保路徑正確
import { useNavigate } from 'react-router-dom'; // 使用 React Router 的 navigate

const Potatoset = () => {
  const navigate = useNavigate(); // 獲取 navigate 函數

  // 定義各個時長選項
  const pomodoroDurations = [15, 30, 45, 90, 120]; // 單位是分鐘
  const shortBreakDurations = [5, 10, 15]; // 單位是分鐘
  const longBreakDurations = [20, 25, 30]; // 單位是分鐘
  const ringtoneOptions = ['鈴聲1', '鈴聲2', '鈴聲3']; // 定義鈴聲選項

  // 定義狀態來管理下拉選單的開關及選取的值
  const [pomodoroDuration, setPomodoroDuration] = useState(25); // 預設 25 分鐘
  const [shortBreakDuration, setShortBreakDuration] = useState(5); // 預設 5 分鐘
  const [longBreakDuration, setLongBreakDuration] = useState(20); // 預設 20 分鐘
  const [showPomodoroOptions, setShowPomodoroOptions] = useState(false);
  const [showShortBreakOptions, setShowShortBreakOptions] = useState(false);
  const [showLongBreakOptions, setShowLongBreakOptions] = useState(false);
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(false);
  const [autoStartBreak, setAutoStartBreak] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [showPomodoroRingtoneOptions, setShowPomodoroRingtoneOptions] = useState(false);
  const [showBreakRingtoneOptions, setShowBreakRingtoneOptions] = useState(false);
  const [pomodoroRingtone, setPomodoroRingtone] = useState('鈴聲1'); // 預設番茄鈴聲
  const [breakRingtone, setBreakRingtone] = useState('鈴聲1'); // 預設休息鈴聲

  // 用來切換選單顯示狀態的函數
  const togglePomodoroOptions = () => setShowPomodoroOptions(!showPomodoroOptions);
  const toggleShortBreakOptions = () => setShowShortBreakOptions(!showShortBreakOptions);
  const toggleLongBreakOptions = () => setShowLongBreakOptions(!showLongBreakOptions);
  const togglePomodoroRingtoneOptions = () => setShowPomodoroRingtoneOptions(!showPomodoroRingtoneOptions);
  const toggleBreakRingtoneOptions = () => setShowBreakRingtoneOptions(!showBreakRingtoneOptions);

  // 勾號圖示
  const checkMark = '✔'; // 或者使用圖標庫中的圖示來表示勾號

  // 導航功能
  const toggleDrawer = () => {
    navigate('/calendar');
  };
  const goToStats = () => {
    navigate('/PomodoroStats'); // 導航到數據統計頁
  };

  return (
    <div className="potatoset-settings">
      {/* 頂部導航條 */}
      <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
        <img
          src={logoImg}
          alt="logo"
          className="mr-2 w-12 h-12 cursor-pointer"
          onClick={toggleDrawer}
        />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">番茄設置</h1>
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
            onClick={() => navigate('/settings')}
            style={{ cursor: 'pointer', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </header>

      {/* 專注計時區塊 */}
      <div className="potatoset-test">
        <div className="potatoset-images">
          <img src={timeIcon} alt="time icon" />
        </div>
        <h2>專注計時</h2>
      </div>

      <div className="potatoset-section">
        {/* 番茄時長設定 */}
        <div className="potatoset-setting-item" onClick={togglePomodoroOptions}>
          <span>番茄時長</span>
          <span>{pomodoroDuration} 分鐘</span>
        </div>
        {showPomodoroOptions && (
          <div className="dropdown">
            {pomodoroDurations.map((duration) => (
              <div
                key={duration}
                className="dropdown-item"
                onClick={() => setPomodoroDuration(duration)}
              >
                {duration} 分鐘
                {pomodoroDuration === duration && <span>{checkMark}</span>}
              </div>
            ))}
          </div>
        )}

        {/* 短休息時長設定 */}
        <div className="potatoset-setting-item" onClick={toggleShortBreakOptions}>
          <span>短休息時長</span>
          <span>{shortBreakDuration} 分鐘</span>
        </div>
        {showShortBreakOptions && (
          <div className="dropdown">
            {shortBreakDurations.map((duration) => (
              <div
                key={duration}
                className="dropdown-item"
                onClick={() => setShortBreakDuration(duration)}
              >
                {duration} 分鐘
                {shortBreakDuration === duration && <span>{checkMark}</span>}
              </div>
            ))}
          </div>
        )}

        {/* 長休息時長設定 */}
        <div className="potatoset-setting-item" onClick={toggleLongBreakOptions}>
          <span>長休息時長</span>
          <span>{longBreakDuration} 分鐘</span>
        </div>
        {showLongBreakOptions && (
          <div className="dropdown">
            {longBreakDurations.map((duration) => (
              <div
                key={duration}
                className="dropdown-item"
                onClick={() => setLongBreakDuration(duration)}
              >
                {duration} 分鐘
                {longBreakDuration === duration && <span>{checkMark}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="potatoset-setting-item potatoset-toggle">
          <span>自動開始下個番茄</span>
          <label className="potatoset-switch">
            <input
              type="checkbox"
              checked={autoStartPomodoro}
              onChange={() => setAutoStartPomodoro(!autoStartPomodoro)}
            />
            <span className="potatoset-slider"></span>
          </label>
        </div>
        <div className="potatoset-setting-item potatoset-toggle">
          <span>自動開始休息</span>
          <label className="potatoset-switch">
            <input
              type="checkbox"
              checked={autoStartBreak}
              onChange={() => setAutoStartBreak(!autoStartBreak)}
            />
            <span className="potatoset-slider"></span>
          </label>
        </div>
      </div>

      {/* 提醒區塊 */}
      <div className="potatoset-test">
        <div className="potatoset-images">
          <img src={soundIcon} alt="sound icon" />
        </div>
        <h2>提醒</h2>
      </div>

      <div className="potatoset-section">
        <div className="potatoset-setting-item" onClick={togglePomodoroRingtoneOptions}>
          <span>番茄鈴聲</span>
          <span>{pomodoroRingtone}</span>
        </div>
        {showPomodoroRingtoneOptions && (
          <div className="dropdown">
            {ringtoneOptions.map((ringtone) => (
              <div
                key={ringtone}
                className="dropdown-item"
                onClick={() => setPomodoroRingtone(ringtone)}
              >
                {ringtone}
                {pomodoroRingtone === ringtone && <span>{checkMark}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="potatoset-setting-item" onClick={toggleBreakRingtoneOptions}>
          <span>休息鈴聲</span>
          <span>{breakRingtone}</span>
        </div>
        {showBreakRingtoneOptions && (
          <div className="dropdown">
            {ringtoneOptions.map((ringtone) => (
              <div
                key={ringtone}
                className="dropdown-item"
                onClick={() => setBreakRingtone(ringtone)}
              >
                {ringtone}
                {breakRingtone === ringtone && <span>{checkMark}</span>}
              </div>
            ))}
          </div>
        )}

        <div className="potatoset-setting-item potatoset-toggle">
          <span>震動</span>
          <label className="potatoset-switch">
            <input
              type="checkbox"
              checked={vibration}
              onChange={() => setVibration(!vibration)}
            />
            <span className="potatoset-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Potatoset;
