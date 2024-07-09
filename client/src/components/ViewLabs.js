import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewLabs() {
  const [labs, setLabs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedLab, setEditedLab] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/labs/')
      .then(response => setLabs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (lab) => {
    setEditing(lab.lab_id);
    setEditedLab(lab);
  };

  const handleSave = (id) => {
    console.log('Saving location with ID:', id);
    console.log('Data being sent:', editedLab);
    axios.put(`http://localhost:8000/inventory/editlab/${id}/`, editedLab)
      .then(response => {
        setLabs(labs.map(lab => lab.lab_id === id ? response.data : lab));
        setEditing(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    console.log('Deleting location with ID:', id);
    axios.delete(`http://localhost:8000/inventory/deletelab/${id}/`)
      .then(() => setLabs(labs.filter(lab => lab.lab_id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <h1>View Labs/Closet spaces</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labs.map(lab => (
            <tr key={lab.lab_id}>
              {editing === lab.lab_id ? (
                <>
                  <td><input value={editedLab.name} onChange={(e) => setEditedLab({ ...editedLab, name: e.target.value })} /></td>
                  <td>
                    <button onClick={() => handleSave(lab.lab_id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{lab.name}</td>
                  <td>
                    <button onClick={() => handleEdit(lab)}>Edit</button>
                    <button onClick={() => handleDelete(lab.lab_id)}>Delete</button>
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

export default ViewLabs;
