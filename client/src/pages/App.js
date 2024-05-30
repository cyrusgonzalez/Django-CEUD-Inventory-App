import '../style/App.css';
import '../style/Accounts.css';
import React, { useState, useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import StaticAccNavBar from '../navbars/AccNavbar';
import StaticInvNavBar from '../navbars/InvNavbar';
import AccountHome from '../components/AccountHome';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import InventoryHome from '../components/InventoryHome';
import AddInventory from '../components/AddInventory';
import AddItem from '../components/AddItem';
import AddLab from '../components/AddLab';
import AddCategory from '../components/AddCategory';
import EditItem from '../components/EditItem';
import DeleteItem from '../components/DeleteItem';
import DeleteLab from '../components/DeleteLab';
import DeleteCategory from '../components/DeleteCategory';
import ViewItems from '../components/ViewItems';
import ViewLabs from '../components/ViewLabs';
import ViewCategories from '../components/ViewCategories';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (token) {
      axios.defaults.headers.common.Authorization = `Token ${token}`;
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {!isLoggedIn ? (
          <>
            <StaticAccNavBar />
            <Routes>
              <Route exact path="/accounts" element={<AccountHome />} />
              <Route path="/accounts/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/accounts/register" element={<RegisterForm />} />
              <Route path="*" element={<Navigate replace to="/accounts/login" />} />
            </Routes>
          </>
        ) : (
          <>
            <StaticInvNavBar />
            <Routes>
              <Route exact path="/main" element={<InventoryHome />} />
              <Route path="/addinventory" element={<AddInventory />} />
              <Route path="/additem" element={<AddItem />} />
              <Route path="/edititem/:item_id" element={<EditItem />} />
              <Route path="/deleteitem/:item_id" element={<DeleteItem />} />
              <Route path="/addlab" element={<AddLab />} />
              <Route path="/deletelab/:lab_id" element={<DeleteLab />} />
              <Route path="/addcategory" element={<AddCategory />} />
              <Route path="/deletecategory/:cat_id" element={<DeleteCategory />} />
              <Route path="/viewitems" element={<ViewItems />} />
              <Route path="/viewlabs" element={<ViewLabs />} />
              <Route path="/viewcategories" element={<ViewCategories />} />
              <Route path="/accounts" element={<Navigate replace to="/main" />} />
              <Route path="*" element={<Navigate replace to="/main" />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}
