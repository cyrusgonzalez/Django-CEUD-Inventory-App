import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function AddCategory() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/inventory/addcategory/', { name })
      .then(response => {
        console.log('Category added:', response.data);
        navigate('/viewcategories');
      })
      .catch(error => console.error('Error adding category:', error));
  };

  const handleCancel = () => {
    navigate('/viewcategories');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="New Category Name"
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

export default AddCategory;
