import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

function DeleteCategory() {
  const [name, setName] = useState('');
  const { cat_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/categories/${cat_id}/`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.error('Error fetching category:', error));
  }, [cat_id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/inventory/deletecategory/${cat_id}/`)
      .then(() => {
        navigate('/viewcategories');
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  const handleCancel = () => {
    navigate('/viewcategories');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Delete Category</h1>
        <p>Are you sure you want to delete the '<strong>{name}</strong>' category? This action cannot be undone.</p>
        <Button type='submit' onClick={handleDelete} variant="contained" color="primary">Delete</Button>
        <Button type='button' onClick={handleCancel} color="secondary">Cancel</Button>
      </Container>
    </div>
  );
}

export default DeleteCategory;
