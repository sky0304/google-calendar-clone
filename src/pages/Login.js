import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/images/Google.png';
import appleIcon from '../assets/images/Apple.png';

const handleGoogleLogin = () => {
  console.log("Google 登入");
};

const handleAppleLogin = () => {
  console.log("Apple 登入");
};

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/calendar'); // 登入成功後跳轉到 Calendar 頁面
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">登入</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative mb-4">
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1 text-center ">
              <FaUser className="inline mr-2" /> 使用者名稱
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
            />
          </div>
          <div className="relative mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1 text-center">
              <FaLock className="inline mr-2" /> 密碼
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 text-white font-semibold rounded-lg transition-transform duration-200 hover:scale-105"
          >
            登入
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          還沒有帳號嗎？{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            註冊
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-4">或透過其他方式登入：</p>
          <div className="flex justify-center space-x-4">
          <button
  onClick={handleGoogleLogin}
  className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105"
>
  <img src={googleIcon} alt="Google" className="w-8 h-8" />
</button>
<button
  onClick={handleAppleLogin}
  className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105"
>
  <img src={appleIcon} alt="Apple" className="w-8 h-8" />
</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
