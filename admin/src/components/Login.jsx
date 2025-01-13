import React, { useState } from "react";
import "./login.css";
import { backendUrl } from "../App";
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="input-group">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="your@gmail.com"
              className={errors.email && 'error'}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="input-group">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className={errors.password && 'error'}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
