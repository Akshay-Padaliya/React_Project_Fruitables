import { ADD_TO_CART, DELETE_TO_CART, ERROR, GET_DATA_TO_CART, IS_LODING } from "../ActionType";

const initialState = {
    isloding: false,
    error: null,
    cart: []
}


export const cartReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case ADD_TO_CART:
            alert("successfully Add product to Cart")
            return {
                isloding: false,
                error: null,
                cart: state.cart.concat(action.payload)
            }
        case GET_DATA_TO_CART:
            return {
                isloding: false,
                error: null,
                cart: action.payload
            }
        case DELETE_TO_CART:
            return {
                isloding: false,
                error: null,
                cart:state.cart.filter((v) => v.id !== action.payload)
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
