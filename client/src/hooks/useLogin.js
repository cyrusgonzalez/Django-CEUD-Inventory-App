import { useState } from "react";
import axios from "axios";

export default function useLogin() {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState("");

    const isLoggedIn = async (username, password, onSuccess) => {
        try {
            const response = await axios.post('/api/login/', { username, password });
            console.log(response.data);
            setAccount(response.data); // Assuming response.data contains account info
            if(onSuccess) onSuccess();
        } catch (error) {
            console.error(error);
            setError("Failed to login"); // Simplified error handling
        }
    };

    return { account, isLoggedIn, error };
}
