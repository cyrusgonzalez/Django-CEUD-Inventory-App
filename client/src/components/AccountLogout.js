import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../hooks/useLogout';
import { Button, Container } from '@mui/material';

const LogoutForm = ({ setIsLoggedIn }) => {
  const { logout } = useLogout(setIsLoggedIn);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleCancel = () => {
    navigate('/main');
  };

  return (
    <div style={{ marginLeft: '18%', padding: '2% 2%', height: '100%', color: 'white' }}>
      <Container>
        <h1>Logout Confirmation</h1>
        <p>Are you sure you want to logout?</p>
        <Button type='submit' variant='contained' onClick={handleLogout} color='primary'>Logout</Button>
        <Button type='button' onClick={handleCancel} color='secondary'>Cancel</Button>
      </Container>
    </div>
  );
};

export default LogoutForm;
