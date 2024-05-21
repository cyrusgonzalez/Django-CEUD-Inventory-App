// DeleteItem.js
import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteItem = () => {
  const { item_id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/main/deleteitem/${item_id}/`)
      .then(response => {
        console.log('Item deleted:', response.data);
        navigate('/main');
      })
      .catch(error => {
        console.error('There was an error deleting the item!', error);
      });
  };

  return (
    <div>
      <h1>Are you sure you want to delete this item?</h1>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={() => navigate('/main')}>Cancel</button>
    </div>
  );
};

export default DeleteItem;
