import { ADD_FACILITIES, DELETE_FACILITIES, EDITE_FACILITIES, IS_LODING } from "../ActionType"

export const addFacilities = (data) => (dispatch) => {

    dispatch({type:ADD_FACILITIES , payload: data})
}

export const editFacilities = (data) =>(dispatch)=>{
    dispatch({type: EDITE_FACILITIES ,payload : data });
}

export const deleteFacilities = (id) =>(dispatch)=>{
    dispatch({type: DELETE_FACILITIES ,payload : id});
}

export const isLodingFacilities = (val) => (dispatch) =>{
    dispatch({type: IS_LODING, payload : val })
}