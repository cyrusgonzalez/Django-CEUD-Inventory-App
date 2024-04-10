import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Inventory.css';

function StaticInvNavBar() {
  return (
    <nav>
      <ul class='myUl'>
        <li class='myLi'><Link to="/main">Inventory</Link></li>
        <li class='myLi'><Link to="/main/additem">Add Item</Link></li>
        <li class='myLi'><Link to="/main/addlab">Add Lab</Link></li>
        <li class='myLi'><Link to="/main/addcategory">Add Category</Link></li>
        <li class='myLi'><Link to="/main/edititem">Edit Item</Link></li>
        <li class='myLi'><Link to="/main/deleteitem">Delete Item</Link></li>
        <li class='myLi'><Link to="/main/deletelab">Delete Lab</Link></li>
        <li class='myLi'><Link to="/main/deletecategory">Delete Category</Link></li>
      </ul>
    </nav>
  );
}

export default StaticInvNavBar;