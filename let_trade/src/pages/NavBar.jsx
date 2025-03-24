import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faComment, faTractor, faUserPlus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="flex justify-around items-center bg-gray-800 p-4 fixed top-0 left-0 right-0">
      <NavLink 
        to="/" 
        end 
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </NavLink>
      <NavLink 
        to="/delivery_service" 
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faTractor} /> Delivery Service
      </NavLink>
      <NavLink 
        to="/feedback" 
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faComment} /> Feedback
      </NavLink>
      <NavLink 
        to="/about" 
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faUser} /> About
      </NavLink>
      <NavLink 
        to="/signup"
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faUserPlus} /> Signup
      </NavLink>
      <a 
        href="#carts" 
        className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors"
      >
    <FontAwesomeIcon icon={faCartShopping} /> Carts
      </a>
    
    </div>
  );
};

export default NavBar;
