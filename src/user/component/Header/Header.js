import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getDataToCart } from '../../../Redux/Action/addCart.action';
import { ThemeContex } from '../../../Context/ThemeContex';


function Header(props) {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataToCart());
    // dispatch(getReviews());
  }, []);
  // const cartData = useSelector(state => state.cartProduct)
  // console.log(cartData.cart.length);

  const cartdata = useSelector((state) => state.AddtoCart);

  const cartQyt = cartdata.cartDATA.reduce((acc, v, i) => acc + v.qyt, 0)

  const themecontex = useContext(ThemeContex);
  console.log(themecontex);

  const handleTheme = () => {
    themecontex.themeToggle(themecontex.theme)
  }

  return (
    <div>
      {/* Spinner Start */}
      {/* <div id="spinner" className="show w-100 vh-100 bg-white position-fixed translate-middle top-50 start-50  d-flex align-items-center justify-content-center">
    <div className="spinner-grow text-primary" role="status" />
  </div> */}
      {/* Spinner End */}
      {/* Navbar start */}
      <div className={themecontex.theme}>
        <div className="container-fluid fixed-top" >
          <div className="container topbar bg-primary d-none d-lg-block">
            <div className="d-flex justify-content-between">
              <div className="top-info ps-2">
                <small className="me-3"><i className="fas fa-map-marker-alt me-2 text-secondary" /> <a href="#" className="text-white">123 Street, New York</a></small>
                <small className="me-3"><i className="fas fa-envelope me-2 text-secondary" /><a href="#" className="text-white">Email@Example.com</a></small>

              </div>
              <div className="top-link pe-2">
                <a href="#" className="text-white"><small className="text-white mx-2">Privacy Policy</small>/</a>
                <a href="#" className="text-white"><small className="text-white mx-2">Terms of Use</small>/</a>
                <a href="#" className="text-white"><small className="text-white ms-2">Sales and Refunds</small></a>
              </div>
            </div>
          </div>
          <div className="container px-0">
            <nav className="navbar navbar-light  navbar-expand-xl">
              <a href="index.html" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></a>
              <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="fa fa-bars text-primary" />
              </button>
              <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
                <div className="navbar-nav mx-auto">
                  <NavLink to="/" className="nav-item nav-link active">Home</NavLink>
                  <NavLink to="/shop" className="nav-item nav-link">Shop</NavLink>

                  {/* =========================================================== */}

                  <div class="d-flex dropdown-hover-all">
                    <div class="dropdown mt-3">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton222" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown Hover
                      </button>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton222">
                        <a class="dropdown-item" href="#">Action</a>
                        <div class="dropdown dropend">
                          <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                          <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                            <a class="dropdown-item" href="#">Basic</a>
                            <a class="dropdown-item" href="#">Compact Aside</a>
                            {/* <div class="dropdown-divider"></div> */}
                            <div class="dropdown dropend">
                              <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>
                              <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                                <a class="dropdown-item" href="#">Fullscreen</a>
                                <a class="dropdown-item" href="#">Empty</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#">Magic</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </div>
                  {/* ===================================================== */}


                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" id="dropdownMenuButton222" aria-haspopup="true" aria-expanded="false" data-bs-toggle="dropdown">Categories</a>
                    <div class="dropdown dropend">
                          <a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                          <div class="dropdown-menu" aria-labelledby="dropdown-layouts">
                            <a class="dropdown-item" href="#">Basic</a>
                            <a class="dropdown-item" href="#">Compact Aside</a>
                    <div className="dropdown-menu m-0 bg-light rounded-0">
                      <NavLink to="/cart" className="dropdown-item">Cart</NavLink>
                      <NavLink to="/chechOut" className="dropdown-item">Chackout</NavLink>
                      <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                      <NavLink to="/404page" className="dropdown-item">404 Page</NavLink>
                    </div>
                  </div>
                  </div></div>




                  {/* +=================+++++++++++++++++++ */}

                  {/* <NavLink to="/shop_details" className="nav-item nav-link">Shop Detail</NavLink> */}
                  <div className="nav-item dropdown">
                    <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</a>
                    <div className="dropdown-menu m-0 bg-light rounded-0">
                      <NavLink to="/cart" className="dropdown-item">Cart</NavLink>
                      <NavLink to="/chechOut" className="dropdown-item">Chackout</NavLink>
                      <NavLink to="/testimonial" className="dropdown-item">Testimonial</NavLink>
                      <NavLink to="/404page" className="dropdown-item">404 Page</NavLink>
                    </div>
                  </div>
                  <NavLink to="/contact" className="nav-item nav-link">Contact</NavLink>
                </div>
                <div className="d-flex m-3 me-0">
                  <button className='btn border-secondary border bg-white me-4' onClick={handleTheme}>Theme</button>
                  <button className="btn-search btn border border-secondary btn-md-square rounded-circle bg-white me-4" data-bs-toggle="modal" data-bs-target="#searchModal"><i className="fas fa-search text-primary" /></button>
                  <NavLink to="/cart" className="position-relative me-4 my-auto">
                    <i className="fa fa-shopping-bag fa-2x" />
                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center px-1" style={{ top: '-5px', left: 15, height: 20, minWidth: 20 }}>{cartQyt}</span>
                  </NavLink>

                </div>
              </div>
            </nav>
          </div>
        </div >
        {/* Navbar End */}
        {/* Modal Search Start */}
        <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body d-flex align-items-center">
                <div className="input-group w-75 mx-auto d-flex">
                  <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                  <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal Search End */}
      </div >
    </div >


  );
}

export default Header;