import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import { Button, Card } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateCartItemQuantity, removeItem } from '../features/Cart/cartSlice.js';
import { FaCircleMinus } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";

const Menu = () => {
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const urlImage = 'http://localhost:5000/images';
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(['all']);
  const [displayedItems, setDisplayedItems] = useState([]);

  const filterItems = (category) => {
    if (category === 'All') {
      setDisplayedItems(menuItems);
    } else {
      setDisplayedItems(menuItems.filter((item) => item.category === category));
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`/api/v1/product/getProducts`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (res.ok) {
          setMenuItems(data.products);
          setDisplayedItems(data.products);
          setCategories(['All', ...new Set(data.products.map((item) => item.category))]);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const handleCart = async (productId) => {
    try {
      const res = await fetch(`/api/v1/cart/addToCart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Item added to cart!");
        dispatch(addToCart(data.newCartItem));  // Add the new item to the cart in Redux state
      } else {
        console.log(data.message);
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const getCartItems = async () => {
      try {
        const res = await fetch(`/api/v1/cart/getCart`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await res.json();
        if (res.ok) {
          dispatch(addToCart(data.cart));
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCartItems();
  }, [dispatch]);

  const isInCart = (productId) => {
    const validCartItems = cartItems.filter(item => item !== undefined && item !== null);
    return validCartItems.some((item) => item.productId && item.productId._id === productId);
  };

  const getCartItemQuantity = (productId) => {
    const cartItem = cartItems.find(item => item.productId && item.productId._id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleIncrease = (cartItemId, quantity) => {
    dispatch(updateCartItemQuantity({ itemId: cartItemId, quantity: quantity + 1 }));
  };

  const handleDecrease = (cartItemId, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ itemId: cartItemId, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="p-4 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <p className='text-orange-600 font-bold text-center text-2xl'>Our Menu</p>
      <div className='mb-9 flex justify-center mt-7 '>
        <Categories filterItems={filterItems} categories={categories} />
      </div>
      <div className="card-style grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center mx-auto overflow-hidden">
        {displayedItems.map((item) => {
          const { title, description, image, price, _id } = item;
          const quantity = getCartItemQuantity(_id);
          const cartItem = cartItems.find(ci => ci.productId && ci.productId._id === _id);
          const cartItemId = cartItem ? cartItem._id : null;

          return (
            <Card key={_id} className="md:max-w-xs max-w-sm flex flex-col md:justify-between h-full">
              <img src={image} alt={title} className="h-36 w-full object-cover rounded-t-lg" />
              <div className="p-2 flex flex-col flex-grow">
                <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white mb-1">{title}</h5>
                <p className="text-gray-700 dark:text-gray-300 flex-grow text-sm">{description}</p>
                <div className="mb-3 mt-2 flex items-center">
                  <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.293c.3.92-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.293c.3.92-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.293c.3.92-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.293c.3.92-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-4 w-4 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.293c.3.92-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.293a1 1 0 00-.364-1.118L2.98 8.719c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">4.9</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
                  {isInCart(_id) ? (
                    <div className="flex items-center">
                      <button onClick={() => handleDecrease(cartItemId, quantity)} className="btn btn-outline btn-circle btn-sm mr-2">
                        <FaCircleMinus className="w-5 h-5" />
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => handleIncrease(cartItemId, quantity)} className="btn btn-outline btn-circle btn-sm ml-2">
                        <FaPlusCircle className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <Button onClick={() => handleCart(_id)} className="text-white bg-teal-500 hover:bg-teal-600">
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
