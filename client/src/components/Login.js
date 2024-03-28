import '../style/Accounts.css';
import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const LoginForm = () => {
  const { login } = useLogin();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <div className='div-accounts'>
      <br />
      <h1>ETS Labs Inventory Login Page</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
