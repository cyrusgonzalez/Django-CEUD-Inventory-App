import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Accounts.css';

function StaticNavBar() {
  return (
    <nav>
      <ul class='myUl'>
        <li class='myLi'><Link to="/inventory/home">Inventory</Link></li>
        <li class='myLi'><Link to="/inventory/additem">Add Item</Link></li>
        <li class='myLi'><Link to="/inventory/addlab">Add Lab</Link></li>
        <li class='myLi'><Link to="/inventory/updateitem">Update Item</Link></li>
        <li class='myLi'><Link to="/inventory/deleteitem">Delete Item</Link></li>
        <li class='myLi'><Link to="/inventory/deletelab">Register</Link></li>
      </ul>
    </nav>
  );
}

export default StaticNavBar;