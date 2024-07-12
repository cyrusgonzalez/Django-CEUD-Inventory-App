import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogin = (setIsLoggedIn) => {
  const navigate = useNavigate();

  const login = async (username, password) => {

    try {
      const response = await axios.post('http://localhost:8000/accounts/login/', { username, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common.Authorization = `Token ${response.data.token}`;
      setIsLoggedIn(true);
      console.log('Logged in');
      navigate('/main');
      
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  return { login };
};

export default useLogin;
