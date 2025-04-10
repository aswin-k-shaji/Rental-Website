import React, { useEffect, useState, useRef } from 'react';
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
    const [categories, setCategories] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.post(`${backendUrl}/api/product/single`, { itemId: id });
                if (res.data.success) {
                    const item = res.data.item;
                    setProduct(item);
                    setSelectedImage(item.image[0]);
                    fetchCategoryName(item.category);
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

    const fetchCategoryName = async (categoryId) => {
        try {
            const res = await axios.post(`${backendUrl}/api/category/getone`, { categoryId });
            if (res.status === 200) {
                setProduct(prev => ({ ...prev, categoryName: res.data.name }));
            }
        } catch (err) {
            console.error("Error fetching category name:", err);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get(`${backendUrl}/api/category/list`);
                if (res.status === 200) {
                    setCategories(res.data.filter(category => category.isActive));
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []);

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
            const res = await axios.delete(`${backendUrl}/api/product/remove`, { data: { id } });
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowEditModal(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showEditModal]);

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
                        <div className="breadcrumb">Home / {product.categoryName} / {product.title}</div>
                        <h1 className="title">{product.title}</h1>
                        <span className="category">Category: {product.categoryName}</span>
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
            {showEditModal && (
                <div ref={modalRef} className="modal-overlay">
                    <EditProductModal product={product} categories={categories} onClose={() => setShowEditModal(false)} />
                </div>
            )}
        </div>
    );
};

export default SingleItem;
