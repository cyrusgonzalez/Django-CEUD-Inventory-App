// EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function EditItem() {
  const [name, setName] = useState('');
  const [serialNo, setSerialNo] = useState('');
  const [description, setDescription] = useState('');
  const { item_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/items/${item_id}/`)
      .then(response => {
        setName(response.data.name);
        setSerialNo(response.data.serial_no);
        setDescription(response.data.description);
      })
      .catch(error => console.error('Error fetching item:', error));
  }, [item_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/inventory/edititem/${item_id}/`, { name, serial_no: serialNo, description })
      .then(response => {
        console.log('Item edited:', response.data);
        navigate('/viewitems');
      })
      .catch(error => console.error('Error editing item:', error));
  };

  const handleCancel = () => {
    navigate('/viewitems');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Edit Item</h1>
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
          <Button type="submit" variant="contained" >Save</Button>
          <Button type="button" onClick={handleCancel} color="secondary">Cancel</Button>
        </form>
      </Container>
    </div>
  );
}

export default EditItem;
