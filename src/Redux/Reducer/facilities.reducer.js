import { ADD_FACILITIES } from "../ActionType";

const initialFacilities = {
    isLoding: false,
    error: null,
    Facilities: []
}

export const facilitesReducer = (state = initialFacilities, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FACILITIES:
            return {
                ...state,
                Facilities: state.Facilities.concat(action.payload)
            }
        default:
            return state;
    }

}