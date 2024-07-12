import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Inventory.css';
import logo from '../style/WSCoE-logo.png';

function StaticInvNavBar() {
  return (
    <nav className='navbarInv'>
      <ul className='myUl'>
        <li className='myLi'><Link to="/main">Inventory Home</Link></li>
        <li className='myLi'><Link to="/viewitems">View Items</Link></li>
        <li className='myLi'><Link to="/viewlabs">View Locations</Link></li>
        <li className='myLi'><Link to="/viewcategories">View Categories</Link></li>
        <li className='myLi'><Link to="/accounts/logout">Logout</Link></li>
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

export default StaticInvNavBar;
