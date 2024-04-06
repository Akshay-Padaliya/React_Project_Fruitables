import { combineReducers } from "redux";
import { facilitesReducer } from "./Reducer/facilities.reducer";
import { organicReducer } from "./Reducer/organic.reducer";
import {reviewReducer} from "../Redux/Reducer/reviews.reducer"

export const rootReducer = combineReducers({
    addFacilities : facilitesReducer,
    OrganicProducts : organicReducer,
    userReviews : reviewReducer
})