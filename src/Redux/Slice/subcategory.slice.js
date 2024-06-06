import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubCategoriesData = createAsyncThunk(
    'subCategory/get',
    async () => {
        try {
         const response =  await axios.get("http://localhost:9000/api/v1/subcategories/list-subcategories")
                return response.data.data 
        } catch (err) {
            console.log(err);
        }
    }
);

const initialState = {
    isloding : false,
    error : null,
    subCategory : []
}
const subcategoriesSlice = createSlice({
    name: "subcategories",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
    }
})