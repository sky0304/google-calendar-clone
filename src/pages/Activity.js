// src/pages/Activity.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarDrawer from '../components/SidebarDrawer'; // 引入側邊抽屜
import '../assets/style/Activity.css'; // 確保引入 CSS 的路徑正確
import artImg from '../assets/images/art.jpeg';
import lectureImg from '../assets/images/lecture.jpeg';
import competitionImg from '../assets/images/competition.jpeg';
import musicImg from '../assets/images/music.jpeg';
import movieImg from '../assets/images/movie.jpeg';
import sportImg from '../assets/images/sport.jpeg';
import posterImg from '../assets/images/poster.jpeg';
import logoImg from '../assets/images/logo.png'; // 确保路径正确
const Activity = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // 控制側邊抽屜是否顯示
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev); // 切換抽屜顯示狀態
  };

  const handleNavigate = (category) => {
    navigate(`/activity/${category}`);
  };

  return (
    <div className="activity-wrapper">
      {/* 頂部導航條 */}
      <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
        {/* 點擊 logo 以顯示/隱藏側邊抽屜 */}
        <img
          src={logoImg}
          alt="calendar"
          className="mr-2 w-12 h-12 cursor-pointer"
          onClick={toggleDrawer}
        />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">活動頁面</h1>
      </header>

      {/* 側邊抽屜 */}
      <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <div className="container1" style={{ backgroundImage: `url(${posterImg})` }}>
        <div className="suggestion-box">
          <h2>猜你喜歡</h2>
          <i className="fas fa-heart heart-icon"></i>
        </div>
      </div>

      <div className="dots-container">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <div className="activity-category">
        <h2>活動類別</h2>
        <ul>
          <li onClick={() => handleNavigate('art')}>
            <img src={artImg} alt="藝文" />
            <span>藝文</span>
          </li>
          <li onClick={() => handleNavigate('lecture')}>
            <img src={lectureImg} alt="講座" />
            <span>講座</span>
          </li>
          <li onClick={() => handleNavigate('competition')}>
            <img src={competitionImg} alt="競賽" />
            <span>競賽</span>
          </li>
          <li onClick={() => handleNavigate('music')}>
            <img src={musicImg} alt="音樂" />
            <span>音樂</span>
          </li>
          <li onClick={() => handleNavigate('movie')}>
            <img src={movieImg} alt="電影" />
            <span>電影</span>
          </li>
          <li onClick={() => handleNavigate('sport')}>
            <img src={sportImg} alt="運動" />
            <span>運動</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Activity;
