import '../style/App.css';
import '../style/Accounts.css';
import React, { useState, useEffect } from 'react';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StaticAccNavBar from '../components/AccNavbar';
import AccountHome from '../components/AccountHome';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import StaticInvNavBar from '../components/InvNavbar';
import InventoryHome from '../components/InventoryHome';
import AddItem from '../components/AddItem';
import AddLab from '../components/AddLab';
import AddCategory from '../components/AddCategory';
import EditItem from '../components/EditItem';
import DeleteItem from '../components/DeleteItem';
import DeleteLab from '../components/DeleteLab';
import DeleteCategory from '../components/DeleteCategory';
import axios from 'axios';


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
              <Route path="/main/additem" element={<AddItem />} />
              <Route path="/main/addlab" element={<AddLab />} />
              <Route path="/main/addcategory" element={<AddCategory />} />
              <Route path="/main/edititem/:item_id" element={<EditItem />} />
              <Route path="/main/deleteitem/:item_id" element={<DeleteItem />} />
              <Route path="/main/deletelab/:item_id" element={<DeleteLab />} />
              <Route path="/main/deletecategory/:item_id" element={<DeleteCategory />} />
              <Route path="/accounts" element={<Navigate replace to="/main" />} />
              <Route path="*" element={<Navigate replace to="/main" />} />
          </Routes>
        </>
      )}
      </Router>
    </div>
  );
}

