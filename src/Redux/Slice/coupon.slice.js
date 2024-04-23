import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../Base/BaseUrl";

export const getCouponData = createAsyncThunk('coupon/getCouponData',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'coupon')
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error
        }
    });

export const addCouponData = createAsyncThunk('coupon/addCouponData',
    async (data) => {
        try {
            const response = await axios.post(BASE_URL + 'coupon', data)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error.message
        }

    });

export const editCouponData = createAsyncThunk('coupon/editCouponData',
    async (data) => {
        try {
            const response = await axios.put(BASE_URL + 'coupon/' + data.id, data)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error.message
        }
    });

export const deleteCouponData = createAsyncThunk('coupon/deleteCouponData',
    async (id) => {
        try {
            const response = await axios.delete(BASE_URL + 'coupon/' + id)
            return id
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    });



const initialState = {
    isLoding: false,
    error: null,
    coupon: []
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {  },
    extraReducers: (builder) => {
       
        // [getCouponData.fulfilled] : (state, action) => {
        //     console.log(action.payload);
        //     state.isLoding = false
        //     state.coupon = action.payload
        // }
        
         // console.log(builder);
        builder
            .addCase(getCouponData.pending, (state, action) => {
                console.log(action.payload);

                state.isLoding = true
            })
            builder.addCase(getCouponData.fulfilled, (state, action) => {
                console.log(action.payload);

                state.isLoding = false
                state.coupon = action.payload
            })
            builder.addCase(getCouponData.rejected, (state, action) => {
                console.log(action.payload);

                state.isLoding = false
                state.error = action.payload

            })
            builder.addCase(addCouponData.fulfilled, (state, action) => {

                console.log(action.payload);

                state.isLoding = false
                state.coupon.push(action.payload)

            })
            builder.addCase(editCouponData.fulfilled, (state, action) => {

                console.log(action.payload);

                state.isLoding = false
                state.coupon = state.coupon.map((v) => v.id === action.payload.id ? action.payload : v)
            })
            builder.addCase(deleteCouponData.fulfilled, (state, action) => {

                console.log(action.payload);

                state.isLoding = false
                state.coupon = state.coupon.filter((v) => v.id !== action.payload)
            })

    }
})

export default couponSlice.reducer
