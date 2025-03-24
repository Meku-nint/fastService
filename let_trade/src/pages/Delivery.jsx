import React, { useState } from 'react';
import axios from 'axios';

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
    setOrder((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submitOrders = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/abc/orders", order);
      console.log(res.data.message);
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
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
      <form onSubmit={submitOrders}>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Delivery Order Form</h2>

        <textarea
          name="productDetail"
          placeholder="Product details for delivery"
          value={order.productDetail}
          onChange={orderHandler}
          required
          rows="2"
          className="border-2 border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors"
        />

        <textarea
          name="contactInformation"
          placeholder="Your active contact information (phone number and email ...)"
          value={order.contactInformation}
          onChange={orderHandler}
          rows="2"
          className="border-2 border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors"
        />

        <textarea
          name="deliveryLocation"
          placeholder="Delivery location (you can share your location from Google Maps)"
          value={order.deliveryLocation}
          onChange={orderHandler}
          required
          rows="2"
          className="border-2 border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="date"
            name="deliveryDate"
            value={order.deliveryDate}
            onChange={orderHandler}
            required
            className="border-2 border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors"
          />
          <input
            type="time"
            name="deliveryTime"
            value={order.deliveryTime}
            onChange={orderHandler}
            required
            className="border-2 border-gray-300 rounded-md p-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors"
          />
        </div>

        <select
          name="paymentMethod"
          required
          value={order.paymentMethod}
          onChange={orderHandler}
          className="border-2 border-gray-300 rounded-md p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-500 hover:border-indigo-500 transition-colors appearance-none wrap"
        >
          <option value="" disabled>Select Payment Method And Pay the required amount</option>
          <option value="telebirr">TeleBirr (+251654323452)</option>
          <option value="cbe">CBE (1000000000000)</option>
          <option value="abilysinia">Abysinia (5643243)</option>
        </select>
        <p className="mt-4 text-center text-black-700 text-xl">Send the screenshot of the payment on telegram bot  <a href='' className="text-indigo-500 hover:text-indigo-600 transition-colors"> @fast_Service</a></p>
        {<p className="mt-4 text-center text-red-500 text-xl animate-bounce motion-reduce:animate-none">{response}</p>}
        <button
          type="submit"
          className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};
export default Delivery;