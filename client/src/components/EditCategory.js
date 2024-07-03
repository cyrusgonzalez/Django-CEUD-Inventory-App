import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';

function EditCategory() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/categories/${id}/`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.error('Error fetching category:', error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/inventory/editcategory/${id}/`, { name })
      .then(response => {
        console.log('Category edited:', response.data);
        navigate('/viewcategories');
      })
      .catch(error => console.error('Error editing category:', error));
  };

  const handleCancel = () => {
    navigate('/viewcategories');
  };

  return (
    <Container>
      <h1>Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Category Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">Save</Button>
        <Button type="button" onClick={handleCancel} color="secondary">Cancel</Button>
      </form>
    </Container>
  );
}

export default EditCategory;
