import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProToCart, getDataToCart } from '../../../Redux/Action/addCart.action';
import { decreamentQyt, increamentQyt, removeData } from '../../../Redux/Slice/cart.slice';
import { getOrganic } from '../../../Redux/Action/organic.action';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { getCouponData } from '../../../Redux/Slice/coupon.slice';
import { getCoupon } from '../../../Redux/Slice/couponN.slice';

function Cart(props) {

    const [discount, setDiscount] = useState(0);
    const [msg, setMsg] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataToCart());
        dispatch(getOrganic());
        dispatch(getCouponData());
        dispatch(getCoupon());

    }, []);

    const handleRemove = (id) => {
        console.log(id);
        dispatch(removeData(id))

    }

    const cart = useSelector((state) => state.AddtoCart);
    console.log(cart.cartDATA);

    const productData = useSelector(state => state.OrganicProducts);
    console.log(productData.Organic);

    const couponData = useSelector((state) => state.couponN)
    console.log(couponData.coupon);

    const cartData = cart.cartDATA.map((v) => {
        console.log(v);
        let data = productData.Organic.find((x) => x.id == v.pid)
        console.log(data);

        return { ...data, qyt: v.qyt }
    });

    let flage = true;

    const handleCoupon = (code) =>{
        console.log(code);
        couponData.coupon.map((v) => {  
            if (v.name === code) {
                console.log("Match Code");

                let date = new Date(v.expiry).toLocaleDateString()
                console.log(date);
                if (date >= new Date().toLocaleDateString()) {
                    console.log("code Aplly");

                    setDiscount(v.discount)
                    setMsg('')
                } else {
                    console.log("code Expire");

                    setDiscount(0)
                    setMsg(false)
                  
                    // setMsg('Your Code is Expire')
                }
               
            } else {
                console.log("not valid");
                setMsg(true)
                flage = false
                // setMsg('Your Code Not Valid')
            }

        })
    }

    let couponSchema = object({
        code: string().required(),
    });
    const formik = useFormik({
        initialValues: {
            code: ''
        },
        validationSchema: couponSchema,
        onSubmit: (values, { resetForm }) => {
            console.log(values.code);
            handleCoupon(values.code)
            formik.resetForm()
        },
    });
    const { handleSubmit, handleChange, handleBlur, values, errors } = formik

    // const handledisCount = (event) => {
        // setDiscount(0);
        // setDisp('')
        // event.preventDefault();
        // couponData.coupon.map((v) => {
        //     if (v.name === inputCode) {
        //         let date = new Date(v.expiry).toLocaleDateString()
        //         if (date > new Date().toLocaleDateString()) {
        //             setDiscount(v.discount)
        //             setDisp('')
        //         } else {
        //             setDiscount(0)
        //             setDisp('Your Code Expire')
        //         }
        //     } else {
        //         setDisp('Your Code Not Valid')
        //     }

        // })
    // }

    let totalcost = 0;
    cartData.map((v) => (
        totalcost = totalcost + v.price * v.qyt
    ))
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
                                    cartData.map((v) => (

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
                                                            onClick={() => dispatch(decreamentQyt(v.id))}
                                                            disabled={v.qyt === 1}>
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <span className="form-control form-control-sm text-center border-0" >{v.qyt}</span>
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => dispatch(increamentQyt(v.id))}>
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{(v.price * v.qyt).toFixed(2)} $</p>
                                            </td>
                                            <td>
                                                <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleRemove(v.id)}>
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
                        <form onSubmit={handleSubmit}>
                            <input type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                id="code"
                                name="code"
                                // onChange = {e => setInputCode(e.target.value)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.code}
                            />
                            <button className="btn border-secondary rounded-pill px-4 py-3 text-primary" type="submit" >Apply Coupon</button>
                            {errors.code ? <p className='text-danger'>{ errors.code} </p> : ''}
                            {discount > 0 ? <p className='text-success'> Your Discount is {discount} % </p> : <p className='text-danger'>{msg === true ? 'Your Code Not Valid' : '' }{msg === false ? 'Your code is Expried' : '' } </p>}

                        </form>
                    </div>
                    <div className="row g-4 justify-content-end">
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">$ {(totalcost).toFixed(2)}</p>
                                    </div>
                                    {discount > 0 ?
                                        (<div className="d-flex justify-content-between mb-4">
                                            <h5 className="mb-0 me-4 text-success">Discount:</h5>
                                            <p className="mb-0 text-success">$ {(totalcost * discount / 100).toFixed(2)}</p>
                                        </div>) : ''
                                    }
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
                                    <p className="mb-0 pe-4"> $ {((totalcost) - (totalcost * discount / 100) + 3).toFixed(2)}</p>
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