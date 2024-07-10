// AddItem.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function AddItem() {
  const [name, setName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/inventory/additem/', { name, serial_no: serialNo, description })
      .then(response => {
        console.log('Item added:', response.data);
        navigate('/viewitems');
      })
      .catch(error => console.error('Error adding item:', error));
  };

  const handleCancel = () => {
    navigate('/viewitems');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Add Item</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Item Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            name="serialNo"
            label="Serial Number"
            type="text"
            fullWidth
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button type="submit" variant='contained' color='primary'>Add</Button>
          <Button type="button" onClick={handleCancel} color='secondary'>Cancel</Button>
        </form>
      </Container>
    </div>
  );
}

export default AddItem;
