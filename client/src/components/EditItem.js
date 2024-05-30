// EditItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItem = () => {
  const { item_id } = useParams();
  const [formData, setFormData] = useState({
    item: '',
    lab: '',
    category: '',
    quantity: '',
    threshold_low: '',
    threshold_high: ''
  });
  const [items, setItems] = useState([]);
  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch items, labs, and categories
    axios.get('http://localhost:8000/api/items/').then(response => setItems(response.data));
    axios.get('http://localhost:8000/api/labs/').then(response => setLabs(response.data));
    axios.get('http://localhost:8000/api/categories/').then(response => setCategories(response.data));
    
    // Fetch item data
    axios.get(`http://localhost:8000/main/edititem/${item_id}`)
      .then(response => {
        setFormData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the item!', error);
      });
  }, [item_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8000/main/edititem/${item_id}/`, formData)
      .then(response => {
        console.log('Item updated:', response.data);
        // Optionally, redirect or update UI
      })
      .catch(error => {
        console.error('There was an error updating the item!', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="item" value={formData.item} onChange={handleChange}>
        <option value="">Select Item</option>
        {items.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
      </select>
      <select name="lab" value={formData.lab} onChange={handleChange}>
        <option value="">Select Lab</option>
        {labs.map(lab => <option key={lab.id} value={lab.id}>{lab.name}</option>)}
      </select>
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select>
      <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
      <input type="number" name="threshold_low" placeholder="Threshold Low" value={formData.threshold_low} onChange={handleChange} />
      <input type="number" name="threshold_high" placeholder="Threshold High" value={formData.threshold_high} onChange={handleChange} />
      <button type="submit">Edit Item</button>
    </form>
  );
};

export default EditItem;
