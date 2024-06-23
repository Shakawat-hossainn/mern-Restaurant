import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signinFailure,signinStart,signinSuccess } from '../features/User/userSlice'

const Login = () => {
  const url = "https://mern-restaurant-backend-0xmm.onrender.com"
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {loading,error:errorMessage} = useSelector((store) => store.user)
  
const [formData, setFormData] = useState([])

const handleChange=(e)=>{
  setFormData({...formData,[e.target.name]:e.target.value})
  
}

const handleSubmit =async(e)=>{
  e.preventDefault()
  dispatch(signinStart())
  try {
    
    const res = await fetch(`${url}/api/v1/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    })
  const data = await res.json()
 // console.log('Response data:', data)
  if(res.ok){
   dispatch(signinSuccess(data))
   
    navigate('/menu')
    
  }else(
    dispatch(signinFailure(data.message))
  )
  } catch (error) {
   console.log(error) 
  }
  
}

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 login-size">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Log in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit} method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required onChange={handleChange}
              className="pl-3 pr-3  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required onChange={handleChange}
              className="pl-3 pr-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {loading?(<span className="loading loading-dots loading-md"></span>):('   Log in') }
         
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link to='/signup' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
         Sign up
        </Link>
      </p>
      {errorMessage && <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{errorMessage}</span>
</div>}
    </div>
  </div>
  )
}

export default Login
