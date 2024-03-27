import { useState } from 'react';
import axios from 'axios';

const useLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = async (username, password) => {
        try {
            const response = await axios.post('/accounts/login/', { username, password });
            localStorage.setItem('token', response.data.token); // Store token
            setIsLoggedIn(true);
        } catch (error) {
            console.error(error);
            setIsLoggedIn(false);
        }
    };

    return { isLoggedIn, login };
};

export default useLogin;
