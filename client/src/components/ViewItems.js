import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import '../style/Inventory.css';

function ViewItems() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/items/')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (item) => {
    setEditing(item.item_id); 
    setEditedItem(item);
  };

  const handleSave = (id) => {
    console.log('Saving item with ID:', id);
    console.log('Data being sent:', editedItem);
    axios.put(`http://localhost:8000/inventory/edititem/${id}/`, editedItem)
      .then(response => {
        setItems(items.map(item => item.item_id === id ? response.data : item));
        setEditing(null);
      })
      .catch(error => console.error('Error saving data:', error));
  };

  const handleDelete = (id) => {
    console.log('Deleting item with ID:', id);
    axios.delete(`http://localhost:8000/inventory/deleteitem/${id}/`)
      .then(() => setItems(items.filter(item => item.item_id !== id)))
      .catch(error => console.error('Error deleting data:', error));
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
      flex: 1,
    },
    {
      Header: 'Serial No',
      accessor: 'serial_no',
      flex: 1,
    },
    {
      Header: 'Description',
      accessor: 'description',
      flex: 3,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <GridActionsCellItem
            icon={<Edit style={{ color: '#D9782D' }} />}
            label="Edit"
            onClick={() => handleEdit(params.id)}
          />
          <GridActionsCellItem
            icon={<Delete style={{ color: '#D9782D' }} />}
            label="Delete"
            onClick={() => handleDelete(params.id)}
          />
        </div>
      )
    }

  ];

  const rows = items.map(item => ({
    id: item.item_id,
    name: item.name,
    serial_no: item.serial_no,
    description: item.description
  }));

  return (
    <div >
      <h1>View Items</h1>
      <table className='table'>
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
            <tr key={item.item_id}>
              {editing === item.item_id ? (
                <>
                  <td><input value={editedItem.name} onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })} /></td>
                  <td><input value={editedItem.serial_no} onChange={(e) => setEditedItem({ ...editedItem, serial_no: e.target.value })} /></td>
                  <td><input value={editedItem.description} onChange={(e) => setEditedItem({ ...editedItem, description: e.target.value })} /></td>
                  <td>
                    <button onClick={() => handleSave(item.item_id)}>Save</button>
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
                    <button onClick={() => handleDelete(item.item_id)}>Delete</button>
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
