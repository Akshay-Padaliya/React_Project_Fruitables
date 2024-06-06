import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubCategories = createAsyncThunk(
    'subcategory/get',
    async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/v1/subcategories/list-subcategories")
            console.log(response.data);
            console.log(response.data.data);
            return response.data.data
        } catch (error) {
            return error.massege
        }
    }
);

export const addSubCategory = createAsyncThunk(
    'subCategory/add',
    async (data) => {
        try {
            const response = await axios.post("http://localhost:9000/api/v1/subcategories/add-subcategory", data)
            return response.data.data
        } catch (error) {
            return error.massege
        }
    }
);

export const deleteSubCategory = createAsyncThunk(
    'subCategory/delete',
    async (id) => {
        try {
            const response = await axios.delete("http://localhost:9000/api/v1/subcategories/delete-subcategory/" + id)
            return id
        } catch (error) {
            return error.massege
        }
    }
);
export const updateSubCategory = createAsyncThunk(
    'subCategory/update',
    async (data) => {
        try {
            const response = await axios.put("http://localhost:9000/api/v1/subcategories/update-subcategory/" + data._id, data)
            return response.data.data
        } catch (error) {
            return error.massege
        }
    }
);

const initialState = {
    isloding: false,
    error: null,
    subCategories: []
}
const subcategoriesSlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSubCategory.fulfilled, (state, action) => {
                state.subCategories = state.subCategories.concat(action.payload)
            })
            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                console.log(action.error);
                state.error = action.error
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.subCategories = state.subCategories.map((v) => v._id === action.payload._id ? action.payload : v)
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.subCategories = state.subCategories.filter((v) => v._id !== action.payload)
            })

    }
})


export default subcategoriesSlice.reducer