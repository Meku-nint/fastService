import axios from 'axios';
import NavBar from './NavBar';
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [search, setSearch] = useState('');
  const [reversOrder, setReverseOrder] = useState([]);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:3000/abc/fetchOrders");
        setReverseOrder(res.data.reverse());
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    try {
      const res = await axios.delete('http://localhost:3000/abc/deleteOrder', { data: { orderId } });
      alert(res.data.message);
      setReverseOrder(reversOrder.filter(order => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen mt-15">
      <NavBar />
      <div className="container mx-auto p-4 ">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-700">List of Orders</h1>
        <input
          type='search'
          placeholder='Product name'
          className='w-full max-w-sm mb-4 h-10 px-3 py-2 text-red-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="space-y-6">
          {reversOrder.length > 0 ? (
            reversOrder
              .filter((order) => {
                return search.toLowerCase() === '' ? order : order.productDetail.toLowerCase().includes(search);
              })
              .map((order, index) => {
                const isTodayOrder = (today === order.deliveryDate.split('T')[0]);
                return (
                  <div 
                    key={index} 
                    className={`relative p-6 rounded-lg shadow-lg border ${isTodayOrder ? 'bg-green-100 border-green-500' : 'bg-white border-gray-200'}`}
                  >
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Order #{index + 1}</h2>
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
                        <p className="text-gray-600"><strong>Created At:</strong> {order.createdAt.split('T')[0]}</p>
                      </div>
                    </div>
                    <button
                      onDoubleClick={() => handleDelete(order._id)}
                      className="absolute bottom-4 right-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                );
              })
          ) : (
            <div>No orders found.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Orders;