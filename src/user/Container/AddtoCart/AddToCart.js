
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Redux/Action/addCart.action';


export default function AddToCart({data}) {
  
  console.log(data);

    const dispatch = useDispatch();

    const handleAddToCart = ()  => {
      console.log("dvdvd");
      console.log(data);
      dispatch(addToCart(data));  
      // alert("successfully Add product to Cart")
  }

  return (

   <Button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={()=>handleAddToCart()}>
    <i className="fa fa-shopping-bag me-2 text-primary" />
     Add to cart
     </Button>
  )
}
