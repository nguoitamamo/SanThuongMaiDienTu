import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";
import { createSlice } from "@reduxjs/toolkit";


export const  LoadProductTop = createAsyncThunk("product/productTop",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get(endpoints.products + "top/", {});
            console.log("Product Top: " + res.data);
            return res.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }

)







const initialState = {
    ProductTop: [],
    loading: false,
    error: null

}


const ProductTop = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
        (builder)
            .addCase(LoadProductTop.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(LoadProductTop.fulfilled, (state, action) => {
                state.loading = false;
                state.ProductTop = action.payload;
            })
            .addCase(LoadProductTop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }


})


export default ProductTop.reducer;