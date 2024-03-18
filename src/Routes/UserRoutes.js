import React from 'react';
import Header from '../user/component/Header/Header';
import Home from '../user/Container/Home/Home';
import Footer from '../user/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Shop from '../user/Container/Shop/Shop';
import ShopDetails from '../user/Container/Shop_Details/ShopDetails';
import Cart from '../user/Container/Cart/Cart';
import CheckOut from '../user/Container/CheckOut/CheckOut';
import Testimonial from '../user/Container/Testimonial/Testimonial';
import ErrorPage from '../user/Container/404Page/404Page';
import Contact from '../user/Container/Contact/Contact';
import UseParams from '../user/Container/useparams/UseParams';
import PriveteRoutes from './PriveteRoutes';

function UserRoutes(props) {
  return (
    <>

      <Header />
      {/* <Route exact path="/" element={<Header/>}/> */}
      <Routes>
        <Route exact path="/:fname" element={<UseParams />} />
        <Route exact path="/" element={<Home />} />
        <Route element={<PriveteRoutes/>}>
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/shop_details" element={<ShopDetails />} />
          <Route exact path="/shop/:id" element={<ShopDetails />} />
          <Route exact path="/cart" element={<Cart />} />
        </Route>
        <Route exact path="/chechOut" element={<CheckOut />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/404page" element={<ErrorPage />} />
        <Route exact path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default UserRoutes;