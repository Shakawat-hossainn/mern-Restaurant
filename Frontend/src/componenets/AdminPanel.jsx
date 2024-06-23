import React, { useEffect, useState } from 'react'
import DashSidebar from './DashSidebar'
import { useLocation } from 'react-router-dom'
import DashAddItems from './DashAddItems'
import DashListItems from './DashListItems'
import DashOrders from './DashOrders'
const AdminPanel = () => {
  const [tab, setTab] = useState('')
  const location = useLocation()
useEffect(() => {
  const urlParams = new URLSearchParams(location.search)
  const getParams = urlParams.get('tab')
  if(getParams){
    setTab(getParams)
  }

}, [location.search])


  return (
    <div className='flex min-h-screen flex-col md:flex-row '>
      <div className='' >
        <DashSidebar/>
      </div>
      <div className={tab==='addItems'?'':"w-full"}>
       {tab==='addItems' && <DashAddItems/>}
       {tab==='listItems' && <DashListItems/>}
       {tab==='orders' && <DashOrders/>}
      </div>
    </div>
  )
}

export default AdminPanel
