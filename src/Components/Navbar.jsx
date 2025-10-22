import React from 'react'
import { Link ,useLocation } from 'react-router-dom';
import {useCart} from '../Pages/CartContext';
import './Navbar.css'

const Navbar = ({isAuth}) => {
  const location=useLocation();
  const {state} =useCart();

  const totalItems =state.cartItems.reduce((sum,item)=>sum+item.quantity,0);
  return (
    <div>
      <nav className='navbar navbar-expand-lg'>
        <div className='navbar-container'>
          <Link className='navbar-brand' to='/'>AI-Outfit-Stylist</Link>
          <input type="checkbox" id="toggle" />
            <label htmlFor="toggle" className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </label>
          <ul className='nav-links'>
            <li>
              <Link className={location.pathname==='/' ? 'active' : ''} to='/'>Home</Link>
            </li>
            <li>
              <Link className={location.pathname==='/Stylist' ? 'active' : ''} to='/Stylist'>Stylist</Link>
            </li>
            {
            isAuth ?
            <li>
              <Link className={location.pathname==='/Dashboard' ? 'active' : ''} to='/Dashboard'>Dashboard</Link>
            </li>
            :
            <li>
              <Link className={location.pathname==='/Login' ? 'active' : ''} to='/Login'>Login</Link>
            </li>
            }
            <li className='cart-icon-container'>
              <Link className={location.pathname==='/Cart' ? 'active' : ''} to='/Cart'>
                <i className="fa-solid fa-cart-shopping fa-2x"></i>
                {totalItems>0 &&(<span className='cart-badge'>{totalItems}</span>)}
              </Link>
            </li>
            
          </ul> 
          </div>
        
      </nav> 
    </div>
  )
}

export default Navbar