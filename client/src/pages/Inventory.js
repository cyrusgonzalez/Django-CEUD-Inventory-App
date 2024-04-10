import {React } from 'react';
import { useState } from 'react';
import '../style/App.css';
import '../style/Inventory.css'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StaticNavBar from '../components/InvNavbar';
import InventoryHome from '../components/InventoryHome';
import AddItem from '../components/AddItem';
import AddLab from '../components/AddLab';
import AddCategory from '../components/AddCategory';
import EditItem from '../components/EditItem';
import DeleteItem from '../components/DeleteItem';
import DeleteLab from '../components/DeleteLab';
import DeleteCategory from '../components/DeleteCategory';

function InventoryPage(){
    return(
        <div className='App'>
            <h1>Inventory Home Page</h1>
            <p>This is the home page; put instructions here.</p>
            <Router>
                <StaticNavBar />
                <Routes>
                    <Route exact path="/inventory" element={<InventoryHome />} />
                    <Route path="/inventory/additem" element={<AddItem />} />
                    <Route path="/inventory/addlab" element={<AddLab />} />
                    <Route path="/inventory/addcategory" element={<AddCategory />} />
                    <Route path="/inventory/edititem" element={<EditItem />} />
                    <Route path="/inventory/deleteitem" element={<DeleteItem />} />
                    <Route path="/inventory/deletelab" element={<DeleteLab />} />
                    <Route path="/inventory/deletecategory" element={<DeleteCategory />} />
                </Routes>
            </Router>
        </div>
    );
}

export default InventoryPage;