import React from 'react';
import { NavLink } from 'react-router-dom';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faUser,faHome,faChartBar,faComment,faTractor,faUserPlus,faCartShopping } from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {
  return (
    <div className='flex items-center justify-between p-4 bg-red-500 shadow-md fixed w-full top-0 left-0 z-50'>
      <div className="text-white text-xl font-semibold">Admin Panel</div>
      
      <div className='flex gap-6'>
        <NavLink 
          to='/home' 
          className='text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </NavLink>
        <NavLink 
          to='/add_product' 
          className='text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
          <FontAwesomeIcon icon={faCartShopping} /> Add Product
        </NavLink>

        <NavLink 
          to='/signup' 
          className='text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
          <FontAwesomeIcon icon={faUserPlus} /> Add Admin
        </NavLink>

        <NavLink 
          to='/feedback' 
          className='text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
         <FontAwesomeIcon icon={faComment} /> Feedbacks
        </NavLink>

        <NavLink 
          to='/orders' 
          className='text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300 ease-in-out'
        >
         <FontAwesomeIcon icon={faChartBar} /> Orders
        </NavLink>
      </div>
    </div>
  );
}
export default NavBar;