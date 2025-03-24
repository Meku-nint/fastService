import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Delivery from './pages/Delivery';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignInUp from './pages/SignInUp';
import User from './pages/User';
import UserNavBar from './pages/UserNavBar';
import NavBar from './pages/NavBar';
import DeliveryForUser from './pages/DeliveryForUser';
const App = () => {
  const [home, setHome] = useState(true);

  const UserPageWrapper = () => {
    useEffect(() => {
      setHome(false); // State update here happens after the component mounts
    }, []); // Empty dependency array to ensure it runs once when the component mounts

    return <User />;
  };

  return (
    <div>
      <Router>
        {home ? <NavBar /> : <UserNavBar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignInUp />} />
          <Route path="/delivery_service" element={<Delivery />} />
          <Route path="/user" element={<UserPageWrapper />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path='/delivery'element={<DeliveryForUser/>}/>
        </Routes>
      </Router>
    </div>
  );
};
export default App;