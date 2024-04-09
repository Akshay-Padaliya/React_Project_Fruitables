
import {BASE_URL} from "../../Base/BaseUrl"
import axios from "axios";
import { ADD_REVIEWS, ERROR_ORGANIC_PRODUCTS, GET_REVIEWS, IS_LODING } from "../ActionType";


export const getReviews = () => async (dispatch)=>{

    try {
        dispatch(lodingReviews())
        await axios
        .get(BASE_URL +"Reviews")
        .then((response)=>{
            console.log(response.data);
        dispatch({type: GET_REVIEWS , payload: response.data})
            
        })
        .catch((error)=>{
            dispatch(errorReviews(error.message))
        })
        
    } catch (error) {
        dispatch(errorReviews(error.message))
    }

}

export const addReviews = (data) => async (dispatch)=>{

    try {
        dispatch(lodingReviews())
        await axios
        .post(BASE_URL +"Reviews" , data)
        .then((response)=>{
            console.log(response.data);
        dispatch({type: ADD_REVIEWS , payload: response.data})
            
        })
        .catch((error)=>{
            dispatch(errorReviews(error.message))
        })
        
    } catch (error) {
        dispatch(errorReviews(error.message))
    }

} 
export const errorReviews = (error) => async(dispatch) =>{
    dispatch({type : ERROR_ORGANIC_PRODUCTS , payload: error})
}

export const lodingReviews = () => async(dispatch) =>{
    dispatch({type: IS_LODING})
}