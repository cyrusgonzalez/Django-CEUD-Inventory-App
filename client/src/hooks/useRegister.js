import { useState } from 'react';
import axios from 'axios';

const useRegister = () => {
    const [isRegistered, setIsRegistered] = useState(false);

    const register = async (username, password, regcode) => {
        try {
            await axios.post('/accounts/register/', { username, password, regcode });
            setIsRegistered(true);
        } catch (error) {
            console.error(error);
            setIsRegistered(false);
        }
    };

    return { isRegistered, register };
};

export default useRegister;