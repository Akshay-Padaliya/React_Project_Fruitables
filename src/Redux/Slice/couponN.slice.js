import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../Base/BaseUrl"

const initialState = {
    isLoading: false,
    error: null,
    coupon: []
}

export const addCoupon = createAsyncThunk(
    'coupon/add',
    async (data) => {
        try {
            const response = await axios.post(BASE_URL + 'coupon', data)
            return response.data
        } catch (error) {
            return error.massege
        }
    }
);

export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'coupon')
            return response.data
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
);

export const editCoupon = createAsyncThunk(
    'coupon/edit',
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

export const deleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (id) => {
        try {
            const response = await axios.delete(BASE_URL + 'coupon/' + id)
            return id
        } catch (error) {
            console.log(error.message);
            return error.message
        }
    });

const couponNSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCoupon.fulfilled, (state, action) => {
                state.coupon = state.coupon.concat(action.payload)
            })
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload
        })
        builder.addCase(getCoupon.rejected, (state, action) => {
            console.log(action.error);
            state.error = action.error
        })
        builder.addCase(editCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => v.id === action.payload.id ? action.payload : v)
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            console.log(action.payload);
            state.coupon = state.coupon.filter((v) => v.id !== action.payload)
        })
    }
})

export default couponNSlice.reducer