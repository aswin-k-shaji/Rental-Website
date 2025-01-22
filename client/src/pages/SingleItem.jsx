import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { backendUrl } from '../App';
import './SingleItem.css';

const SingleItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.post('http://localhost:4000/api/product/single', { itemId: id });
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

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="single-item-container">
            {product && (
                <div className="product-grid">
                    <div className='left-content' >

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


                                <div className="main" >
                                      <span className="price-value">{product.description}</span>
                                </div>


                    </div>

                    <div className="product-info">
                        <div className="breadcrumb">Home / {product.category} / {product.title}</div>
                        <h1 className="title">{product.title}</h1>
                        <div className="price">
                            Price per day: <span className="price-value">₹{product.pricePerDay}</span>
                        </div>
                        <div className="button-container">
                            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
                            <button className="rent-button">Rent Now</button>
                        </div>
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default SingleItem;
