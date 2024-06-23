import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const AdminRoute = () => {
    const {currentUser} = useSelector((store) => store.user)
    
    if(currentUser && currentUser.rest.isAdmin){
      return <Outlet />
    }
    return <Navigate to='/login' />
  }

   


export default AdminRoute
