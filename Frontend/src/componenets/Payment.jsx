import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const Payment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been placed successfully.</p>
        <Link to="/" className="inline-block px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-200">
          Go to Home
        </Link>
      </div>
    </div>
  )
}

export default Payment
