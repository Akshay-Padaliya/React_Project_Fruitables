import axios from "axios";
import { ADD_ORGANIC_PRODUCTS, DELETE_ORGANIC_PRODUCTS, EDITE_ORGANIC_PRODUCTS, IS_LODING } from "../ActionType";

const initialOrganic = {
    isLoding: false,
    error: null,
    Organic: []
}

export const organicReducer = (state = initialOrganic, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_ORGANIC_PRODUCTS:

                // axios.post(`http://localhost:8000/Facilities`, action.payload)
                //     .then(res => {
                //         console.log(res);
                //         // console.log(res.action.payload);
                //     })
                return {
                    ...state,
                    isLoding: false,
                    Organic: state.Organic.concat(action.payload)

                };

        case DELETE_ORGANIC_PRODUCTS:
          
            // axios
            // .delete(`http://localhost:8000/catagory/${action.payload}`)

            return {
                ...state,
                isLoding: false,
                Organic: state.Organic.filter((v) => v.id !== action.payload)
            };
           



        case EDITE_ORGANIC_PRODUCTS:

        // axios
        // .put(`http://localhost:8000/catagory/${action.payload.id}`, action.payload)

        return {
            ...state,
            isLoding: false,
            Organic : state.Organic.map((v)=>{

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