import React, { useEffect, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/Order/all-orders");
        setOrders(response.data.orders);
        setFilteredOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Filter and sort orders based on search term and sort order
    let result = [...orders];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter((order) => {
        const searchString = searchTerm.toLowerCase();
        const user = order.userId || {};
        const owner = order.ownerId || {};
        const item = order.itemId || {};
        
        return (
          order._id.toLowerCase().includes(searchString) ||
          (user.name || "").toLowerCase().includes(searchString) ||
          (user.email || "").toLowerCase().includes(searchString) ||
          (owner.name || "").toLowerCase().includes(searchString) ||
          (item.title || "").toLowerCase().includes(searchString)
        );
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(result);
  }, [searchTerm, sortOrder, orders]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Title text1={'ORDERS'} text2={'MANAGEMENT'} />
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #ddd'
            }}
          />
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '200px'
          }}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse' }}>
          <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Owner</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Delivery Information</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Item Details</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Customer</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Dates</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Payment</th>
              <th style={{ padding: '16px', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const user = order.userId || {};
              const owner = order.ownerId || {};
              const item = order.itemId || {};
              const delivery = order.deliveryInfo || {};

              return (
                <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{order._id}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{formatDate(order.createdAt)}</div>
                  </td>

                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{owner.name || "Unknown Owner"}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{owner.email || "No Email"}</div>
                  </td>


                  <td style={{ padding: '16px' }}>
                    <div>{delivery.firstName} {delivery.lastName}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {delivery.street}<br />
                      {delivery.city}, {delivery.state} {delivery.zipcode}<br />
                      {delivery.country}
                    </div>
                    <div style={{ fontSize: '14px' }}>📞 {delivery.phone}</div>
                  </td>

                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{item.title || "No Title"}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>₹{item.pricePerDay || "N/A"}/day</div>
                  </td>


                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>{user.name || "Unknown User"}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>{user.email || "No Email"}</div>
                  </td>



                  <td style={{ padding: '16px' }}>
                    <div style={{ fontSize: '14px' }}>
                      <strong>Start:</strong> {formatDate(order.startDate)}
                    </div>
                    <div style={{ fontSize: '14px' }}>
                      <strong>Return:</strong> {formatDate(order.returnDate)}
                    </div>
                  </td>

                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 500 }}>₹{order.totalAmount || "N/A"}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {order.paymentMethod?.toUpperCase() || "Unknown"}
                    </div>
                  </td>

                  <td style={{ padding: '16px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '14px',
                      backgroundColor: order.orderStatus === 'completed' ? '#dcfce7' : 
                                     order.orderStatus === 'pending' ? '#fef9c3' : '#f3f4f6',
                      color: order.orderStatus === 'completed' ? '#166534' :
                             order.orderStatus === 'pending' ? '#854d0e' : '#1f2937'
                    }}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;