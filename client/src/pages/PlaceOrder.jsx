import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import { ShopeContext } from '../context/ShopeContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopeContext);
  const [method, setMethod] = useState('cod');
  const [startDate, setStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
    }
  }, [productId, products]);

  useEffect(() => {
    if (startDate && returnDate && productData) {
      const start = new Date(startDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const amount = diffDays * productData.pricePerDay * quantity;
      setTotalAmount(amount);
    }
  }, [startDate, returnDate, quantity, productData]);

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    if (!productData) {
      toast.error("Product data is missing.");
      return;
    }

    const ownerId = productData.owner ? productData.owner: null;
    if (!ownerId) {
      toast.error("Owner ID not found.");
      return;
    }

    if (!startDate || !returnDate) {
      toast.error("Please select start and return dates.");
      return;
    }

    const deliveryInfo = {
      firstName: document.querySelector('input[placeholder="Firstname"]').value,
      lastName: document.querySelector('input[placeholder="Lastname"]').value,
      email: document.querySelector('input[placeholder="Email"]').value,
      street: document.querySelector('input[placeholder="Street"]').value,
      city: document.querySelector('input[placeholder="City"]').value,
      state: document.querySelector('input[placeholder="State"]').value,
      zipcode: document.querySelector('input[placeholder="Zipcode"]').value,
      country: document.querySelector('input[placeholder="Country"]').value,
      phone: document.querySelector('input[placeholder="Phone"]').value,
    };

    const orderData = {
      userId,
      itemId: productId,
      ownerId,
      startDate,
      returnDate,
      totalAmount,
      paymentMethod: method,
      deliveryInfo,
    };

    try {
      const response = await axios.post("http://localhost:4000/api/order/place", orderData);
      toast.success("Order placed successfully!");
      navigate('/profile/orders');
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      toast.error("Failed to place order. Try again.");
    }
  };

  return productData ? (
    <div className="place-order-container">
      {/* Left Side */}
      <div className="place-order-left">
        <div className="place-order-title">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="place-order-input-group">
          <input type="text" placeholder="Firstname" />
          <input type="text" placeholder="Lastname" />
        </div>
        <input className="place-order-input" type="email" placeholder="Email" />
        <input className="place-order-input" type="text" placeholder="Street" />
        <div className="place-order-input-group">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="place-order-input-group">
          <input type="number" placeholder="Zipcode" />
          <input type="text" placeholder="Country" />
        </div>
        <input className="place-order-input" type="number" placeholder="Phone" />
        <div className="place-order-input-group">
          <div className="dates">
            <label htmlFor="startDate">Start Date</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
            <label htmlFor="returnDate">Return Date</label>
            <input
              id="returnDate"
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="qt">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="quantity-input"
            />
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="place-order-right">
        {productData && (
          <div className="product-image">
            <img style={{ width: '400px' }} src={productData.image[0]} alt={productData.title} />
            <p>Price per Day: <span style={{ fontSize: '20px', fontWeight: '600', color: 'lightgreen' }}>{productData.pricePerDay}</span></p>
          </div>
        )}

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className="payment-methods">
            <div className="payment-method">
              <p className={`${method === 'stripe' ? 'selected' : ''}`}></p>
              <img onClick={() => setMethod('stripe')} src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div className="payment-method">
              <p className={`${method === 'razorpay' ? 'selected' : ''}`}></p>
              <img onClick={() => setMethod('razorpay')} src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div onClick={() => setMethod('cod')} className="payment-method">
              <p className={`${method === 'cod' ? 'selected' : ''}`}></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: '25px', fontWeight: '400', color: 'black' }}>Total Amount: {totalAmount}</p>
            <button className="confirm-order-button" onClick={handlePlaceOrder}>CONFIRM ORDER</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PlaceOrder;