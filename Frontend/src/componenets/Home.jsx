import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-0 md:p-10 hero-size">
      <div
        className="hero w-full md:w-[calc(100%-5rem)] h-[80vh]"
        style={{
          backgroundImage: 'url(https://bullardcharger.com/wp-content/uploads/2024/01/image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Order your favourite food here</h1>
            <p className="mb-5 text-white text-lg">
            Welcome to Rooster, where culinary passion meets exquisite flavors. Indulge in our carefully crafted dishes, prepared with the freshest ingredients and a touch of love. Join us for an unforgettable dining experience that will delight your senses and leave you craving more.
            </p>
            <Link to='/menu'>
            <button className="btn btn-primary">View menu</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
