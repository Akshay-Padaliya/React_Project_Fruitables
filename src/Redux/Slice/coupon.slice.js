import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL } from "../../Base/BaseUrl";

export const getCouponData = createAsyncThunk('coupon/getCouponData',
    async () => {
        const response = await axios.get(BASE_URL + 'coupon')
        console.log(response.data);
        return response.data
    });

export const addCouponData = createAsyncThunk('coupon/addCouponData',
    async (data) => {
        try {
            const response = await axios.post(BASE_URL + 'coupon', data)
            console.log(response.data);
            return response.data
        } catch (error) {
            console.log(error);
            return error
        }
       
    });

export const editCouponData = createAsyncThunk('coupon/editCouponData',
    async (data) => {
        const response = await axios.put(BASE_URL + 'coupon/' + data.id, data)
        console.log(response.data);
        return response.data
    });

export const deleteCouponData = createAsyncThunk('coupon/deleteCouponData',
    async (id) => {
        const response = await axios.delete(BASE_URL + 'coupon/' + id)
        return id
    });



const initialState = {
    isloding: false,
    error: null,
    coupon: []
}

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        console.log(builder);
        builder
        .addCase(getCouponData.pending, (state,action) => {
            state.isloding = true
        })
        builder.addCase(getCouponData.fulfilled, (state,action) => {
            console.log(action.payload);
            state.isloding = false
            state.coupon = action.payload
        })
        .addCase(getCouponData.rejected, (state,action) => {
            state.isloding = false
            console.log(action.payload);
            state.error = action.payload
           
        })
        .addCase(addCouponData.fulfilled, (state,action) => {
            state.isloding = false
            console.log(action.payload);
            state.coupon.push(action.payload)
           
        })
        .addCase(editCouponData.fulfilled, (state , action) =>{
            state.isloding = false
            console.log(action.payload);
            state.coupon = state.coupon.map((v) => v.id === action.payload.id ? action.payload : v)
        })
        .addCase(deleteCouponData.fulfilled, (state, action) => {
            state.isloding = false
            console.log(action.payload);
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })

    }
})

export default couponSlice.reducer
