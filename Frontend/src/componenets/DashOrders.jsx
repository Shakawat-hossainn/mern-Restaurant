import React, { useEffect, useState } from 'react';
import OrderCard from './OrderCard';

const DashOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/v1/delivery/getAllOrders',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        console.log(data)
        if (res.ok) {
          setOrders(data.orders);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Page</h1>
      {orders.length > 0 ? (
        orders.map((order) => <OrderCard key={order._id} order={order} />)
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default DashOrders;
