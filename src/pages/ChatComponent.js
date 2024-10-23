import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 导入 useNavigate 用于路由跳转
import '../assets/style/question.css'; // 引入普通 CSS 文件
import microphoneImg from '../assets/images/microphone.png'; // 确保路径正确
import transmitImg from '../assets/images/thansmit.png'; // 确保路径正确
import logoImg from '../assets/images/logo.png'; // 确保路径正确
import SidebarDrawer from '../components/SidebarDrawer'; // 导入侧边抽屉

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [presetQuestionsVisible, setPresetQuestionsVisible] = useState(true);
  const [messageInput, setMessageInput] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false); // 控制侧边抽屉是否显示
  const defaultMessageDisplayed = useRef(false);
  const chatWindowRef = useRef(null); // 用于获取聊天窗口的 DOM 引用
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate(); // 使用 useNavigate 来进行路由跳转

  useEffect(() => {
    // Show default message on component mount
    if (!defaultMessageDisplayed.current) {
      addMessage('您好!需要什么帮助吗?', 'friend');
      defaultMessageDisplayed.current = true; // 标记已显示
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
    setTimeout(scrollToBottom, 0); // 确保在 DOM 更新后滚动
  };

  const sendPresetMessage = (message) => {
    addMessage(message, 'user');
    hidePresetQuestions();
    handleChatbotReply(message);
  };

  const hidePresetQuestions = () => {
    setPresetQuestionsVisible(false);
  };

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const userMessage = messageInput.trim();
      addMessage(userMessage, 'user');
      handleChatbotReply(userMessage);
      setMessageInput(''); // 清除输入框
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage(); // 按下 Enter 键时发送消息
    }
  };

  const handleChatbotReply = async (userMessage) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer YOUR_OPENAI_API_KEY`, // 替换成你的 OpenAI API 密钥
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        console.error('Error details:', errorDetails);
        throw new Error(`Network response was not ok: ${errorDetails.message}`);
      }

      const data = await response.json();
      const botReply = data.choices[0].message.content;
      addMessage(botReply, 'friend');
    } catch (error) {
      console.error('与 OpenAI 通信时发生错误:', error);
      addMessage('抱歉，处理您的请求时出现错误。', 'friend');
    }
  };

  const scrollToBottom = () => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev); // 切换抽屉显示状态
  };

  return (
    <div className="chat-component-wrapper"> {/* 顶层容器 */}
      <div className="h-screen flex flex-col">
        {/* 顶部导航条 */}
        <header className="px-4 py-2 flex items-center bg-[#d3e8e6]">
          {/* 点击 logo 以显示/隐藏侧边抽屉 */}
          <img
            src={logoImg}
            alt="calendar"
            className="mr-2 w-12 h-12 cursor-pointer"
            onClick={toggleDrawer}
          />
          <h1 className="mr-10 text-xl text-gray-500 font-bold">一本万历</h1>
        </header>

        {/* 侧边抽屉 */}
        <SidebarDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* 聊天窗口部分 */}
        <div className="flex-1">
          <div className="chat-container">
            <div ref={chatWindowRef} id="chat-window" className="chat-window">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  {message.sender === 'friend' && (
                    <img src={logoImg} alt="Avatar" className="avatar" />
                  )}
                  <div className="text">{message.text}</div>
                </div>
              ))}
            </div>

            {presetQuestionsVisible && (
              <div id="preset-questions" className="preset-questions">
                <button className="preset-question" onClick={() => sendPresetMessage('查詢今日行程')}>
                  查詢今日行程
                </button>
                <button className="preset-question" onClick={() => sendPresetMessage('幫我新增一個行程')}>
                  幫我新增一個行程
                </button>
                <button className="preset-question" onClick={() => sendPresetMessage('最近有什麼活動?')}>
                  最近有什麼活動?
                </button>
              </div>
            )}

            <div className="chatinput-area">
              <input
                className='chatinput'
                type="text"
                id="message-input"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <button id="voice-button">
                <img src={microphoneImg} alt="Voice Input" />
              </button>
              <button id="send-button" onClick={sendMessage}>
                <img src={transmitImg} alt="Send Message" style={{ width: '30px', height: '30px' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
