import { ADD_FACILITIES, DELETE_ROW, EDITE_ROW } from "../ActionType";

const initialFacilities = {
    isLoding: false,
    error: null,
    Facilities: []
}

let newList = [];
let index = '';

export const facilitesReducer = (state = initialFacilities, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FACILITIES:

        if(newList.length === 0){
            return {
                ...state,
                Facilities: state.Facilities.concat(action.payload)

            };
        }else{
            newList[index] = action.payload;
            console.log(newList);
            return {
                ...state,
                Facilities: newList
            };
        }
           
        case DELETE_ROW:
            return {
                ...state,
                Facilities: state.Facilities.filter((v) => v.id !== action.payload)
            };



        case EDITE_ROW:
            
            newList = [...state.Facilities];
             index = newList.findIndex((v) => v.id === action.payload.id);
            console.log(index);
        
        default:
            return state;
    }

}