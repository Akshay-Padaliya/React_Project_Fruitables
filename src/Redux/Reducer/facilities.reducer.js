
import { ADD_FACILITIES, DELETE_FACILITIES, EDITE_FACILITIES, GET_FACILITIES, IS_LODING } from "../ActionType";

const initialFacilities = {
    isLoding: false,
    error: null,
    Facilities: []
}

export const facilitesReducer = (state = initialFacilities, action) => {
    console.log(action);

    switch (action.type) {

        case GET_FACILITIES: {
            return{
                ...state,
                isLoding: false,
            }
        }
        case ADD_FACILITIES:
                return {
                    ...state,
                    isLoding: false,
                    Facilities: state.Facilities.concat(action.payload)

                };

        case DELETE_FACILITIES:
          
            return {
                ...state,
                isLoding: false,
                Facilities: state.Facilities.filter((v) => v.id !== action.payload)
            };
           



        case EDITE_FACILITIES:

        return {
            ...state,
            isLoding: false,
            Facilities : state.Facilities.map((v)=>{

                if(v.id === action.payload.id){
                    return action.payload
                }else{
                    return v
                }

            })
        }

        case IS_LODING: 
            return{
                ...state,
                isLoding: true,
            }
            
        default:
            return state;
    }

}