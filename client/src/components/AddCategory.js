import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default AddCategory;
