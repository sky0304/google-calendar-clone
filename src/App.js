// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatComponent from "./pages/ChatComponent";
import Activity from "./pages/Activity";
import ActivityList from "./pages/ActivityList";
import PomodoroTimer from "./pages/PomodoroTimer";
import PomodoroStats from "./pages/PomodoroStats"; // 引入 PomodoroStats 頁面
import Potatoset from "./pages/Potatoset"; // 引入 Potatoset 頁面

function App() {
  return (
    <Router>
      {/* 定義所有的路由 */}
      <Routes>
        {/* 主頁面設置為登入頁面 */}
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />

        {/* 日曆頁面 */}
        <Route path="/calendar" element={<Calendar />} />

        {/* 註冊頁面 */}
        <Route path="/Register" element={<Register />} />

        {/* 聊天助手頁面 */}
        <Route path="/chat" element={<ChatComponent />} />

        {/* 活動頁面 */}
        <Route path="/activity" element={<Activity />} />

        {/* 活動列表頁面，包含特定類別 */}
        <Route path="/activity/:category" element={<ActivityList />} />

        {/* 番茄鐘計時器頁面 */}
        <Route path="/pomodoro" element={<PomodoroTimer />} />

        {/* 番茄鐘統計頁面 */}
        <Route path="/PomodoroStats" element={<PomodoroStats />} />

        {/* 番茄鐘設定頁面 */}
        <Route path="/Potatoset" element={<Potatoset />} /> {/* 添加 Potatoset 頁面 */}
      </Routes>
    </Router>
  );
}

export default App;
