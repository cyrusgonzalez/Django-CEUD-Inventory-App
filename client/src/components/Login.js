import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, account, error } = useLogin();

  const handleSuccess = () => {
    console.log("Login successful", account);
    // Here you can redirect the user or update the UI accordingly
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    isLoggedIn(username, password, handleSuccess);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Login;
