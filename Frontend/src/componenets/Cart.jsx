import React, { useEffect, useState } from 'react';
import { Table, Button } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { TiDelete } from "react-icons/ti";
import { removeItem, calculateTotals } from '../features/Cart/cartSlice.js';
import { Link } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(null);
  const { cartItems, total } = useSelector((store) => store.cart);
  const url = 'http://localhost:5000/images';

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const deleteCart = async (cartId) => {
    try {
      const res = await fetch(`/api/v1/cart/deleteCart/${cartId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.ok) {
        setDeleted("Product deleted successfully");
        setTimeout(() => {
          setDeleted(null);
        }, 2000);
        dispatch(removeItem(cartId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p className='text-2xl text-teal-800 font-bold text-center mb-5'>My Cart</p>
      {cartItems.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-lg text-gray-600">No items in the cart yet.</p>
          <Link to="/menu">
            <Button outline gradientMonochrome="cyan" className="m-5">Shop Now</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto md:ml-20">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Image</Table.HeadCell>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Quantity</Table.HeadCell>
                <Table.HeadCell>Price</Table.HeadCell>
                <Table.HeadCell className='text-red-600'>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {cartItems.filter(item => item != null).map((item) => {
                  const { price, title, image, category } = item.productId;
                  const { quantity } = item;
                  return (
                    <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <img src={`${url}/${image}`} alt={title} className="h-12 w-12 rounded-full object-cover" />
                      </Table.Cell>
                      <Table.Cell>{title}</Table.Cell>
                      <Table.Cell>{category}</Table.Cell>
                      <Table.Cell className='relative left-6'>{quantity}</Table.Cell>
                      <Table.Cell>${price}</Table.Cell>
                      <Table.Cell>
                        <TiDelete className="text-red-700 relative left-3 cursor-pointer" onClick={() => deleteCart(item._id)} />
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
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
          </div>
          <Link to='/checkout'>
            <Button outline gradientMonochrome='cyan' className='m-3'>Proceed To Checkout</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
