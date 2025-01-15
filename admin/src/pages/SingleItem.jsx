import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditProductModal from '../components/EditProductModal';
import './SingleItem.css';

const SingleItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.post(`${backendUrl}/api/product/single`, { itemId: id });
                if (res.data.success) {
                    setProduct(res.data.item);
                    setSelectedImage(res.data.item.image[0]);
                } else {
                    setError(res.data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handlePrevImage = () => {
        if (product) {
            const newIndex = (currentImageIndex - 1 + product.image.length) % product.image.length;
            setCurrentImageIndex(newIndex);
            setSelectedImage(product.image[newIndex]);
        }
    };

    const handleNextImage = () => {
        if (product) {
            const newIndex = (currentImageIndex + 1) % product.image.length;
            setCurrentImageIndex(newIndex);
            setSelectedImage(product.image[newIndex]);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            const res = await axios.delete(`${backendUrl}/api/product/remove`, { id },
                { headers: { token } });
            if (res.data.success) {
                toast.success("Product deleted successfully!");
                navigate(-1);
            } else {
                toast.error("Failed to delete product.");
            }
        } catch (error) {
            toast.error("Error deleting product.");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="single-item-container">
            {product && (
                <div className="product-grid">
                    <div className="image-section">
                        <button className="nav-button prev-button" onClick={handlePrevImage}>‹</button>
                        <img src={selectedImage} alt="Selected Product" className="main-image" />
                        <button className="nav-button next-button" onClick={handleNextImage}>›</button>
                        <div className="thumbnail-container">
                            {product.image.map((img, index) => (
                                <img 
                                    key={index} 
                                    src={img} 
                                    alt={`Thumbnail ${index}`}
                                    className={`thumbnail ${selectedImage === img ? 'active-thumbnail' : ''}`}
                                    onClick={() => {
                                        setSelectedImage(img);
                                        setCurrentImageIndex(index);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="breadcrumb">Home / {product.category} / {product.title}</div>
                        <h1 className="title">{product.title}</h1>
                        <span className="category">Category: {product.category}</span>
                        <div className="price"> PricePerDay:<span style={{color:'black',fontWeight:'700'}} >₹{product.pricePerDay}</span> <span className="price-per-day">per day</span></div>
                        <p className="description">{product.description}</p>

                        <div className="button-container">
                            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                            <button className="edit-button" onClick={() => setShowEditModal(true)}>Edit Item</button>
                            <button className="delete-button" onClick={handleDelete}>Delete Item</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && <EditProductModal product={product} onClose={() => setShowEditModal(false)} />}
        </div>
    );
};

export default SingleItem;
