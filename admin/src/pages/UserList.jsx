import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import './UserList.css';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/user/list`, {
        headers: { token },
      });
      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  // Remove user function
  const removeUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this user?');
    if (!confirmDelete) return;

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/remove`,
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchUsers();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="userlist-container">
      <p className="userlist-title">User Management</p>

      <input
        type="text"
        placeholder="Search users by name or email..."
        className="userlist-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table className="userlist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            {/* <th>User Type</th> */}
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {/* <td>{user.userType}</td> */}
              <td>{user.phoneNumber}</td>
              <td>{user.address}</td>
              <td className="userlist-action">
                <button
                  onClick={() => removeUser(user._id)}
                  className="userlist-button delete"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
