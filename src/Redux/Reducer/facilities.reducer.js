import axios from "axios";
import { ADD_FACILITIES, DELETE_FACILITIES, EDITE_FACILITIES, IS_LODING } from "../ActionType";

const initialFacilities = {
    isLoding: true,
    error: null,
    Facilities: []
}

export const facilitesReducer = (state = initialFacilities, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_FACILITIES:

                axios.post(`http://localhost:8000/Facilities`, action.payload)
                    .then(res => {
                        console.log(res);
                        // console.log(res.action.payload);
                    })
                return {
                    ...state,
                    Facilities: state.Facilities.concat(action.payload)

                };

        case DELETE_FACILITIES:

            axios
                .delete(`http://localhost:8000/catagory/${action.payload}`)

            return {
                ...state,
                Facilities: state.Facilities.filter((v) => v.id !== action.payload)
            };



        case EDITE_FACILITIES:

        axios
        .put(`http://localhost:8000/catagory/${action.payload.id}`, action.payload)

        return {
            ...state,
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
                isLoding: false,
            }
            
        default:
            return state;
    }

}