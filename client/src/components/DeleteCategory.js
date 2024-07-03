import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function DeleteCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/inventory/deletecategory/${id}/`)
      .then(() => {
        navigate('/viewcategories');
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  const handleCancel = () => {
    navigate('/viewcategories');
  };

  return (
    <Container>
      <Dialog open={true} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this category? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DeleteCategory;
