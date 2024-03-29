import { ADD_FACILITIES } from "../ActionType"

export const addFacilities = (data) => (dispatch) => {

    dispatch({type:ADD_FACILITIES , payload: data})
}