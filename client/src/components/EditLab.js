import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, TextField } from '@mui/material';

function EditLab() {
  const [name, setName] = useState('');
  const { lab_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/inventory/api/labs/${lab_id}/`)
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => console.error('Error fetching lab:', error));
  }, [lab_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8000/inventory/editlab/${lab_id}/`, { name })
      .then(response => {
        console.log('Lab edited:', response.data);
        navigate('/viewlabs');
      })
      .catch(error => console.error('Error editing lab:', error));
  };

  const handleCancel = () => {
    navigate('/viewlabs');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Edit Lab</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Lab Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit" variant="contained" >Save</Button>
          <Button type="button" onClick={handleCancel} color="secondary">Cancel</Button>
        </form>
      </Container>
    </div>
  );
}

export default EditLab;
