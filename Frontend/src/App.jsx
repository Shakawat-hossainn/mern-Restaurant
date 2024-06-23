import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import Navbar from './componenets/Navbar'
import Home from './componenets/Home'
import Menu from './componenets/Menu'
import Login from './componenets/Login'
import Signup from './componenets/Signup'
import PrivateRoute from './componenets/PrivateRoute'
import Contact from './componenets/Contact'
import Footer from './componenets/Footer'
import AdminRoute from './componenets/AdminRoute'
import AdminPanel from './componenets/AdminPanel'
import Cart from './componenets/Cart'
import Checkout from './componenets/Checkout'
import Payment from './componenets/Payment'
import Orders from './componenets/Orders'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/menu" element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/orders' element={<Orders />} />
         
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/adminPanel" element={<AdminPanel />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer/>
    </BrowserRouter>
   
  )
}

export default App
