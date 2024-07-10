// DeleteItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

function DeleteItem() {
  const [name, setName] = useState('');
  const { item_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/items/${item_id}/`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.error('Error fetching item:', error));
  }, [item_id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/inventory/deleteitem/${item_id}/`)
      .then(() => {
        navigate('/viewitems');
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  const handleCancel = () => {
    navigate('/viewitems');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Delete Item</h1>
        <p>Are you sure you want to delete the '<strong>{name}</strong>' item? This action cannot be undone.</p>
        <Button type='submit' onClick={handleDelete} variant="contained" color="primary">Delete</Button>
        <Button type='button' onClick={handleCancel} color="secondary">Cancel</Button>
      </Container>
    </div>
  );
}

export default DeleteItem;
