import { ADD_REVIEWS, DELETE_REVIEWS, EDITE_REVIEWS, ERROR_ORGANIC_PRODUCTS, GET_REVIEWS, IS_LODING } from "../ActionType";

const intialState = {
    isloding: false,
    Review: [],
    error: null,

}

export const reviewReducer = (state = intialState, action) => {

    console.log(action);

    switch (action.type) {

        case ADD_REVIEWS:
            return {
                isloding: false,
                Review: state.Review.concat(action.payload),
                error: null,
            }

        case GET_REVIEWS:
            return {
                isloding: false,
                Review: action.payload,
                error: null,
            }
        case EDITE_REVIEWS:
            return{
                isLoding: false,
                error: null,
                Review : state.Review.map((v)=>{
    
                    if(v.id === action.payload.id){
                        return action.payload
                    }else{
                        return v
                    }
    
                })
            }
        case DELETE_REVIEWS:
            return{
                isLoding: false,
                error: null,
                Review: state.Review.filter((v) => v.id !== action.payload)
            }

        case IS_LODING:
            return {
                ...state,
                isloding: true,
            }

        case ERROR_ORGANIC_PRODUCTS:
            return {
                ...state,
                isloding: false,
                error: action.payload
            }

        default:
            return state
    }
}