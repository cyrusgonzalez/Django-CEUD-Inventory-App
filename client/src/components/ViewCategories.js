import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { Edit, Delete } from '@mui/icons-material';
import { Container, Button, useMediaQuery, useTheme } from '@mui/material';
import '../style/App.css';
import '../style/Accounts.css';

function ViewCategories() {
  const [categories, setCategories] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm') || theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [ pageSize, setPageSize ] = useState(25);

  useEffect(() => {
    axios.get('http://localhost:8000/inventory/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (id) => {
    navigate(`/editcategory/${id}`);
  };

  const handleDelete = (id) => {
    navigate(`/deletecategory/${id}`);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 2,
      editable: false,
      hideable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      hideable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' , height: '93%'}}>
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

  const rows = categories.map(category => ({
    id: category.category_id,
    name: category.name
  }));

  return (
    <div style={{ marginLeft: '20%'}}>
      <h1 style={{backgroundColor: '#C8C372'}}>Categories</h1>
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
          to="/addcategory"
          style={{
            marginBottom: '20px',
            backgroundColor: '#1E4D2B',
            color: '#FFFFFF'
          }}
        >
          Add Category
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
                  backgroundColor: 'rgba(0, 0, 0, 1)',
                  zIndex: 1300,
                  right: 0,
                  bottom: 0,
                  top: 0,
                  left: 0,
              }
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default ViewCategories;
