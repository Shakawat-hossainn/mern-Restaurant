import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { clearCart } from '../features/Cart/cartSlice.js';

const Checkout = () => {
  const url = "https://mern-restaurant-backend-cphh.onrender.com"
  const dispatch = useDispatch();
  const { total, cartItems } = useSelector((store) => store.cart);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    zipcode: '',
    country: '',
    cartItems: cartItems // Initialize cartItems in formData
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await fetch(`${url}/api/v1/delivery/deliveryAddress`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      dispatch(clearCart()); // Clear cart after order is successful
      console.log(cartItems);
      navigate('/payment');
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className='p-4 flex flex-col md:flex-row justify-evenly  md:mt-[3vw] mb-[3vw]'>
      <div>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4'>
            <input onChange={handleChange} type="text" id='firstName' name='firstName' placeholder="First Name" className="input input-bordered input-secondary w-full max-w-xs" />
            <input onChange={handleChange} type="text" placeholder="Last Name" id='lastName' name='lastName' className="input input-bordered input-secondary w-full max-w-xs" />
          </div>
          <div className='flex flex-col gap-4'>
            <input onChange={handleChange} type="email" id='email' name='email' placeholder="Email" className="input input-bordered input-secondary w-full " />
            <input onChange={handleChange} type="text" placeholder="Address" id='address' name='address' className="input input-bordered input-secondary w-full " />
          </div>
        </div>
        <div className='flex flex-row gap-4 mt-4'>
          <input onChange={handleChange} type="number" placeholder="Phone" id='phone' name='phone'
            className="input input-bordered input-secondary w-full " />
          <input onChange={handleChange} type="text" placeholder="City" id='city' name='city' className="input input-bordered input-secondary w-full max-w-xs" />
        </div>
        <div className='flex flex-row gap-4 mt-4'>
          <input onChange={handleChange} type="text" placeholder="Zip-Code" id='zipcode' name='zipcode' className="input input-bordered input-secondary w-full max-w-xs" />
          <input onChange={handleChange} type="text" placeholder="Country" id='country' name='country' className="input input-bordered input-secondary w-full max-w-xs" />
        </div>
      </div>
      <div className="m-6">
        <p className='text-orange-700 font-bold text-2xl'>Cart Totals</p>
        <div className='mt-3'>
          <div className='flex gap-[12vw] md:gap-[9vw]'>
            <div>Subtotal</div>
            <div>${total}</div>
          </div>
          <div className='flex gap-[7vw] mt-2'>
            <div>Delivery Fee</div>
            <div>$5</div>
          </div>
          <hr className="border-t-2 border-gray-300 md:w-[20vw] w-[29vw] mt-1 mb-1" />
          <div className='flex gap-[16.5vw] md:gap-[10.5vw] mt-2'>
            <div>Total</div>
            <div>${total + 5}</div>
          </div>
        </div>

        <Button onClick={handleClick} outline gradientMonochrome='cyan' className='mt-7'>Order</Button>

      </div>
    </div>
  );
}

export default Checkout;
