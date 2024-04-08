import { ADD_REVIEWS, GET_REVIEWS } from "../ActionType";

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
        default:
            return state
    }
}