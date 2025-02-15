import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './home.css'

const Home = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          axios.get('http://localhost:4000/api/product/list'),
          axios.get('http://localhost:4000/api/order/all-orders'),
          axios.get('http://localhost:4000/api/user/list')
        ]);

        setStats({
          products: productsRes.data.items.length,
          orders: ordersRes.data.orders.length,
          users: usersRes.data.users.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statBoxes = [
    {
      title: 'Total Products',
      value: stats.products,
      path: '/List',
      color: '#4CAF50',
      icon: '📦'
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      path: '/orders',
      color: '#2196F3',
      icon: '🛍️'
    },
    {
      title: 'Total Users',
      value: stats.users,
      path: '/users',
      color: '#FF9800',
      icon: '👥'
    }
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard Overview</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {statBoxes.map((stat, index) => (
          <div
            key={index}
            onClick={() => navigate(stat.path)}
            style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              width:'300px',
              height:'100px',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }
            }}
          >
            <div style={{ 
              fontSize: '3rem', 
              marginBottom: '0.5rem' 
            }}>
              {stat.icon}
            </div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              color: '#333',
              marginBottom: '0.5rem'
            }}>
              {stat.title}
            </h2>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold',
              color: stat.color 
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;