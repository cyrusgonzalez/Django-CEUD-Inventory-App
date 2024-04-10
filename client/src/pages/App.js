import '../style/App.css';
import '../style/Accounts.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AccountHome from '../components/AccountHome';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import StaticNavBar from '../components/AccNavbar';

export default function App() {
  return (
    <div className="App">
        <Router>
            <StaticNavBar />
            <Routes>
                <Route exact path="/accounts" element={<AccountHome />} />
                <Route path="accounts/login" element={<LoginForm />} />
                <Route path="accounts/register" element={<RegisterForm />} />
            </Routes>
        </Router>
    </div>
  );
}
