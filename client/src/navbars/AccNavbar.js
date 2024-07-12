import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Accounts.css';
import logo from '../style/WSCoE-logo.png';

function StaticAccNavBar() {
  return (
    <nav className='navbarAcc'>
      <ul className='myUl'>
        <li className='myLi'><Link to="/accounts">Home</Link></li>
        <li className='myLi'><Link to="/accounts/login">Login</Link></li>
        <li className='myLi'><Link to="/accounts/register">Register</Link></li>
        <img src={logo} alt="Logo" className="logo" 
          style={{ 
            blockSize: '12%', 
            width: '100%', 
            height: undefined, 
            aspectRatio: 1,
            position: 'absolute',
            left:0,
            bottom:0,
            right:0,
            paddingBottom: '30px',
          }}
        />
      </ul>
    </nav>
  );
}

export default StaticAccNavBar;