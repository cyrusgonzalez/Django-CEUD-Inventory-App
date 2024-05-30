import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ViewLabs() {
  const [labs, setLabs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedLab, setEditedLab] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/api/labs/')
      .then(response => setLabs(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (lab) => {
    setEditing(lab.id);
    setEditedLab(lab);
  };

  const handleSave = (id) => {
    axios.put(`http://localhost:8000/api/labs/${id}/`, editedLab)
      .then(response => {
        setLabs(labs.map(lab => lab.id === id ? response.data : lab));
        setEditing(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/labs/${id}/`)
      .then(() => setLabs(labs.filter(lab => lab.id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <h1>View Labs</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labs.map(lab => (
            <tr key={lab.id}>
              {editing === lab.id ? (
                <>
                  <td><input value={editedLab.name} onChange={(e) => setEditedLab({ ...editedLab, name: e.target.value })} /></td>
                  <td>
                    <button onClick={() => handleSave(lab.id)}>Save</button>
                    <button onClick={() => setEditing(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{lab.name}</td>
                  <td>
                    <button onClick={() => handleEdit(lab)}>Edit</button>
                    <button onClick={() => handleDelete(lab.id)}>Delete</button>
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
