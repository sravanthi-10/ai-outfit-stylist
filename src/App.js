import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Components/Navbar';
import UploadOutfit from './Pages/UploadOutfit';
import StyleSuggestions from './Pages/StyleSuggestions';
import MyCloset from './Pages/MyCloset';
import Home from './Pages/Home';
import Stylist from './Pages/Stylist';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard'
import { useState } from 'react';
import { CartProvider } from './Pages/CartContext';

function App() {
  const[isAuth ,setAuth]=useState(false);
  const handleLogin =()=>setAuth(true);
  const handleLogout =()=>setAuth(false);
  return (
    <div className="App">
      <CartProvider>
     <BrowserRouter>
     <Navbar isAuth={isAuth}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/stylist' element={<Stylist isAuth={isAuth}/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/login' element={<Login onLogin={handleLogin}/>}></Route>
        <Route path='/dashboard' element={<Dashboard onLogout={handleLogout}/>}></Route>
        <Route path='/upload' element={<UploadOutfit />} />
        <Route path='/suggestions' element={<StyleSuggestions />} />
        <Route path='/closet' element={<MyCloset />} />
      </Routes>
     </BrowserRouter>
     </CartProvider>
    </div>
  );
}

export default App;
