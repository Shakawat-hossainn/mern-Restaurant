import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
const PrivateRoute = () => {
    const {currentUser} = useSelector((store) => store.user)
   // console.log(currentUser)
    
   
    return currentUser ? <Outlet/> : <Navigate to='/login' />
  }
 
  


export default PrivateRoute
