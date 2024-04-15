
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Redux/Action/addCart.action';
import { addItem } from '../../../Redux/Slice/cart.slice';


export default function AddToCart({data}) {

  const cartdata = useSelector((state) => state.AddtoCart);
  console.log(cartdata);
  console.log(cartdata.cartDATA);
  
  console.log(data);

    const dispatch = useDispatch();

    const handleAddToCart = ()  => {
      console.log("dvdvd");
      console.log(data);
      dispatch(addToCart(data));
      dispatch(addItem(data));  
  }

  return (

   <Button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={()=>handleAddToCart()}>
    <i className="fa fa-shopping-bag me-2 text-primary" />
     Add to cart
     </Button>
  )
}
