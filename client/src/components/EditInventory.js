import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

function EditInventory() {
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
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/items/').then(response => setItems(response.data));
    axios.get('http://localhost:8000/inventory/api/labs/').then(response => setLabs(response.data));
    axios.get('http://localhost:8000/inventory/api/categories/').then(response => setCategories(response.data));
    axios.get(`http://localhost:8000/inventory/api/inventories/${id}/`).then(response => {
      setFormData({
        item: response.data.item.item_id,
        lab: response.data.lab.lab_id,
        category: response.data.category.category_id,
        quantity: response.data.quantity,
        threshold_low: response.data.threshold_low,
        threshold_high: response.data.threshold_high
      });
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/inventory/editinventory/${id}/`, formData)
      .then(response => {
        console.log(response.data);
        alert('Inventory updated successfully!');
        navigate('/viewinventories');
      })
      .catch(error => {
        console.error('Error updating inventory:', error.response.data);
      });
  };

  const handleCancel = () => {
    navigate('/viewinventories');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Edit Inventory</h1>
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
          <Button type="submit" variant='contained' color='primary'>Save</Button>
          <Button type="button" onClick={handleCancel} color='secondary'>Cancel</Button>
        </form>
      </Container>
    </div>
  );
}

export default EditInventory;
