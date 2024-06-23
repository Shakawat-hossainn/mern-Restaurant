import React, { useEffect, useState } from 'react';
import { BiCart } from "react-icons/bi";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = "https://mern-restaurant-backend-cphh.onrender.com"
  useEffect(() => {
    const getOrders = async () => {
      const res = await fetch(`${url}/api/v1/delivery/getOrders`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      //console.log(data);
      if (res.ok) {
        setOrders(data.orders); 
      }
    };
    
    getOrders();
  }, []);

  return (
    <div className="p-4">
      <p className="text-2xl font-bold mb-4">My Orders</p>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded-md shadow-md flex justify-between items-center">
              <div className="flex items-center">
                <BiCart className="text-4xl text-orange-500" />
                <div className="ml-4">
                  <p className="font-semibold">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-600">Status: <span className={`status-${order.status.toLowerCase()} text-red-900 font-semibold`}>{order.status}</span></p>
                  <p className="text-sm text-gray-600">Items: {order.cartItems.map(item => `${item.productId.title} x ${item.quantity}`).join(', ')}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${order.cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0)}</p>
                <p className="text-sm text-gray-600">Items: {order.cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
                <button className="btn btn-outline btn-primary mt-2" onClick={() => window.location.reload()}>Track Order</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
