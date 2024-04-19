
import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setCount } from '../../../Redux/Slice/cart.slice';
// import { addToCart } from '../../../Redux/Action/addCart.action';


export default function AddToCart({obj}) {

    const dispatch = useDispatch();

    const handleAddToCart = ()  => {
      // dispatch(addToCart())
      dispatch(addItem(obj));  
  }
  

  return (

   <Button className="btn border border-secondary rounded-pill px-3 py-2 mb-1 text-primary" onClick={handleAddToCart}>
    <i className="fa fa-shopping-bag me-2 text-primary" />
     Add to cart
     </Button>
  )
}
// btn border border-secondary rounded-pill px-3 text-primary