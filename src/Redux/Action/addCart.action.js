import axios from "axios"
import { ADD_TO_CART, DELETE_TO_CART, ERROR, GET_DATA_TO_CART, IS_LODING } from "../ActionType"
import { BASE_URL } from "../../Base/BaseUrl"



export const addToCart = (data)=> async(dispatch)=>{

    try {

        await axios.post(BASE_URL+'Cart',data)
            .then((response)=>{
                console.log(response.data);
                dispatch({type:ADD_TO_CART , payload: response.data})
            })
            .catch((error)=>{
                dispatch(errorAddToCart(error.message))
            })         
        
    } catch (error) {
        dispatch(errorAddToCart(error.message))
    }
}

export const deleteProToCart = (id)=> async(dispatch)=>{

    try {

        await axios.delete(BASE_URL+'Cart/'+id)
            .then((response)=>{
                console.log(response.data);
                dispatch({type:DELETE_TO_CART , payload: id})
            })
            .catch((error)=>{
                dispatch(errorAddToCart(error.message))
            })         
        
    } catch (error) {
        dispatch(errorAddToCart(error.message))
    }
}

export const getDataToCart = () => async(dispatch)=>{

    try {

        await axios.get(BASE_URL+'Cart')
            .then((response)=>{
                console.log(response.data);
                dispatch({type:GET_DATA_TO_CART , payload: response.data})
            })
            .catch((error)=>{
                console.log(error);
                dispatch(errorAddToCart(error.message))
            })  
        
    } catch (error) {
        console.log(error);
        dispatch(errorAddToCart(error.message))
    }
}

export const isLodingAddtoCart = () => async(dispatch) => {
    dispatch({ type: IS_LODING })
}
export const errorAddToCart = (error) => async(dispatch) =>{
    dispatch({type: ERROR , payload:error})
}