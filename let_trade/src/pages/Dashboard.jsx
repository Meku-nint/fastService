import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [orders, setOrders] = useState([])
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get("https://devfastservice.onrender.com/abc/getOrders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },    
        });
        setOrders(res.data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchOrders();
  }, [])
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Order Details</h1>
        <div className="space-y-6">
         {orders.length>0?
          <div>
          {orders.map((order, index) => (
            <div key={index} className="relative bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order #{index + 1}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-600"><strong>Product Detail:</strong> {order.productDetail}</p>
                  <p className="text-gray-600"><strong>Contact Information:</strong> {order.contactInformation}</p>
                  <p className="text-gray-600"><strong>Delivery Location:</strong> {order.deliveryLocation}</p>
                </div>
                <div>
                  <p className="text-gray-600"><strong>Date:</strong> {order.deliveryDate}</p>
                  <p className="text-gray-600"><strong>Time:</strong> {order.deliveryTime}</p>
                  <p className="text-gray-600"><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
              </div>
              <button 
                onDoubleClick={() => handleDelete(order._id)} 
                className="absolute bottom-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))
        } </div>:<div>There is no order</div>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
