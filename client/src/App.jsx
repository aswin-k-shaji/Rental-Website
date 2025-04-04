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
import Navbar from './components/Navbar.jsx'
import SingleItem from './pages/SingleItem.jsx'
import Footer from './components/Footer.jsx'
import Searchbar from './components/Searchbar.jsx'
import { ToastContainer, toast } from 'react-toastify';
import Signup from './pages/Signup.jsx'
import Profile from './pages/Profile'
import Category from './pages/Category.jsx'
import Products from './pages/Products.jsx'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

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
        <Route path="/profile/*" element={<Profile/>} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/category" element={<Category/>} />
        </Routes>
     <Footer/>
    </div>
  )
}

export default App