import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopeContext } from '../context/ShopeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import RelatedProducts from '../components/RelatedProducts';
import { assets } from '../assets/assets';
import './Product.css';
import Title from '../components/Title';
import Review from '../components/Review';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopeContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState();
  const [reservedDates, setReservedDates] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage


  // Fetch product details
  useEffect(() => {
    window.scrollTo(0, 0);
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  // Fetch reserved dates from orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/order/all-orders");
        const orders = response.data.orders.filter(order => order.itemId._id === productId);

        let dates = [];
        orders.forEach(order => {
          let currentDate = new Date(order.startDate);
          let returnDate = new Date(order.returnDate);
          while (currentDate <= returnDate) {
            dates.push(currentDate.toISOString().split('T')[0]); // Store date in YYYY-MM-DD format
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });
        const product = await Product.findById(productId).populate("category", "name");

        setReservedDates(dates);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [productId]);

  const handleAddToCart = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You need to log in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/user/add-to-cart", {
        userId,
        productId,
      });
      toast.success(response.data.message || 'Product added to cart!');
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const handleBookNow = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/place-order/${productId}`);
    } else {
      alert("You need to log in to book this item.");
      navigate("/login");
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      if (reservedDates.includes(formattedDate)) {
        return 'reserved-date';
      }
    }
    return null;
  };

  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    if (reservedDates.includes(formattedDate)) {
      toast.error("");
    }
  };

  return productData ? (
    <div className="product-page">
      <div className="product-container">
        <div className="product-images-section">
          <div className="main-image">
            <img src={image} alt="Main Product" />
          </div>
          <div className="thumbnail-images">
            {productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                alt={`Product Image ${index + 1}`} 
              />
            ))}
          </div>
        </div>
        <div className="product-details">
          <div className="product-rating">
              {/* <img src={assets.star_icon} alt="Star" />
              <img src={assets.star_icon} alt="Star" />
              <img src={assets.star_icon} alt="Star" />
              <img src={assets.star_icon} alt="Star" />
              <img src={assets.star_dull_icon} alt="Star" /> */}
          </div>
          <h1 className="product-title">{productData.title}</h1>

          <span>(122 reviews)</span>

          <div className="product-price">{currency}{productData.pricePerDay}</div>
          <p className="product-contact">Contact: {productData.contact}</p>
          <p className="product-category">Category: {productData.category}</p>
          <p className="product-category">Category: {productData.category?.name || "Unknown"}</p>
          <p style={{color:'red'}} className="product-category">Available: {productData.Available}/{productData.NumberOfItems}</p>
          <p className="product-owner">
            Owner: {typeof productData.owner === 'object' ? `${productData.owner.name} (${productData.owner.email})` : productData.owner}
          </p>
          <p className="product-location">Location: {productData.location}</p>
          <div className="butt">
          <button onClick={handleAddToCart} className="add-to-favorite">Save</button>
          <button onClick={handleBookNow} className="add-to-favorite">Book Now</button>
          </div>


        </div>
      </div>
                {/* Availability Calendar */}
          <div className="availability-calendar">
            <Calendar
              tileClassName={tileClassName}
              onClickDay={handleDateClick}
              showNavigation={true}
              showNeighboringMonth={false}
              view="month"
            />
            <div className="description-review">
              <div className="description-review-header">
                <Title text1={'DESCRIPTION'} ></Title>
              </div>
              <div className="review-content">
                <h3>Product Details</h3>
                <div className="description-box">
                  {productData.description.split("\n").map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
              <Review productId={productId} userId={userId} />
          </div>
      
      <RelatedProducts category={productData.category} />

    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
