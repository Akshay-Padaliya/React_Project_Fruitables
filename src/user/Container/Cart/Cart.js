import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProToCart, getDataToCart } from '../../../Redux/Action/addCart.action';
import { decreamentCount, increamentCount } from '../../../Redux/countslice';
import { decreamentQyt, increamentQyt, removeData } from '../../../Redux/Slice/cart.slice';





function Cart(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataToCart());
        // dispatch(getReviews());
      }, []);

    const handleRemove = (id) => {  
        console.log(id);
        // dispatch(deleteProToCart(id));
        dispatch(removeData(id))

    }

    const cart = useSelector((state) => state.AddtoCart);
    console.log(cart.cartDATA);

    const productData = useSelector(state=> state.OrganicProducts);
    console.log(productData.Organic);

      const cartData =  cart.cartDATA.map((v) => {
        console.log(v);
            let data = productData.Organic.find((x)=> x.id == v.pid)
            console.log(data);
            
            return {...data, qyt: v.qyt }
        }); 

    let totalcost = 0;
    cartData.map((v)=> (
        totalcost =  totalcost + v.price*v.qyt
    ) )
    console.log(Math.round(totalcost));
    
    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartData.map((v)=>(

                                        <tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={v.image} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{v.name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{v.price} $</p>
                                        </td>
                                        <td>
                                        {/* <div className="input-group quantity mt-4" style={{ width: 100 }}> */}
                                            {/* <Counter value = {v.quantity}/> */}
                                            {/* </div> */}
                                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                <div className="input-group-btn">
                                                    <button 
                                                    className="btn btn-sm btn-minus rounded-circle bg-light border" 
                                                    onClick={()=>dispatch(decreamentQyt(v.id))}
                                                    disabled = {v.qyt === 1}>
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                <span className="form-control form-control-sm text-center border-0" >{v.qyt}</span>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={()=>dispatch(increamentQyt(v.id))}>
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{(v.price*v.qyt).toFixed(2)} $</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={()=>handleRemove(v.id)}>
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>

                                    ))
                                }
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-5">
                        <input type="text" className="border-0 border-bottom rounded me-5 py-3 mb-4" placeholder="Coupon Code" />
                        <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="button">Apply Coupon</button>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">$ {Math.round(totalcost)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $3.00</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to India.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4"> $ {Math.round(totalcost)+3}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>
    );
}

export default Cart;