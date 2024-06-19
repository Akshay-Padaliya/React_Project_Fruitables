import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getproducts = createAsyncThunk(
    'products/get',
    async (thunkAPI) => {
        try {
            const response = await axios.get("http://localhost:9000/api/v1/products/list-products")
            console.log(response.data);
            return response.data.data
        } catch (error) {
            return thunkAPI.rejecteWithValue(error.message) 
        }
    }
);

export const addproduct = createAsyncThunk(
    'products/add',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:9000/api/v1/products/add-product", data,{
                headers: {
                    'Content-Type': 'multipart/form-data'
            }})
            console.log(response.data);
            return response.data.data
        } catch (error) {
            return error.massege
        }
    }
);

export const deleteproduct = createAsyncThunk(
    'products/delete',
    async (id) => {
        try {
            await axios.delete("http://localhost:9000/api/v1/products/delete-product/" + id)
            return id
        } catch (error) {
            return error.massege
        }
    }
);
export const updateproduct = createAsyncThunk(
    'products/update',
    async (data) => {
        console.log(data)
        try {
            const response = await axios.put("http://localhost:9000/api/v1/products/update-product/" + data._id, data,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                }})
                console.log(response.data);
            return response.data.data
        } catch (error) {
            return error.massege
        }
    }
);

const initialState = {
    isloding: false,
    error: null,
    products: []
}
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addproduct.fulfilled, (state, action) => {
                state.products = state.products.concat(action.payload)
            })
            .addCase(getproducts.fulfilled, (state, action) => {
                state.products = action.payload
            })
            .addCase(getproducts.rejected, (state, action) => {
                console.log(action.payload);
                console.log(action.error);
                state.error = action.payload
            })
            .addCase(updateproduct.fulfilled, (state, action) => {
                console.log(action.payload);
                state.products = state.products.map((v) => v._id === action.payload._id ? action.payload : v)
            })
            .addCase(deleteproduct.fulfilled, (state, action) => {
                state.products = state.products.filter((v) => v._id !== action.payload)
            })

    }
})


export default productsSlice.reducer