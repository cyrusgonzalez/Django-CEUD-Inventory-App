import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Accounts.css';

function StaticNavBar() {
  return (
    <nav>
      <ul class='.MyUL'>
        <li><Link to="/accounts">Home</Link></li>
        <li><Link to="/accounts/login">Login</Link></li>
        <li><Link to="/accounts/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default StaticNavBar;