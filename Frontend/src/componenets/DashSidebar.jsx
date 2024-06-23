import React, { useEffect, useState } from 'react'
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { IoIosAdd  } from "react-icons/io";
import { FaClipboardCheck  } from "react-icons/fa";
import { CiBoxList } from "react-icons/ci";
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
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
    <Sidebar aria-label="Default sidebar example" className='w-full md:w-auto'>
    <Sidebar.Items>
      <Sidebar.ItemGroup>
        <Link to='/adminPanel?tab=addItems'>
        <Sidebar.Item as={'div'}  active={tab==='addItems'} icon={IoIosAdd}>
          Add Items
        </Sidebar.Item>
        </Link>
        <Link to='/adminPanel?tab=listItems'>
        <Sidebar.Item as={'div'} active={tab==='listItems'} icon={CiBoxList}  labelColor="dark">
          List Items
        </Sidebar.Item>
        </Link>
        <Link to='/adminPanel?tab=orders'>
        <Sidebar.Item as={'div'} active={tab==='orders'} icon={FaClipboardCheck } label="3">
          Orders
        </Sidebar.Item>
        </Link>
       
    
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  )
}

export default DashSidebar
