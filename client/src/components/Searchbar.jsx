import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopeContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const Searchbar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopeContext)
    const [visible,setVisible] = useState(false)
    const location = useLocation()

    useEffect(()=>{
        if (location.pathname.includes('collection')) {
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])

  return showSearch && visible ?(
    <div>
        <div>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder='Search' />
            <img src={assets.search_icon} alt="search" />
        </div>
    </div>
  ):null
}

export default Searchbar