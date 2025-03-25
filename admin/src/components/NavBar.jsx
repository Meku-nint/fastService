import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faHome, faChartBar, faComment, faCartShopping, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed w-full top-0 left-0 z-50 bg-green-600 shadow-md'>
      <div className='flex items-center justify-between p-4'>
        <div className={`${isOpen?'hidden':"text-white text-xl font-semibold"}`}>Admin Panel</div>
        
        <button onClick={() => setIsOpen(!isOpen)} className=' text-white text-2xl sm:hidden focus:outline-none '>
          <FontAwesomeIcon icon={isOpen ? null : faBars} />
        </button>       
        <div className={`sm:flex gap-2 ${isOpen ? 'flex flex-col  gap-2 ' : 'hidden'} sm:flex-row sm:items-center`}> 
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
          <p className=' text-white cursor-pointer  text-3xl p-2 bg-black rounded-md sm:hidden ml-auto' onMouseOver={()=>setIsOpen(false)}><FontAwesomeIcon icon={isOpen? faTimes : null} />
          </p>
        </div>
      </div>
    </div>
  );
}
export default NavBar;