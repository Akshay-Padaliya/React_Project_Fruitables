import axios from "axios";
import { ADD_ORGANIC_PRODUCTS, DELETE_ORGANIC_PRODUCTS, EDITE_ORGANIC_PRODUCTS, ERROR_ORGANIC_PRODUCTS, GET_ORGANIC_PRODUCTS, IS_LODING } from "../ActionType"
import { BASE_URL } from "../../Base/BaseUrl";


export const errorOrganic = (error) => async(dispatch) =>{
    dispatch({type: ERROR_ORGANIC_PRODUCTS , payload:error})
}

export const getOrganic = () => async (dispatch) => {
    try {
        dispatch(isLodingOrganic())
        await axios.get(BASE_URL + 'Fruits')
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: GET_ORGANIC_PRODUCTS, payload: res.data })
            })
            .catch((error) => {
                dispatch(errorOrganic(error.message))
                // console.log(error);
            })

    } catch (error) {
        dispatch(errorOrganic(error.message))
        // console.log(error);
    }
}

export const addOrganic = (Ndata) => async (dispatch) => {
    dispatch(isLodingOrganic())
    try {
        await axios.post(BASE_URL + 'Fruits', Ndata)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: ADD_ORGANIC_PRODUCTS, payload: res.data})
            })
            .catch((error) => {
                dispatch(errorOrganic(error.message))
              
            })

    } catch (error) {
        dispatch(errorOrganic(error.message))
     
    }


}

export const editOrganic = (data) => async (dispatch) => {

    dispatch(isLodingOrganic())

    try {
        await axios
            .put(BASE_URL + 'Fruits/' + data.id, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: EDITE_ORGANIC_PRODUCTS, payload: data });
            })
            .catch((error) => {
                dispatch(errorOrganic(error.message))
              
            })

    } catch (error) {
        dispatch(errorOrganic(error.message))
     
    }

    

}

export const deleteOrganic = (id) => async (dispatch) => {
    dispatch(isLodingOrganic())
    try {
        await axios
            .delete(BASE_URL + 'Fruits/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: DELETE_ORGANIC_PRODUCTS, payload: id });
            })
            .catch((error) => {
                dispatch(errorOrganic(error.message))
              
            })

    } catch (error) {
        dispatch(errorOrganic(error.message))
       
    }

}

export const isLodingOrganic = () => async(dispatch) => {
    dispatch({ type: IS_LODING })
}