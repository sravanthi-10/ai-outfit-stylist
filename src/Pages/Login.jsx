import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = ({onLogin}) => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const navigate =useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    if (username === 'sravanthi' && password === '123') {
      localStorage.setItem('isAuth', 'true');
      onLogin();
  
      // Check if there was a pending cart item
      const pendingItem = sessionStorage.getItem('pendingCartItem');
  
      if (pendingItem) {
        // Remove it from sessionStorage (so it doesn't repeat)
        sessionStorage.removeItem('pendingCartItem');
  
        // Redirect back to Stylist page to add it
        navigate('/stylist', { state: { autoAddItem: JSON.parse(pendingItem) } });
      } else {
        // No pending item → go to dashboard
        navigate('/dashboard');
      }
    } else {
      alert("Invalid Credentials");
    }
  };
  
  return (
  <div className="login-page">
    <div className="login-card">
      <h3>Welcome Back</h3>
      <p>Log in to explore your personalized outfit suggestions</p>

      <form onSubmit={handlesubmit}>
        <label>Username:</label>
        <input type="text"  value={username} placeholder="Enter username" onChange={(e)=> setUsername(e.target.value)} required/>
                
        <label>Password:</label>
        <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} required/>
              
        <button type="submit" className="btn custom-btn">Login</button>
              
      </form>
    </div>
  </div>

  )
}

export default Login