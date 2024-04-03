import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruites from '../Admin/Container/Fruite/Fruites';
import PriveteRoutes from './PriveteRoutes';
import Layout from '../Admin/Componets/Layout/Layout';
import Vegitable from '../Admin/Container/Vegitable/Vegitable';
import Category from '../Admin/Container/Category/Category';
import Facilites from '../Admin/Container/Facilites/Facilites';
import OrganicProducts from '../Admin/Container/OrganicProducts/OrganicProducts';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route element={<PriveteRoutes />}>
                        <Route exact path='/category' element={<Category />} />
                        <Route exact path='/Fruites' element={<Fruites />} />
                        <Route exact path='/Vegitable' element={<Vegitable />} />
                        <Route exact path='/facilites' element={<Facilites />} />
                        <Route exact path = '/organicProduct' element ={<OrganicProducts/>}/>
                    </Route>
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes