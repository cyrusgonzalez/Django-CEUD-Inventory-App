// DEPRECATED: used for reference in the app routing
// do not call this page in the api calls!!
import '../style/App.css';
import '../style/Inventory.css'
import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import StaticInvNavBar from '../components/InvNavbar';
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
            <StaticInvNavBar />
            <Routes>
                <Route exact path="/main" element={<InventoryHome />} />
                <Route path="/main/additem" element={<AddItem />} />
                <Route path="/main/addlab" element={<AddLab />} />
                <Route path="/main/addcategory" element={<AddCategory />} />
                <Route path="/main/edititem" element={<EditItem />} />
                <Route path="/main/deleteitem" element={<DeleteItem />} />
                <Route path="/main/deletelab" element={<DeleteLab />} />
                <Route path="/main/deletecategory" element={<DeleteCategory />} />
            </Routes>
        </div>
    );
}

export default InventoryPage;