import { combineReducers } from "redux";
import { facilitesReducer } from "./Reducer/facilities.reducer";

export const rootReducer = combineReducers({
    addFacilities : facilitesReducer,
})