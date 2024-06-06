import { combineReducers } from "redux";
import { facilitesReducer } from "./Reducer/facilities.reducer";
import { organicReducer } from "./Reducer/organic.reducer";
import {reviewReducer} from "../Redux/Reducer/reviews.reducer"
import { cartReducer } from "./Reducer/addCart.reducer";
import  counterSlice  from "./countslice";
import cartSlice from "./Slice/cart.slice";
import couponSlice from "./Slice/coupon.slice";
import couponNSlice from "./Slice/couponN.slice";
import subcategorySlice from "./Slice/subcategory.slice";
import { categoryReducer } from "./Reducer/category.reducer";


export const rootReducer = combineReducers({
    addFacilities : facilitesReducer,
    OrganicProducts : organicReducer,
    userReviews : reviewReducer,
    cartProduct: cartReducer,
    counter : counterSlice,
    AddtoCart: cartSlice,
    // coupons: couponSlice,
    couponN: couponNSlice,
    Categories : categoryReducer,
    SubCategories : subcategorySlice,
})