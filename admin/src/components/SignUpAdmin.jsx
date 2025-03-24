import axios from 'axios';
import React, { useState } from 'react';
import NavBar from './NavBar';
const SignUpAdmin = () => {
    const [response, setResponse] = useState('');
    const [typeValue, setType] = useState("password");
    const [adminData, setAdminData] = useState({
        email: '',
        password: '',
        code: ''
    });

    const adminDataHandler = (event) => {
        const { name, value } = event.target;
        setAdminData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const signupAdminHandler = async (event) => {
        event.preventDefault();
        console.log(adminData);
        try {
            const res = await axios.post("http://localhost:3000/abc/adminSignup", adminData);
            setResponse(res.data.message);
            setAdminData({
                email: '',
                password: '',
                code: ''
            })
        } catch (error) {
            setResponse(error.response.data.message);
        }
    }

    return (
 <div>
    <NavBar/>
       <div className="flex flex-col justify-center items-center bg-gray-50 p-6 rounded-lg shadow-lg h-screen">
            <form onSubmit={signupAdminHandler} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-4 ">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Add an admin</h2>
                <div className="flex flex-col">
                    <label htmlFor='email' className='text-gray-600 font-semibold mb-2'>His Email :</label>
                    <input 
                        type='email'
                        id="email"
                        name='email'
                        required
                        autoComplete='email'
                        value={adminData.email}
                        onChange={adminDataHandler}
                        className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor='password' className='text-gray-600 font-semibold mb-2'>Password :</label>
                    <input 
                        type={typeValue}
                        onMouseEnter={() => setType("text")}
                        onMouseLeave={() => setType("password")}
                        id="password"
                        name='password'
                        value={adminData.password}
                        autoComplete='current-password'
                        required
                        onChange={adminDataHandler}
                        className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="unique" className='text-gray-600 font-semibold mb-2'>Unique code :</label>
                    <input 
                        type='password'
                        name="code"
                        value={adminData.code}
                        autoComplete='off'
                        required
                        onChange={adminDataHandler}
                        className="p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type='submit'
                    className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                >
                   Add admin
                </button>  
                {response && (
                    <p className="text-center mt-4 text-lg font-medium text-green-700 animate-bounce">{response}</p>
                )}
            </form>
        </div>
  </div>
    );
}

export default SignUpAdmin;
