
import { ADD_ORGANIC_PRODUCTS, DELETE_ORGANIC_PRODUCTS, EDITE_ORGANIC_PRODUCTS, GET_ORGANIC_PRODUCTS, IS_LODING } from "../ActionType";

const initialOrganic = {
    isLoding: false,
    error: null,
    Organic: []
}

export const organicReducer = (state = initialOrganic, action) => {
    console.log(action);

    switch (action.type) {

        case GET_ORGANIC_PRODUCTS: 
        // console.log("dvfddd");

        return{
            ...state,
            Organic: action.payload
        }
        case ADD_ORGANIC_PRODUCTS:
            // console.log("add");
             
                return {
                    ...state,
                    isLoding: false,
                    Organic: state.Organic.concat(action.payload)

                };

        case DELETE_ORGANIC_PRODUCTS:
          
         
            return {
                ...state,
                isLoding: false,
                Organic: state.Organic.filter((v) => v.id !== action.payload)
            };
        

        case EDITE_ORGANIC_PRODUCTS:

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