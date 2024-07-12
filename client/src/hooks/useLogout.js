import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogout = (setIsLoggedIn) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('http://localhost:8000/accounts/logout/');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common.Authorization;
      setIsLoggedIn(false);
      console.log('Logged out');
      navigate('/accounts/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { logout };
};

export default useLogout;
