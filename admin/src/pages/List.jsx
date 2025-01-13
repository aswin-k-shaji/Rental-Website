import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import './list.css';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchList = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/product/list');
      if (res.data.success) {
        setList(res.data.items);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this item?");

    if (!isConfirmed) return;

    try {
      const res = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase()) ||
    item.pricePerDay.toString().includes(searchText)
  );

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list-container">
      <p className="list-title">All Products List</p>

      <input
        type="text"
        placeholder="Search Products"
        className="list-search"
        value={searchText}
        onChange={handleSearch}
      />

      <table className="list-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price per day</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.image[0]} alt={item.title} className="list-image" />
              </td>
              <td>{item.title}</td>
              <td>{item.category}</td>
              <td>{item.pricePerDay} Rs</td>
              <td className="list-action">
                <button className="list-button edit">Edit</button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="list-button delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
