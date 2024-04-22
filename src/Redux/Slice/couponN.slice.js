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
)

export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        try {
            const response = await axios.get(BASE_URL + 'coupo')
            return response.data
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
)


const couponNSlice = createSlice({
    name: 'coupon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCoupon.fulfilled,
                (state, action) => {
                    state.coupon = state.coupon.concat(action.payload)
                })
            .addCase(getCoupon.fulfilled,
                (state, action) => {
                    state.coupon = action.payload
                })
            .addCase(getCoupon.rejected,
                (state, action) => {
                    console.log(action.error);
                    state.error = action.error
                }
            )
    }
})

export default couponNSlice.reducer