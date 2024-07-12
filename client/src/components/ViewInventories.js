import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Container, Button, useMediaQuery, useTheme } from '@mui/material';
import '../style/Inventory.css';

function ViewInventories() {
  const [inventory, setInventory] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm') || theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/inventories/')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editinventory/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deleteinventory/${id}`);
  };

  const handleIncrement = (id, amount) => {
    axios.post(`http://localhost:8000/inventory/increment/${id}/`, { amount })
      .then(response => {
        setInventory(inventory.map(item => item.id === id ? response.data : item));
      })
      .catch(error => console.error('Error incrementing item:', error));
  };

  const handleDecrement = (id, amount) => {
    axios.post(`http://localhost:8000/inventory/decrement/${id}/`, { amount })
      .then(response => {
        setInventory(inventory.map(item => item.id === id ? response.data : item));
      })
      .catch(error => console.error('Error decrementing item:', error));
  };

  const columns = [
    { field: 'item_name', headerName: 'Item', flex: 1, editable: false, hideable: true },
    { field: 'lab_name', headerName: 'Lab', flex: 1, editable: false, hideable: true },
    { field: 'category_name', headerName: 'Category', flex: 1, editable: false, hideable: true },
    { field: 'quantity', headerName: 'Quantity', flex: 1, editable: false, hideable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Button onClick={() => handleIncrement(params.id, 1)}>+1</Button>
          <Button onClick={() => handleDecrement(params.id, 1)}>-1</Button>
          <Button onClick={() => handleIncrement(params.id, 10)}>+10</Button>
          <Button onClick={() => handleDecrement(params.id, 10)}>-10</Button>
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

  const rows = inventory.map(item => ({
    id: item.record_id,
    item_name: item.item.name,
    lab_name: item.lab.name,
    category_name: item.category.name,
    quantity: item.quantity
  }));

  return (
    <div style={{ marginLeft: '20%' }}>
      <h1 style={{ backgroundColor: '#C8C372' }}>Inventory Home Page</h1>
      <Container
        style={{
          color: '#1E4D2B',
          backgroundColor: '#FFFFFF',
          padding: isMobile ? '2%' : '2% 10%',
          minHeight: '100vh'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/addinventory"
          style={{
            marginBottom: '20px',
            fontWeight: 'bold',
            backgroundColor: '#C8C372',
            color: '#FFFFFF'
          }}
        >
          Add Inventory
        </Button>
        <div className="data-grid-container" style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            autoHeight
            disableSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                fontWeight: 'bold',
                borderBottom: '1px solid #000000',
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 'bold',
                color: '#FFFFFF',
              },
              '& .MuiDataGrid-cell': {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                border: 'none',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderTop: 'none',
              },
              '& .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
              '& .MuiDataGrid-cell:focus': {
                outline: 'black auto 1px',
              },
              '& .MuiDataGrid-cell:focus-within': {
                outline: 'black auto 1px',
              },
              '& .MuiPaper-root': {
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.99)',
                zIndex: 1300,
                right: 0,
                bottom: 0,
                top: 0,
                left: 0,
              },
              '& MuiButtonBase-root': {
                color: '#FFFFFF',
              },
              '& .MuiTablePagination-selectLabel': {
                color: '#FFFFFF',
              },
              '& .MuiTablePagination-input': {
                color: '#FFFFFF',
              },
              '& css-levciy-MuiTablePagination-displayedRows': {
                color: '#FFFFFF',
              },
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default ViewInventories;
