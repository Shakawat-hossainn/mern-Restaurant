import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../features/User/userSlice';


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((store) => store.user);
  
  const handleLogout = async() => {
    try {
      
      const res = await fetch('/api/v1/auth/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json();
      if (res.ok) {
      // console.log('Success')
      dispatch(signoutSuccess())
        navigate('/');
      }else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error)
    }
      
  };

  return (
    <div className="navbar bg-base-100 pr-[12rem] md:pr-0 overflow-hidden">
      <div className="navbar-start">
        <Link to='/'>
          <p className='text-orange-600 text-4xl font-bold pl-3'>Rooster</p>
        </Link>
      </div>
      <div className="navbar-center">
        <Link className="btn btn-ghost md:text-xl" to="/">Home</Link>
        <Link className="btn btn-ghost md:text-xl" to="/menu">Menu</Link>
        <Link className="btn btn-ghost md:text-xl" to="/contact">Contact Us</Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end pr-3" onClick={() => navigate('/cart')}>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {currentUser && (
          <button onClick={handleLogout} className="btn btn-outline btn-primary mr-2">
            Sign Out
          </button>
        )}

        {!currentUser && (
          <Link to='/login'>
            <button className="btn btn-outline btn-primary">Log In</button>
          </Link>
        )}

        {currentUser && (
          currentUser.rest.isAdmin ? (
            <Link to='/adminPanel?tab=addItems'>
              <button className="btn btn-outline btn-primary">Admin Panel</button>
            </Link>
          ) : (
            <Link to='/orders'>
              <button className="btn btn-outline btn-primary">Your Orders</button>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Navbar;
