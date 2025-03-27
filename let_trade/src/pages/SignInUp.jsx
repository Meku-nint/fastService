import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SignInUp = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [view, setViewLogin] = useState(true);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [responseLogin, setResponseLogin] = useState('');
  const [responseSignup, setResponseSignup] = useState('');
  const loginHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('https://devfastservice.onrender.com/abc/loginuser', loginData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/user');
      } else {
        setResponseLogin(res.data.message);
      }
    } catch (error) {
      setResponseLogin(error.response ? error.response.data.message:"An error occurred");
    }
     finally{
      setIsLoading(false);
     } 
  };
  const signupHandler = async(e) => {

    e.preventDefault();
    try {
      const res = await axios.post('https://devfastservice.onrender.com/abc/signupuser', user);
      setResponseSignup(res.data.message || 'Signup successful! go to login page');
      setUser({ name: '', email: '', password: '' });
    } catch (error) {
      console.log(error.response.data.message);
      setResponseSignup(error.response ? error.response.data.message : 'An error occurred');
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {!view && (
          <form onSubmit={signupHandler} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Signup Form</h2>
            <input
              type="text"
              autoComplete="off"
              required
              placeholder="Enter your full name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              autoComplete="off"
              required
              placeholder="Your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              autoComplete="off"
              required
              placeholder="Your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
            <p
              onClick={() => setViewLogin(true)}
              className="text-center text-blue-500 cursor-pointer hover:underline"
            >
              I already have an account
            </p>
            {responseSignup && <p className="text-center text-red-500">{responseSignup}</p>}
          </form>
        )}
        {view && (
          <form onSubmit={loginHandler} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Login Form</h2>
            <input
              type="email"
              autoComplete="off"
              required
              placeholder="Your email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              autoComplete="off"
              required
              placeholder="Your password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <div className="w-6 h-4 border-4 border-t-4 border-white-500 rounded-full animate-spin "></div>
                </div>
              ) : null  
              }
              Submit
            </button>
            <p
              onClick={() => setViewLogin(false)}
              className="text-center text-blue-500 cursor-pointer hover:underline"
            >
              Create a new account
            </p>
            {responseLogin && <p className="text-center text-red-500">{responseLogin}</p>}
          </form>
        )}
      </div>
    </div>
  );
};
export default SignInUp;
