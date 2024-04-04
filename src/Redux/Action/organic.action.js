import axios from "axios";
import { ADD_ORGANIC_PRODUCTS, DELETE_ORGANIC_PRODUCTS, EDITE_ORGANIC_PRODUCTS, IS_LODING } from "../ActionType"
import { BASE_URL } from "../../Base/BaseUrl";

export const getOrganic = () => (dispatch) => {

    dispatch(isLodingOrganic())

    try {
        axios.get(BASE_URL + 'Organic')
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: ADD_ORGANIC_PRODUCTS, payload: res.data })
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }
}

export const addOrganic = (Ndata) => (dispatch) => {
    dispatch(isLodingOrganic())
    try {
        axios.post(BASE_URL + 'Organic', Ndata)
            .then(res => {
                console.log(res);
                console.log(res.data);
                dispatch({ type: ADD_ORGANIC_PRODUCTS, payload: Ndata })
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }



}

export const editOrganic = (data) => (dispatch) => {

    dispatch(isLodingOrganic())

    try {
        axios
            .put(BASE_URL + 'Organic/' + data.id, data)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }

    dispatch({ type: EDITE_ORGANIC_PRODUCTS, payload: data });
}

export const deleteOrganic = (id) => (dispatch) => {
    dispatch(isLodingOrganic())
    try {
        axios
            .delete(BASE_URL + 'Organic/' + id)
            .then(res => {
                console.log(res);
                console.log(res.data);
              
            })
            .catch((error) => {
                console.log(error);
            })

    } catch (error) {
        console.log(error);
    }
    dispatch({ type: DELETE_ORGANIC_PRODUCTS, payload: id });
}

export const isLodingOrganic = () => (dispatch) => {
    dispatch({ type: IS_LODING })
}