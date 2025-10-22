import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'
const Dashboard = ({onLogout}) => {
  const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('isAuth');
    onLogout();
    navigate('/login')
  }
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, Sravanthi 👋</h1>
        <p>Your AI Outfit Stylist is ready to assist!</p>
        <button className='logout-btn'onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-grid">
        <div className="dash-card">
          <h3>👗 Upload Outfit</h3>
          <p>Let AI analyze your outfit and suggest styles.</p>
          <button className="btn" onClick={()=>navigate('/upload')}>Upload</button>
        </div>

        <div className="dash-card">
          <h3>🎨 Style Suggestions</h3>
          <p>See personalized outfit combinations just for you.</p>
          <button className="btn" onClick={()=>navigate('/suggestions')}>View</button>
        </div>

        <div className="dash-card">
          <h3>🧥 My Closet</h3>
          <p>Browse your uploaded looks and manage them easily.</p>
          <button className="btn" onClick={()=>navigate('/closet')}>Open</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard