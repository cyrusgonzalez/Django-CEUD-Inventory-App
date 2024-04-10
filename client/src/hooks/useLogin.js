// useLogin.js
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('/accounts/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common.Authorization = `Token ${response.data.token}`;
      setIsLoggedIn(true);
      navigate('/inventory/');
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  return { isLoggedIn, login };
};

export default useLogin;
