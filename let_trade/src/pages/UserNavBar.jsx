import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faRightFromBracket, faUser, faChartBar, faComment, faTractor, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const UserNavBar = () => {
  return (
    <div className="flex justify-around items-center bg-gray-800 p-4 fixed top-0 left-0 right-0">
      <NavLink 
        to="/user" 
        end 
        className={({ isActive }) => 
          isActive 
            ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
            : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
        }
      >
        <FontAwesomeIcon icon={faHome} /> Home
      </NavLink>
      <NavLink to='/dashboard'
       className={({ isActive }) => 
        isActive 
          ? 'text-white flex items-center gap-2 p-2 bg-gray-700 text-gray-700 font-bold transition-colors rounded '
          : 'text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors'
      }>
        <FontAwesomeIcon icon={faChartBar}/>
        Dashboard
      </NavLink>
      <NavLink 
        to="/delivery" 
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
      <a 
        href="#carts" 
        className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors"
      >
    <FontAwesomeIcon icon={faCartShopping} /> Carts
      </a>
      <a onDoubleClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/';
      }}
        
        className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors cursor-pointer"
      >
    <FontAwesomeIcon icon={faRightFromBracket} /> Logout
      </a>
    </div>
  );
};
export default UserNavBar;