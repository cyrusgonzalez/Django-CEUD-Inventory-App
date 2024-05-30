import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Inventory.css';

function StaticInvNavBar() {
  return (
    <nav>
      <ul className='myUl'>
        <li className='myLi'><Link to="/main">Inventory Home</Link></li>
        <li className='myLi'><Link to="/addinventory">Add Inventory</Link></li>
        <li className='myLi'><Link to="/viewitems">View Items</Link></li>
        <li className='myLi'><Link to="/viewlabs">View Labs</Link></li>
        <li className='myLi'><Link to="/viewcategories">View Categories</Link></li>
      </ul>
    </nav>
  );
}

export default StaticInvNavBar;
