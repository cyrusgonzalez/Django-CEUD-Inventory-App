import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/items/')  // Updated URL
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));  // Improved error logging
  }, []);

  const handleEdit = (item) => {
    setEditing(item.id);
    setEditedItem(item);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8000/inventory/api/items/${id}/`, editedItem)
      .then(response => {
        setItems(items.map(item => item.id === id ? response.data : item));
        setEditing(null);
      })
      .catch(error => console.error('Error saving data:', error));  // Improved error logging
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/inventory/api/items/${id}/`)
      .then(() => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting data:', error));  // Improved error logging
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <h1>View Items</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Serial No</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {editing === item.id ? (
                <>
                  <td><input value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} /></td>
                  <td><input value={editedItem.serial_no} onChange={(e) => setEditedItem({ ...editedItem, serial_no: e.target.value })} /></td>
                  <td><input value={editedItem.description} onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })} /></td>
                  <td>
                    <button onClick={() => handleSave(item.id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.serial_no}</td>
                  <td>{item.description}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewItems;
