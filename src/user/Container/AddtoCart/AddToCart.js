
// import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem, setCount } from '../../../Redux/Slice/cart.slice';
import Button from '../../component/UI/Button/Button';


export default function AddToCart({ obj }) {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // dispatch(addToCart())
    dispatch(addItem(obj));
  }


  return (

     <Button className="px-3 py-2 mb-1" onClick={handleAddToCart}>
      <i className="fa fa-shopping-bag me-2 text-primary" />
       Add to cart
       </Button>
  )
}
