import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

function DeleteInventory() {
  const [inventory, setInventory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/inventories/${id}/`)
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => console.error('Error fetching inventory:', error));
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/inventory/deleteinventory/${id}/`)
      .then(() => {
        navigate('/viewinventories');
      })
      .catch(error => console.error('Error deleting inventory:', error));
  };

  const handleCancel = () => {
    navigate('/viewinventories');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Delete Inventory</h1>
        {inventory && (
          <p>Are you sure you want to delete the inventory item '{inventory.item.name}' in '{inventory.lab.name}'? This action cannot be undone.</p>
        )}
        <Button type='submit' onClick={handleDelete} variant="contained" color="primary">Delete</Button>
        <Button type='button' onClick={handleCancel} color="secondary">Cancel</Button>
      </Container>
    </div>
  );
}

export default DeleteInventory;
