import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Container, Button, useMediaQuery, useTheme } from '@mui/material';
import '../style/Inventory.css';

function ViewItems() {
  const [items, setItems] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm') || theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/items/')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/edititem/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deleteitem/${id}`);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 100,
      flex: 1,
      hideable: true,
    },
    {
      field: 'serial_no',
      headerName: 'Serial No',
      flex: 1,
      hideable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 3,
      hideable: true,
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
    <div style={{ marginLeft: '20%' }}>
      <h1 style={{ backgroundColor: '#C8C372' }}>Inventory Items</h1>
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
          to="/additem"
          style={{
            marginBottom: '20px',
            fontWeight: 'bold',
            backgroundColor: '#C8C372',
            color: '#FFFFFF'
          }}
        >
          Add Item
        </Button>
        <div className="data-grid-container" style={{ height: '100%', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            backgroundColor="#1E4D2B"
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
              '& .MuiPopover-root': {
                backgroundColor: 'transparent',
                position: 'fixed',
                zIndex: 1300,
                right: 0,
                bottom: 0,
                top: 0,
                left: 0,
              },
              '& MuiButtonBase-root': {
                color: '#FFFFFF',
              },
              '& .MuiListItemText-root': {
                backgroundColor: 'white',
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
              '& .MuiBackDrop-root': {
                backgroundColor: 'transparant',
              },
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default ViewItems;
