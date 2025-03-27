import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faUser, faComment, faTractor, 
  faUserPlus, faCartShopping, faBars, faTimes 
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl">
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>
      </div>
      <div className={`flex flex-col md:flex-row items-center md:justify-around bg-gray-800 absolute md:static left-0 right-0 w-full md:w-auto transition-all duration-300 ease-in-out ${isOpen ? "top-12" : "-top-96"}`}>
        {[
          { to: "/", icon: faHome, label: "Home" },
          { to: "/delivery_service", icon: faTractor, label: "Delivery Service" },
          { to: "/feedback", icon: faComment, label: "Feedback" },
          { to: "/about", icon: faUser, label: "About" },
          { to: "/signup", icon: faUserPlus, label: "Signup" }
        ].map(({ to, icon, label }) => (
          <NavLink onClick={()=>setIsOpen(false)}
            key={to} 
            to={to} 
            end 
            className={({ isActive }) =>
              `text-white flex items-center gap-2 p-3 text-lg w-full md:w-auto transition-colors rounded 
              ${isActive ? "bg-gray-700 font-bold" : "hover:bg-gray-700 hover:text-yellow-500"}`
            }
          >
            <FontAwesomeIcon icon={icon} /> {label}
          </NavLink>
        ))}
        <a href="#carts" className="text-white flex items-center gap-2 p-3 text-lg w-full md:w-auto hover:bg-gray-700 hover:text-yellow-500 transition-colors">
          <FontAwesomeIcon icon={faCartShopping} /> Carts
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
