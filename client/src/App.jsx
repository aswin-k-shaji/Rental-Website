import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login.jsx'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar.jsx'
import SingleItem from './pages/SingleItem.jsx'
import Footer from './components/Footer.jsx'
import Searchbar from './components/Searchbar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Searchbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/collection' element={<Collection/>}/>  
        <Route path='/about' element={<About/>}/>    
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product/:productId' element={<Product/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/item/:id" element={<SingleItem />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/place-order/:productId' element={<PlaceOrder/>}/>   
        <Route path='/orders' element={<Orders/>}/>  
        <Route path="/profile/*" element={<Profile/>} />
     </Routes>
     <Footer/>
    </div>
  )
}

export default App