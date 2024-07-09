import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Accounts.css';
import logo from '../style/WSCoE-logo.png';

function StaticAccNavBar() {
  return (
    <nav>
      <ul className='myUl'>
        <li className='myLi'><Link to="/accounts">Home</Link></li>
        <li className='myLi'><Link to="/accounts/login">Login</Link></li>
        <li className='myLi'><Link to="/accounts/register">Register</Link></li>
      <img src={logo} alt="Logo" className="logo" style={{marginRight: "80%", }}/>
      </ul>
    </nav>
  );
}

export default StaticAccNavBar;