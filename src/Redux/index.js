import { combineReducers } from "redux";
import { facilitesReducer } from "./Reducer/facilities.reducer";
import { organicReducer } from "./Reducer/organic.reducer";
import {reviewReducer} from "../Redux/Reducer/reviews.reducer"
import { cartReducer } from "./Reducer/addCart.reducer";
import  counterSlice  from "./countslice";


export const rootReducer = combineReducers({
    addFacilities : facilitesReducer,
    OrganicProducts : organicReducer,
    userReviews : reviewReducer,
    cartProduct: cartReducer,
    counter : counterSlice,
})