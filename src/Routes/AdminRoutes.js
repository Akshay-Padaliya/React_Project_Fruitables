import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../Admin/Componets/Products/Products';
import PriveteRoutes from './PriveteRoutes';

function AdminRoutes(props) {
    return (
        <>

            <Routes>
                <Route element= {<PriveteRoutes />}>
                    <Route exact path='/products' element={<Products />} />
                </Route>
            </Routes>
        </>
    );
}

export default AdminRoutes