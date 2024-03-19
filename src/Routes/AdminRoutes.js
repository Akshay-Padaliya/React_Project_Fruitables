import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruites from '../Admin/Container/Fruite/Fruites';
import PriveteRoutes from './PriveteRoutes';
import Layout from '../Admin/Componets/Layout/Layout';
import Vegitable from '../Admin/Container/Vegitable/Vegitable';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
            <Routes>
                <Route element= {<PriveteRoutes />}>
                    <Route exact path='/Fruites' element={<Fruites />} />
                    <Route exact path='/Vegitable' element={<Vegitable />} />
                </Route>
            </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes