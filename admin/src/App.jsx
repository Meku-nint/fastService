import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import AddProduct from './components/AddProduct'
import Feedback from './components/Feedback'
import SignUpAdmin from './components/SignUpAdmin'
import Orders from './components/Orders';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/orders'element={<Orders/>}/>
          <Route path='/'element={<Login/>}/>
          <Route path='/home'element={<Home/>}/>
          <Route path='/signup'element={<SignUpAdmin/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/feedback'element={<Feedback/>}/>
          <Route path='/add_product'element={<AddProduct  />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App