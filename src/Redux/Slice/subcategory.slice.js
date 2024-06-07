import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getSubCategories = createAsyncThunk(
    'subcategory/get',
    async (rejectWithValue) => {
        try {
            const response = await axios.get("http://localhost:9000/api/v1/subcategories/list-subcategories")
            console.log(response.data);
            console.log(response.data.data);
            return response.data.data
        } catch (error) {            
            return rejectWithValue(error.massege) 
        }
    }
);

export const addSubCategory = createAsyncThunk(
    'subCategory/add',
    async (data,thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:9000/api/v1/subcategories/add-subcategor", data)
            return response.data.data
        } catch (error) {
          return  thunkAPI.rejectWithValue(error.massege) 
        }
    }
);

export const deleteSubCategory = createAsyncThunk(
    'subCategory/delete',
    async (id,rejectWithValue) => {
        try {
            const response = await axios.delete("http://localhost:9000/api/v1/subcategories/delete-subcategory/" + id)
            return id
        } catch (error) {
            return rejectWithValue(error.massege) 
        }
    }
);
export const updateSubCategory = createAsyncThunk(
    'subCategory/update',
    async (data,rejectWithValue) => {
        try {
            const response = await axios.put("http://localhost:9000/api/v1/subcategories/update-subcategory/" + data._id, data)
            return response.data.data
        } catch (error) {
            return rejectWithValue(error.massege) 
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
                state.subCategories = state.subCategories.concat(action.payload);
                state.isloding = false;
                state.error = null
            })
            .addCase(addSubCategory.pending,(state,action)=>{
                state.isloding = true;
                state.error = null
            })
            .addCase(addSubCategory.rejected, (state, action) => {
                console.log(action.payload);
                state.error = action.payload
                state.isloding = false;
            })

            .addCase(getSubCategories.fulfilled, (state, action) => {
                state.subCategories = action.payload;
                state.isloding = false;
            })
            .addCase(getSubCategories.rejected, (state, action) => {
                console.log(action.error);
                state.error = action.error;
                state.isloding = false;
            })
            .addCase(getSubCategories.pending, (state, action) => {
                state.isloding = true
            })

            .addCase(updateSubCategory.fulfilled, (state, action) => {
                state.subCategories = state.subCategories.map((v) => v._id === action.payload._id ? action.payload : v);
                state.isloding = false;
            })
            .addCase(updateSubCategory.pending,(state,action)=>{
                state.isloding = true;
                state.error = null
            })
            .addCase(updateSubCategory.rejected, (state, action) => {
                console.log(action.error);
                state.error = action.error
                state.isloding = false;
            })

            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.subCategories = state.subCategories.filter((v) => v._id !== action.payload);
                state.isloding = false;
            })
            .addCase(deleteSubCategory.pending,(state,action)=>{
                state.isloding = true;
                state.error = null
            })
            .addCase(deleteSubCategory.rejected, (state, action) => {
                console.log(action.error);
                state.error = action.error
                state.isloding = false;
            })
            

    }
})


export default subcategoriesSlice.reducer