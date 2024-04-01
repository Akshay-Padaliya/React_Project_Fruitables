import { ADD_FACILITIES, DELETE_ROW, EDITE_ROW } from "../ActionType"

export const addFacilities = (data) => (dispatch) => {

    dispatch({type:ADD_FACILITIES , payload: data})
}

export const editedData = (raw) =>(dispatch)=>{
    dispatch({type: EDITE_ROW,payload : raw});
}

export const deleteRow = (id) =>(dispatch)=>{
    dispatch({type: DELETE_ROW ,payload : id});
}