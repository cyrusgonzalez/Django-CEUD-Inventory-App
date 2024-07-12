import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function AddInventory() {
  const [items, setItems] = useState([]);
  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    item: '',
    lab: '',
    category: '',
    quantity: '',
    threshold_low: '',
    threshold_high: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/items/').then(response => setItems(response.data));
    axios.get('http://localhost:8000/inventory/api/labs/').then(response => setLabs(response.data));
    axios.get('http://localhost:8000/inventory/api/categories/').then(response => setCategories(response.data));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/inventory/addinventory/', {
      item: formData.item,
      lab: formData.lab,
      category: formData.category,
      quantity: formData.quantity,
      threshold_low: formData.threshold_low,
      threshold_high: formData.threshold_high
    })
      .then(response => {
        console.log(response.data);
        alert('Inventory added successfully!');
        navigate('/viewinventories');
      })
      .catch(error => {
        console.error('Error adding inventory:', error.response.data);
      });
  };

  const handleCancel = () => {
    navigate('/viewinventories');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <br />
        <h1 style={{color: '#111111'}}>Add Inventory</h1>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <InputLabel>Item</InputLabel>
            <Select
              name="item"
              value={formData.item}
              onChange={handleChange}
            >
              {items.map(item => (
                <MenuItem key={item.item_id} value={item.item_id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <InputLabel>Lab</InputLabel>
            <Select
              name="lab"
              value={formData.lab}
              onChange={handleChange}
            >
              {labs.map(lab => (
                <MenuItem key={lab.lab_id} value={lab.lab_id}>{lab.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(category => (
                <MenuItem key={category.category_id} value={category.category_id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            name="quantity"
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="threshold_low"
            label="Threshold Low"
            type="number"
            value={formData.threshold_low}
            onChange={handleChange}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <TextField
            fullWidth
            margin="normal"
            name="threshold_high"
            label="Threshold High"
            type="number"
            value={formData.threshold_high}
            onChange={handleChange}
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <Button type="submit" variant='contained' color='primary'>Add</Button>
          <Button type="button" onClick={handleCancel} color='secondary'>Cancel</Button>
        </form>
        <br />
      </Container>
    </div>
  );
}

export default AddInventory;
