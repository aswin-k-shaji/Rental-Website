import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
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
      if (start <= end) {
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        setTotalAmount(diffDays * productData.pricePerDay * quantity);
      }
    }
  }, [startDate, returnDate, quantity, productData]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return toast.error("User not logged in!");
    if (!productData) return toast.error("Product data is missing.");
    if (!startDate || !returnDate) return toast.error("Please select start and return dates.");
    
    const deliveryInputs = document.querySelectorAll('.place-order-input, .place-order-input-group input');
    for (let input of deliveryInputs) {
      if (!input.value.trim()) return toast.error("Please fill in all fields.");
    }
    
    const deliveryInfo = {
      firstName: deliveryInputs[0].value,
      lastName: deliveryInputs[1].value,
      email: deliveryInputs[2].value,
      street: deliveryInputs[3].value,
      city: deliveryInputs[4].value,
      state: deliveryInputs[5].value,
      zipcode: deliveryInputs[6].value,
      country: deliveryInputs[7].value,
      phone: deliveryInputs[8].value,
    };

    if (!validateEmail(deliveryInfo.email)) return toast.error("Invalid email address.");
    if (!validatePhone(deliveryInfo.phone)) return toast.error("Invalid phone number. Must be 10 digits.");
    
    const orderData = {
      userId,
      itemId: productId,
      ownerId: productData.owner,
      startDate,
      returnDate,
      totalAmount,
      quantity,
      paymentMethod: method,
      deliveryInfo,
    };
    
    try {
      await axios.post("http://localhost:4000/api/order/place", orderData);
      toast.success("Order placed successfully!");
      navigate('/profile/orders');
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      toast.error("Failed to place order. Try again.");
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return productData ? (
    <div className="place-order-container">
      <div className="place-order-left">
        <Title text1={'DELIVERY'} text2={'INFORMATION'} />
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
          <label>Start Date</label>
          <input type="date" min={today} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="date-input" />
          <label>Return Date</label>
          <input type="date" min={startDate || today} value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className="date-input" />
        </div>
        <div className="place-order-input-group">
          <label>Quantity</label>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="quantity-input" />
        </div>
      </div>
      <div className="place-order-right">
        {productData && (
          <div className="product-image">
            <img style={{ width: '400px' }} src={productData.image[0]} alt={productData.title} />
            <p>Price per Day: <span style={{ fontSize: '20px', fontWeight: '600', color: 'lightgreen' }}>{productData.pricePerDay}</span></p>
          </div>
        )}
        <Title text1={'PAYMENT'} text2={'METHOD'} />
        <div className="payment-methods">
          <div onClick={() => setMethod('cod')} className="payment-method">
            <p className={`${method === 'cod' ? 'selected' : ''}`}></p>
            <p>CASH ON DELIVERY</p>
          </div>
        </div>
        <p style={{ fontSize: '25px', fontWeight: '400', color: 'black' }}>Total Amount: {totalAmount}</p>
        <button className="confirm-order-button" onClick={handlePlaceOrder}>CONFIRM ORDER</button>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PlaceOrder;
