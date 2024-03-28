import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HelloWorld() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/home/')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='div-accounts'>
      <br />
      <h1>ETS Labs Inventory Home Page</h1>
      <br />
      <p>This is the home page; put instructions here.</p>
      <p>{message}</p>
    </div>
  );
}

export default HelloWorld;
