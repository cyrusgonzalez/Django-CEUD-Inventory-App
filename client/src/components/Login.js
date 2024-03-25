import React, {useEffect, useState} from 'react';
import axios from 'axios';

function Login() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/accounts/login/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <p>{message}</p>
    </div>
  );
}