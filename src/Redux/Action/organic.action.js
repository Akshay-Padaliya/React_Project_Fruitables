import axios from "axios";
import { ADD_ORGANIC_PRODUCTS, DELETE_ORGANIC_PRODUCTS, EDITE_ORGANIC_PRODUCTS, IS_LODING } from "../ActionType"

export const addOrganic = (data) => (dispatch) => {
    dispatch(isLodingOrganic())
    axios.post(`http://localhost:8000/Organic`, data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
    dispatch({ type: ADD_ORGANIC_PRODUCTS, payload: data })

}

export const editOrganic = (data) => (dispatch) => {
    dispatch(isLodingOrganic())
    axios
        .put(`http://localhost:8000/catagory/${data.id}`, data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        dispatch({ type: EDITE_ORGANIC_PRODUCTS, payload: data });
}

export const deleteOrganic = (id) => (dispatch) => {
    dispatch(isLodingOrganic())
    axios
        .delete(`http://localhost:8000/catagory/${id}`)
    dispatch({ type: DELETE_ORGANIC_PRODUCTS, payload: id });
}

export const isLodingOrganic = () => (dispatch) => {
    dispatch({ type: IS_LODING })
}