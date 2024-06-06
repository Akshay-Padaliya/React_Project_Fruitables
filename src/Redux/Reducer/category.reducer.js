import { ADD_CATEGORY, DELETE_CATEGORY, ERROR, GET_CATEGORIES, IS_LODING, UPDATE_CATEGORY } from "../ActionType";

const initialState = {
    isloding: false,
    error: null,
    categories: []
}


export const categoryReducer = (state = initialState, action)=>{
    console.log(action);

    switch(action.type){
        case ADD_CATEGORY:
            return {
                isloding: false,
                error: null,
                categories: state.categories.concat(action.payload)
            }
        case GET_CATEGORIES:
            return {
                isloding: false,
                error: null,
                categories: action.payload
            }
        case DELETE_CATEGORY:
            return {
                isloding: false,
                error: null,
                categories:state.categories.filter((v) => v._id !== action.payload)
            }
        case UPDATE_CATEGORY:
            return{
                isloding: false,
                error: null,
                categories:state.categories.map((v)=>v._id === action.payload._id ? action.payload : v)
            }
        case IS_LODING:
            return {
                ...state,
                isLoding: true,
            }

        case ERROR:
            return {
                ...state,
                isLoding: false,
                error: action.payload
            }

        default:
            return state;
    }
}