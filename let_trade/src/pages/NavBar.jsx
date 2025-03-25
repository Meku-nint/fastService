import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faComment, faTractor, faChartBar, faCartShopping, faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const UserNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="hidden md:flex justify-around items-center">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `text-white flex items-center gap-2 p-2 rounded transition-colors ${
                isActive ? 'bg-gray-700 text-yellow-500 font-bold' : 'hover:bg-gray-700 hover:text-yellow-500'
              }`
            }
          >
            <FontAwesomeIcon icon={icon} /> {label}
          </NavLink>
        ))}
        <a href="#carts" className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors">
          <FontAwesomeIcon icon={faCartShopping} /> Carts
        </a>
        <a 
          onDoubleClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faRightFromBracket} /> Logout
        </a>
      </div>
      
      <div className="md:hidden flex justify-between items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl focus:outline-none">
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-gray-900 p-4 absolute top-14 left-0 right-0">
          {navItems.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `text-white flex items-center gap-2 p-2 rounded transition-colors ${
                  isActive ? 'bg-gray-700 text-yellow-500 font-bold' : 'hover:bg-gray-700 hover:text-yellow-500'
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              <FontAwesomeIcon icon={icon} /> {label}
            </NavLink>
          ))}
          <a href="#carts" className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors">
            <FontAwesomeIcon icon={faCartShopping} /> Carts
          </a>
          <a 
            onDoubleClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            className="text-white flex items-center gap-2 p-2 hover:bg-gray-700 hover:text-yellow-500 transition-colors cursor-pointer"
          >
            <FontAwesomeIcon icon={faRightFromBracket} /> Logout
          </a>
        </div>
      )}
    </nav>
  );
};

const navItems = [
  { to: '/user', icon: faHome, label: 'Home' },
  { to: '/dashboard', icon: faChartBar, label: 'Dashboard' },
  { to: '/delivery', icon: faTractor, label: 'Delivery Service' },
  { to: '/feedback', icon: faComment, label: 'Feedback' },
  { to: '/about', icon: faUser, label: 'About' },
];

export default UserNavBar;