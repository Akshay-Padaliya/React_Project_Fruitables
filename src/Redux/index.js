import { combineReducers } from "redux";
import { facilitesReducer } from "./Reducer/facilities.reducer";
import { organicReducer } from "./Reducer/organic.reducer";

export const rootReducer = combineReducers({
    addFacilities : facilitesReducer,
    OrganicProducts : organicReducer 
})