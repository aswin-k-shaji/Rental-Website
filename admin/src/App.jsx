import React, { useEffect, useState } from 'react'
import Navbar from '../src/components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import UserList from './pages/UserList'
import SingleItem from './pages/SingleItem'
// import AddUser from './pages/Adduser'


export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div style={{ overflow: 'hidden' }} >
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        :
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div style={{ display: "flex", marginTop: '30px' }}>
            <Sidebar />
            <div style={{ marginLeft: "40px", flexGrow: 1, paddingTop: '7px' }}>
              <Routes>
                <Route path='/List' element={<List token={token} />} />
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/Orders' element={<Orders token={token} />} />
                <Route path='/users' element={<UserList token={token} />} />
                <Route path='/' element={<Navigate to='/List'/>} />
                <Route path="/product/:id" element={<SingleItem />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App
