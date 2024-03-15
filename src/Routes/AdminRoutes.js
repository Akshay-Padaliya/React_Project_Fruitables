import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../admin/Componets/Products/Products';

function AdminRoutes(props) {
    return (
        <>
        
        <Routes>
        <Route exact path='/products' element = {<Products/>} />
        </Routes>
        </>
    );
}

export default AdminRoutes;