import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryHome() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/main')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className='div-inventory' style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <br />
      <h1>ETS Labs Inventory Home Page</h1>
      <br />
      <p>Will the database materials go here?</p>
      <p>{message}</p>
    </div>
  );
}

export default InventoryHome;
