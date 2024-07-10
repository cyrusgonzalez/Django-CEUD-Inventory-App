import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container } from '@mui/material';

function DeleteLab() {
  const [name, setName] = useState('');
  const { lab_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/labs/${lab_id}/`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.error('Error fetching lab:', error));
  }, [lab_id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/inventory/deletelab/${lab_id}/`)
      .then(() => {
        navigate('/viewlabs');
      })
      .catch(error => console.error('Error deleting lab:', error));
  };

  const handleCancel = () => {
    navigate('/viewlabs');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Delete Lab</h1>
        <p>Are you sure you want to delete the '<strong>{name}</strong>' lab? This action cannot be undone.</p>
        <Button type='submit' onClick={handleDelete} variant="contained" color="primary">Delete</Button>
        <Button type='button' onClick={handleCancel} color="secondary">Cancel</Button>
      </Container>
    </div>
  );
}

export default DeleteLab;
