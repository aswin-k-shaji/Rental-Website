import React, { useState } from 'react';
import './add.css';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Additem = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');
  const [numberOfItems, setNumberOfItems] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const formData = new FormData();

      // Retrieve user ID from local storage
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not logged in!");
        setLoading(false);
        return;
      }

      formData.append("title", title);
      formData.append("description", description);
      formData.append("pricePerDay", price);
      formData.append("category", category);
      formData.append("contact", contact);
      formData.append("location", location);
      formData.append("NumberOfItems", numberOfItems);
      formData.append("owner", userId);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      console.log("Submitting form...");

      const res = await axios.post(backendUrl + "/api/product/add", formData);

      if (res.data.success) {
        toast.success(res.data.message);
        // Clear form fields
        setTitle("");
        setDescription("");
        setCategory("");
        setContact("");
        setLocation("");
        setPrice("");
        setNumberOfItems("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="add-form">
      <div>
        <p className="add-label">Upload images</p>
        <div className="add-upload-container">
          <label htmlFor="image1" className="add-upload-label">
            <img className="add-upload-img" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2" className="add-upload-label">
            <img className="add-upload-img" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3" className="add-upload-label">
            <img className="add-upload-img" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4" className="add-upload-label">
            <img className="add-upload-img" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div>
        <p className="add-label">Item name</p>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Type here"
          type="text"
          className="add-input"
          required
          disabled={loading}
        />
      </div>
      <p>* Include all the details about the item in detail</p>
      <div>
        <p className="add-label">Item Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="add-textarea"
          placeholder="Type here"
          disabled={loading}
        ></textarea>
      </div>

      <div>
        <p className="add-label">Address</p>
        <textarea
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          type="text"
          placeholder="Type address here"
          className="add-input"
          required
          disabled={loading}
        />
      </div>

      <div>
        <p className="add-label">Quantity</p>
        <input
          onChange={(e) => setNumberOfItems(e.target.value)}
          value={numberOfItems}
          type="number"
          min="1"
          placeholder="Number of Items"
          className="add-input"
          required
          disabled={loading}
        />
      </div>

      <div className="add-row">
        <div>
          <p className="add-label">Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="add-select"
            disabled={loading}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Electronics">Electronics</option>
            <option value="Machines">Machines</option>
            <option value="House">House/Rooms</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div>
          <p className="add-label">Contact number</p>
          <input
            onChange={(e) => setContact(e.target.value)}
            value={contact}
            placeholder="Mobile number"
            type="number"
            className="add-input"
            required
            disabled={loading}
          />
        </div>

        <div>
          <p className="add-label">Price/per day</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            placeholder="Rs"
            className="add-input"
            required
            disabled={loading}
          />
        </div>
      </div>

      <button type="submit" className="add-button" disabled={loading}>
        {loading ? 'Submitting...' : 'Add Item'}
      </button>
    </form>
  );
};

export default Additem;
