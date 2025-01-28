import React, { useContext } from 'react';
import { ShopeContext } from '../context/ShopeContext';
import Title from '../components/Title';
import './Orders.css'

const Orders = () => {
  const { products, currency } = useContext(ShopeContext);

  return (
    <div>
      <div>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>

      <div>
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className="order-item">
              <div className="order-item-details">
                <img src={item.image[0]} alt={item.title} />
                <div>
                  <p>{item.title}</p>
                  <div>
                    <p>{currency}{item.pricePerDay}</p>
                    <p>Quantity: 1</p>
                  </div>
                  <p>Date: <span>25</span></p>
                </div>
              </div>
              <div>
                <div>
                  <p>Item Booked</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
