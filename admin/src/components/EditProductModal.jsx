import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import './EditProductModal.css';
import { assets } from '../assets/assets';

const EditProductModal = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [images, setImages] = useState([null, null, null, null]);
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [categories, setCategories] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        if (product) {
            setUpdatedProduct(product);
            setImages([
                product.image?.[0] || null,
                product.image?.[1] || null,
                product.image?.[2] || null,
                product.image?.[3] || null
            ]);
        }
        fetchCategories();
    }, [product]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/category/list`);
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Failed to fetch categories");
        }
    };

    const handleChange = (e) => {
        setUpdatedProduct(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newImages = [...images];
            newImages[index] = file;
            setImages(newImages);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const productId = product?._id || updatedProduct?._id;
            if (!productId) {
                toast.error("Product ID is missing!");
                setLoading(false);
                return;
            }
            const formData = new FormData();
            formData.append('id', productId);
            Object.entries(updatedProduct).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });
            images.forEach((image, index) => {
                if (image) {
                    formData.append(`image${index}`, image);
                }
            });
            const response = await axios.patch(
                `${backendUrl}/api/product/update`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            if (response.data.success) {
                toast.success("Product updated successfully!");
                setTimeout(() => onClose(), 1500);
            } else {
                throw new Error(response.data.message || "Failed to update product");
            }
        } catch (error) {
            console.error("Update error details:", error);
            toast.error(error.response?.data?.message || "Error updating product");
        } finally {
            setLoading(false);
        }
    };

    if (!product) return null;

    return (
        <div className="modal-overlay">
            {(uploadingImages || loading) && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>{uploadingImages ? 'Uploading images, please wait...' : 'Saving product...'}</p>
                </div>
            )}
            <div className="modal" ref={modalRef}>
                <h2>Edit Product {product.title}</h2>
                <p>Title</p>
                <input type="text" name="title" value={updatedProduct.title || ''} onChange={handleChange} placeholder="Title" />
                <p>Description</p>
                <textarea name="description" value={updatedProduct.description || ''} onChange={handleChange} placeholder="Description"></textarea>
                <p>Category</p>
                <select name="category" value={updatedProduct.category || ''} onChange={handleChange}>
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
                <p>Price Per Day</p>
                <input type="number" name="pricePerDay" value={updatedProduct.pricePerDay || ''} onChange={handleChange} placeholder="Price Per Day" />
                <p>Location</p>
                <input type="text" name="location" value={updatedProduct.location || ''} onChange={handleChange} placeholder="Location" />
                <p>Mobile number</p>
                <input type="number" name="contact" value={updatedProduct.contact || ''} onChange={handleChange} placeholder="Contact" />
                <p>Upload Images</p>
                <div className="image-upload-container">
                    {images.map((img, index) => (
                        <div key={index} className="image-upload-box">
                            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, index)} />
                            {img && <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} alt={`Preview ${index}`} className="image-preview" />}
                        </div>
                    ))}
                </div>
                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading || uploadingImages}>{loading ? 'Saving...' : 'Save'}</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditProductModal;