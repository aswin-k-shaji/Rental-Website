import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Home from '../components/Home';
import Items from '../components/Items';
import Orders from '../components/Orders';
import Request from '../components/Request';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile-container">
      <Sidebar />
      <div className="profile-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="items" element={<Items />} />
          <Route path="orders" element={<Orders />} />
          <Route path="request" element={<Request />} />
        </Routes>
      </div>
    </div>
  );
};
export default Profile;
