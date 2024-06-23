import React, { useState } from 'react';

const OrderCard = ({ order }) => {
  const [status, setStatus] = useState(order.status);
//console.log(order)
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    try {
      const res = await fetch(`/api/v1/delivery/orders/updateStatus/${order._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!res.ok) {
        console.log('Error updating status');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border rounded-md mb-4">
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">{order.itemsDescription}</p>
          <p className="text-sm text-gray-600">Items:{order.cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
          <p className="text-sm text-gray-600">Total: ${order.cartItems.reduce((total, item) => total + item.quantity * item.productId.price, 0)}</p>
        </div>
        <div>
          <select
            value={status}
            onChange={handleStatusChange}
            className="border rounded p-1 text-sm bg-white"
          >
            <option value="Food Processing">Food Processing</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-medium">Shipping Address</p>
        <p className="text-sm">{order.address}</p>
        <p className="text-sm">{order.phone}</p>
        <p className="text-sm">{order.firstName} {order.lastName}</p>

      </div>
    </div>
  );
};

export default OrderCard;
