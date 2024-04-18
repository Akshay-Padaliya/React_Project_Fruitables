
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../Redux/Slice/cart.slice';
// import { addToCart } from '../../../Redux/Action/addCart.action';


export default function AddToCart({pid}) {

  const cartdata = useSelector((state) => state.AddtoCart);
  console.log(cartdata);
  console.log(cartdata.cartDATA);

  const countVal = useSelector(state => state.counter);
  console.log(countVal.count);

    const dispatch = useDispatch();

    const handleAddToCart = ()  => {
      // dispatch(addToCart())
      dispatch(addItem(pid));  
  }

  return (

   <Button className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary" onClick={handleAddToCart}>
    <i className="fa fa-shopping-bag me-2 text-primary" />
     Add to cart
     </Button>
  )
}
    