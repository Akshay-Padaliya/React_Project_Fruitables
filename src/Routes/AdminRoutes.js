import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruites from '../Admin/Container/Fruite/Fruites';
import PriveteRoutes from './PriveteRoutes';
import Layout from '../Admin/Componets/Layout/Layout';
import Vegitable from '../Admin/Container/Vegitable/Vegitable';
import Category from '../Admin/Container/Category/Category';
import Facilites from '../Admin/Container/Facilites/Facilites';
import OrganicProducts from '../Admin/Container/OrganicProducts/OrganicProducts';
import Coupon from '../Admin/Container/Coupon/Coupon';
import Contact from '../Admin/Container/Contact/Contact';
import SubCategory from '../Admin/Container/SubCategory/SubCategory';
import Products from '../Admin/Container/Products/Products';

function AdminRoutes(props) {
    return (
        <>
            <Layout>
                <Routes>
                    <Route element={<PriveteRoutes />}>
                        <Route exact path='/category' element={<Category />} />
                        <Route exact path='/subcategory' element={<SubCategory />} />
                        <Route exact path='/products' element={<Products />} />
                        <Route exact path='/Fruites' element={<Fruites />} />
                        <Route exact path='/Vegitable' element={<Vegitable />} />
                        <Route exact path='/facilites' element={<Facilites />} />
                        <Route exact path = '/organicProduct' element ={<OrganicProducts/>}/>
                        <Route exact path = '/coupon' element ={<Coupon/>}/>
                        <Route exact path = '/contact' element ={<Contact/>}/>
                    </Route>
                </Routes>
            </Layout>
        </>
    );
}

export default AdminRoutes