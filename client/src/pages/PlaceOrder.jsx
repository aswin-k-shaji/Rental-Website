import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopeContext } from '../context/ShopeContext';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopeContext);
  const [method, setMethod] = useState('cod');
  const [startDate, setStartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [quantity, setQuantity] = useState(1); // Added state for quantity
  const [productData, setProductData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    setProductData(product);
  }, [productId, products]);

  const calculateAmount = () => {
    if (startDate && returnDate && productData) {
      const start = new Date(startDate);
      const end = new Date(returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      const amount = diffDays * productData.pricePerDay * quantity; // Include quantity in calculation
      setTotalAmount(amount);
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [startDate, returnDate, quantity, productData]); // Add quantity to dependency array

  return productData ? (
    <div className="place-order-container">
      {/* left side */}
      <div className="place-order-left">
        <div className="place-order-title">
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className="place-order-input-group">
          <input type="text" placeholder='Firstname' />
          <input type="text" placeholder='Lastname' />
        </div>
        <input className="place-order-input" type="email" placeholder='Email' />
        <input className="place-order-input" type="text" placeholder='Street' />
        <div className="place-order-input-group">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className="place-order-input-group">
          <input type="number" placeholder='Zipcode' />
          <input type="text" placeholder='Country' />
        </div>
        <input className="place-order-input" type="number" placeholder='Phone' />
        <div className="place-order-input-group">
          <div className='dates' >
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="date-input"
          />
          <label htmlFor="returnDate">Return Date</label>
          <input
            id="returnDate"
            type="date"
            placeholder="Return Date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="date-input"
          />
          </div>
          <div className='qt' >
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            min="1"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
          /></div>
        </div>
      </div>
      {/* right side */}
      <div className="place-order-right">
        {productData && (
          <div className="product-image">
            <img style={{width:'400px'}} src={productData.image[0]} alt={productData.title} />
            <p>Price per Day :<span style={{fontSize:'20px',fontWeight:'600',color:'lightgreen'}} > {productData.pricePerDay}</span></p>
          </div>
        )}

        <div>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* payment method selection */}
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
            <p style={{fontSize:'25px',fontWeight:'400',color:'black'}} >Total Amount: {totalAmount}</p>
            <button className="confirm-order-button" onClick={() => navigate('/Orders')}>CONFIRM ORDER</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default PlaceOrder;
