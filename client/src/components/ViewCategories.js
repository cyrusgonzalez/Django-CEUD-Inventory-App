import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedCategory, setEditedCategory] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (category) => {
    setEditing(category.id);
    setEditedCategory(category);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8000/api/categories/${id}/`, editedCategory)
      .then(response => {
        setCategories(categories.map(category => category.id === id ? response.data : category));
        setEditing(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/categories/${id}/`)
      .then(() => setCategories(categories.filter(category => category.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <h1>View Categories</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              {editing === category.id ? (
                <>
                  <td><input value={editedCategory.name} onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })} /></td>
                  <td>
                    <button onClick={() => handleSave(category.id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{category.name}</td>
                  <td>
                    <button onClick={() => handleEdit(category)}>Edit</button>
                    <button onClick={() => handleDelete(category.id)}>Delete</button>
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

export default ViewCategories;
