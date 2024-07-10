import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function AddLab() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/inventory/addlab/', { name })
      .then(response => {
        console.log('Lab added:', response.data);
        navigate('/viewlabs');
      })
      .catch(error => console.error('Error adding lab:', error));
  };

  const handleCancel = () => {
    navigate('/viewlabs');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Add Lab</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="New Lab Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" variant='contained' color='primary'>Add</Button>
          <Button type="button" onClick={handleCancel} color='secondary'>Cancel</Button>
        </form>
      </Container>
    </div>
  );
}

export default AddLab;
