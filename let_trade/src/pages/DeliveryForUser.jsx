import React, { useState } from 'react';
import axios from 'axios'
const Delivery = () => {
  const [response, setResponse] = useState('');
  const [order, setOrder] = useState({
    productDetail: '',
    contactInformation: '',
    deliveryLocation: '',
    deliveryDate: '',
    deliveryTime: '',
    paymentMethod: ''

  });
  const orderHandler = (event) => {
    const { name, value } = event.target;
    setOrder((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const submitOrders = async (event) => {
    event.preventDefault();
    const token=localStorage.getItem('token');
    try {
      const res=await axios.post("https://fastservice.onrender.com/abc/userOrders",order,{headers:{Authorization:`Bearer ${token}`}});
      console.log(res.data.message)
      setResponse(res.data.message);
      setOrder({
        productDetail: '',
        contactInformation: '',
        deliveryLocation: '',
        deliveryDate: '',
        deliveryTime: '',
        paymentMethod: ''
      })

    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <form onSubmit={submitOrders}>
      <h2 className="text-2xl font-semibold mb-6 text-center">Delivery Order Form</h2>
      <textarea
        name="productDetail"
        placeholder="Enter the product detail"
        value={order.productDetail}
        onChange={orderHandler}
        required
        rows="3"
        className="border border-gray-200 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        name="contactInformation"
        placeholder="Enter contact information (phone, etc.)"
        value={order.contactInformation}
        onChange={orderHandler}
        rows="3"
        className="border border-gray-200 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <textarea
        name="deliveryLocation"
        placeholder="Enter delivery location"
        value={order.deliveryLocation}
        onChange={orderHandler}
        required
        rows="3"
        className="border border-gray-200 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="date"
          name="deliveryDate"
          value={order.deliveryDate}
          onChange={orderHandler}
          required
          className="border border-gray-200 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="time"
          name="deliveryTime"
          value={order.deliveryTime}
          onChange={orderHandler}
          required
          className="border border-gray-200 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <select
        name="paymentMethod"
        required
        value={order.paymentMethod}
        onChange={orderHandler}
        className="border border-gray-200 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="" disabled>Select Payment Method </option>
        <option value="not needed">payment not needed</option>
        <option value="telebirr">TeleBirr (+251654323452)</option>
        <option value="cbe">CBE (1000000000000)</option>
        <option value="abilysinia">Abysinia (5643243)</option>
      </select> 
      <p className='text-center text-xl text-black-500 mb-4'>Send the screenshot of the order to this telegram bot <a href='' className='text-green-500 text-xl animate-bounce'>@fast_Service </a></p>
      <p className='text-red-500 text-xl text-center animate-bounce'>{response}</p>  
      <button
        type="submit"
        className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit Order
      </button>
   </form>
    </div>
  );
};
export default Delivery;
