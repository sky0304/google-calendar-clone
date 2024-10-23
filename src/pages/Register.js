import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('密碼與確認密碼不一致');
      return;
    }
    setErrorMessage('');
    console.log('註冊成功:', { username, email, password, confirmPassword });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white bg-opacity-90 p-10 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">註冊</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="username" className="flex items-center text-gray-700 mb-2">
              <FaUser className="mr-2" /> 使用者名稱
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="flex items-center text-gray-700 mb-2">
              <FaEnvelope className="mr-2" /> 電子郵件
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="flex items-center text-gray-700 mb-2">
              <FaLock className="mr-2" /> 密碼
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="confirm-password" className="flex items-center text-gray-700 mb-2">
              <FaLock className="mr-2" /> 確認密碼
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 mb-5">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            註冊
          </button>
        </form>
        <div className="mt-5 text-sm text-gray-700">
          已經有帳號了嗎？
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            登入
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
