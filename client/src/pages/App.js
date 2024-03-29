import '../style/App.css';
import '../style/Accounts.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from '../components/HelloWorld';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';
import StaticNavBar from '../components/Navbar';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <StaticNavBar />
          <Routes>
            <Route exact path="/accounts" element={<HelloWorld />} />
            <Route path="accounts/login" element={<LoginForm />} />
            <Route path="accounts/register" element={<RegisterForm />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}
