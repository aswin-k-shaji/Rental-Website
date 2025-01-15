import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditProductModal.css';

const EditProductModal = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({ ...product });
    const [existingImages, setExistingImages] = useState(product.image || []);
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (existingImages.length + files.length > 4) {
            toast.error("You can upload a maximum of 4 images.");
            return;
        }
        setNewImages(files);
    };

    const handleRemoveImage = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('id', updatedProduct._id);
            formData.append('title', updatedProduct.title);
            formData.append('description', updatedProduct.description);
            formData.append('category', updatedProduct.category);
            formData.append('pricePerDay', updatedProduct.pricePerDay);
            formData.append('location', updatedProduct.location);
            formData.append('contact', updatedProduct.contact);

            // Append existing images
            existingImages.forEach((img, index) => {
                formData.append(`image${index + 1}`, img);
            });

            // Append new images
            newImages.forEach((file, index) => {
                formData.append(`image${existingImages.length + index + 1}`, file);
            });

            const res = await axios.put(`${backendUrl}/api/product/update`, formData);
            if (res.data.success) {
                toast.success("Product updated successfully!");
                setTimeout(() => onClose(), 1500);
            } else {
                toast.error("Failed to update product.");
            }
        } catch (error) {
            toast.error("Error updating product.");
        }
        setLoading(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit Product</h2>
                <input type="text" name="title" value={updatedProduct.title} onChange={handleChange} placeholder="Title" />
                <textarea name="description" value={updatedProduct.description} onChange={handleChange} placeholder="Description"></textarea>
                <input type="text" name="category" value={updatedProduct.category} onChange={handleChange} placeholder="Category" />
                <input type="number" name="pricePerDay" value={updatedProduct.pricePerDay} onChange={handleChange} placeholder="Price Per Day" />
                <input type="text" name="location" value={updatedProduct.location} onChange={handleChange} placeholder="Location" />
                <input type="text" name="contact" value={updatedProduct.contact} onChange={handleChange} placeholder="Contact" />

                <label>Upload New Images (Max: 4)</label>
                <input type="file" multiple onChange={handleImageChange} />

                <div className="image-preview">
                    {existingImages.map((img, index) => (
                        <div key={index} className="image-container">
                            <img src={img} alt={`Preview ${index}`} />
                            <button className="remove-btn" onClick={() => handleRemoveImage(index)}>X</button>
                        </div>
                    ))}
                    {newImages.map((file, index) => (
                        <div key={index + existingImages.length} className="image-container">
                            <img src={URL.createObjectURL(file)} alt={`New ${index}`} />
                        </div>
                    ))}
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;
