import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import '../style/Accounts.css';

const LoginForm = ({setIsLoggedIn}) => {
  const { login } = useLogin(setIsLoggedIn);
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
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'/>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
        <button variant='primary' type="submit" class="buttonAcc" >Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
