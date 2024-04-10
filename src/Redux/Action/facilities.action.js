import { ADD_FACILITIES, DELETE_FACILITIES, EDITE_FACILITIES, GET_FACILITIES, IS_LODING } from "../ActionType"

export const getFacilities = () => (dispatch) => {
    dispatch(isLodingFacilities())
    setTimeout(() => {
        dispatch({ type: GET_FACILITIES })
    }, 1000)
}

export const addFacilities = (data) => (dispatch) => {

    dispatch(isLodingFacilities())
    setTimeout(() => {
        dispatch({ type: ADD_FACILITIES, payload: data })
    }, 1000)

}

export const editFacilities = (data) => (dispatch) => {
    dispatch(isLodingFacilities())
    setTimeout(() => {
        dispatch({ type: EDITE_FACILITIES, payload: data });
    }, 1000)
}

export const deleteFacilities = (id) => (dispatch) => {
    dispatch(isLodingFacilities())
    setTimeout(() => {
        dispatch({ type: DELETE_FACILITIES, payload: id });
    }, 1000)
}

export const isLodingFacilities = () => (dispatch) => {
    dispatch({ type: IS_LODING })
}