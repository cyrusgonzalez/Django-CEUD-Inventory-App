import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddInventory() {
  const [items, setItems] = useState([]);
  const [labs, setLabs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    item_id: '',
    lab_id: '',
    category_id: '',
    quantity: '',
    threshold_low: '',
    threshold_high: ''
  });

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
    axios.post('http://localhost:8000/inventory/main/addinventory/', formData)
      .then(response => {
        console.log(response.data);
        alert('Inventory added successfully!');
      })
      .catch(error => console.error(error));
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <h1>Add Inventory</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Item</label>
          <select name="item_id" value={formData.item_id} onChange={handleChange}>
            <option value="">Select Item</option>
            {items.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Lab</label>
          <select name="lab_id" value={formData.lab_id} onChange={handleChange}>
            <option value="">Select Lab</option>
            {labs.map(lab => (
              <option key={lab.id} value={lab.id}>{lab.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Category</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange}>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
        </div>
        <div>
          <label>Threshold Low</label>
          <input type="number" name="threshold_low" value={formData.threshold_low} onChange={handleChange} />
        </div>
        <div>
          <label>Threshold High</label>
          <input type="number" name="threshold_high" value={formData.threshold_high} onChange={handleChange} />
        </div>
        <button type="submit">Add Inventory</button>
      </form>
    </div>
  );
}

export default AddInventory;
