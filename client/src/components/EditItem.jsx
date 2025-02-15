import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import './EditItem.css';
import { assets } from '../assets/assets';

const EditItem = ({ product, onClose }) => {
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [images, setImages] = useState([null, null, null, null]);
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    useEffect(() => {
        if (product) {
            console.log('Initializing with product:', product);
            setUpdatedProduct(product);
            setImages([
                product.image?.[0] || null,
                product.image?.[1] || null,
                product.image?.[2] || null,
                product.image?.[3] || null
            ]);
        }
    }, [product]);

    const handleChange = (e) => {
        const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        setUpdatedProduct(prev => ({
            ...prev,
            [e.target.name]: value
        }));
    };

    const handleImageChange = (index, file) => {
        const newImages = [...images];
        newImages[index] = file;
        setImages(newImages);
    };

    const uploadImagesToCloudinary = async () => {
        setUploadingImages(true);

        try {
            const uploadedImageUrls = await Promise.all(
                images.map(async (img, index) => {
                    if (!img || typeof img === 'string') {
                        return img; // Keep existing image URLs
                    }

                    try {
                        const formData = new FormData();
                        formData.append('file', img);
                        formData.append('upload_preset', 'your_upload_preset');

                        const response = await axios.post('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', formData);

                        console.log(`Uploaded image ${index + 1}:`, response.data.secure_url);

                        // Introduce a delay to allow Cloudinary to process the image
                        await new Promise(resolve => setTimeout(resolve, 1000));

                        return response.data.secure_url;
                    } catch (error) {
                        console.error(`Error uploading image ${index + 1}:`, error);
                        return img;
                    }
                })
            );

            console.log('Uploaded Images:', uploadedImageUrls);
            return uploadedImageUrls;
        } catch (error) {
            console.error('Image upload failed:', error);
            toast.error('Failed to upload images.');
            return images;
        } finally {
            setUploadingImages(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            console.log('Product prop:', product);
            console.log('Updated Product:', updatedProduct);

            const productId = product?._id || updatedProduct?._id;

            if (!productId) {
                toast.error("Product ID is missing!");
                console.error('Product ID not found in:', { product, updatedProduct });
                setLoading(false);
                return;
            }

            // Upload images first with delay
            const uploadedImages = await uploadImagesToCloudinary();

            const formData = new FormData();
            formData.append('id', productId);

            // Append all fields to formData
            Object.entries({
                title: updatedProduct.title,
                description: updatedProduct.description,
                category: updatedProduct.category,
                pricePerDay: updatedProduct.pricePerDay,
                contact: updatedProduct.contact,
                location: updatedProduct.location
            }).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            // Append uploaded images
            uploadedImages.forEach((img, index) => {
                if (img) {
                    formData.append(`image${index + 1}`, img);
                }
            });

            // Log all formData entries
            for (let pair of formData.entries()) {
                console.log('FormData entry:', pair[0], pair[1]);
            }

            const response = await axios.patch(
                `${backendUrl}/api/product/update`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            if (response.data.success) {
                toast.success("Product updated successfully!");
                setTimeout(() => onClose(), 1500);
            } else {
                throw new Error(response.data.message || "Failed to update product");
            }
        } catch (error) {
            console.error('Update error details:', {
                error: error,
                response: error.response?.data,
                message: error.message
            });
            toast.error(error.response?.data?.message || error.message || "Error updating product");
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return null;
    }

    return (
        <div className="modal-overlay">
            {(uploadingImages || loading) && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p>{uploadingImages ? 'Uploading images, please wait...' : 'Saving product...'}</p>
                </div>
            )}
            <div className="modal">
                <h2>Edit Product {product.title}</h2>
                <p>Title</p>
                <input
                    type="text"
                    name="title"
                    value={updatedProduct.title || ''}
                    onChange={handleChange}
                    placeholder="Title"
                />
                <p>Description</p>
                <textarea
                    name="description"
                    value={updatedProduct.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                ></textarea>
                <p>Category</p>
                <input
                    type="text"
                    name="category"
                    value={updatedProduct.category || ''}
                    onChange={handleChange}
                    placeholder="Category"
                />
                <p>Price Per Day</p>
                <input
                    type="number"
                    name="pricePerDay"
                    value={updatedProduct.pricePerDay || ''}
                    onChange={handleChange}
                    placeholder="Price Per Day"
                />
                <p>Location</p>
                <input
                    type="text"
                    name="location"
                    value={updatedProduct.location || ''}
                    onChange={handleChange}
                    placeholder="Location"
                />
                <p>Mobile number</p>
                <input
                    type="number"
                    name="contact"
                    value={updatedProduct.contact || ''}
                    onChange={handleChange}
                    placeholder="Contact"
                />

                <div className="form-group">
                    <label>Upload Images (Max: 4)</label>
                    <div className="image-upload-container">
                        {images.map((image, index) => (
                            <div key={index} className="image-upload-wrapper">
                                <input
                                    type="file"
                                    id={`image-upload-${index}`}
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                                    className="hidden-input"
                                    hidden
                                />
                                <label htmlFor={`image-upload-${index}`} className="image-upload-label">
                                    <img
                                        className="image-upload-preview"
                                        src={image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : assets.upload_area}
                                        alt={`Upload Preview ${index + 1}`}
                                    />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSubmit} disabled={loading || uploadingImages}>
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditItem;
