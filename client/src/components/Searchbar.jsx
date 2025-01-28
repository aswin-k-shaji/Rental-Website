import React, { useContext, useEffect, useState } from 'react'
import { ShopeContext } from '../context/ShopeContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import './Searchbar.css'

const Searchbar = () => {

    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopeContext)
    const [visible, setVisible] = useState(false)
    const location = useLocation()

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        }
        else {
            setVisible(false)
        }
    }, [location])

    return showSearch && visible ? (
        <div className="searchbar-container">
            <div className="searchbar-inner">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder='Search'
                    className="searchbar-input"
                />
                <img src={assets.search_icon} alt="search" className="searchbar-icon" />
            </div>
        </div>
    ) : null
}

export default Searchbar
