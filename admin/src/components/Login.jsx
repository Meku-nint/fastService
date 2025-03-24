import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [value, setType] = useState("password");
  const [response, setResponse] = useState('');
  const [login, setLogin] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const loginDataHandler = (event) => {
    const { name, value } = event.target;
    setLogin((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/abc/loginAdmin", login);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/home');
      }
    } catch (error) {
      setResponse(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTzAbsJ0_gdHfV8t138JnECN4SgBkU4i0nQQ&s')] bg-cover bg-center bg-no-repeat bg-fixed bg-blend-multiply">
      <form onSubmit={loginHandler} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Your Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          onChange={loginDataHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2 ">Password:</label>
        <input
          type={value}
          onMouseLeave={() => setType("password")}
          onMouseEnter={() => setType("text")}
          id="password"
          name="password"
          autoComplete="current-password"
          required
          onChange={loginDataHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
                <button
          type="submit"
          className={`w-full py-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'} text-white font-medium rounded-lg hover:bg-blue-600 transition duration-200`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="w-5 h-5 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            'Login'
          )}
        </button>
        <p className="mt-4 text-center text-red-500 text-sm">{response}</p>
      </form>
    </div>
  );
};

export default Login;
