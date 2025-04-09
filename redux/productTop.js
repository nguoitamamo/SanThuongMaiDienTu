import { createAsyncThunk, miniSerializeError } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";
import { createSlice } from "@reduxjs/toolkit";


export const LoadProductTop = createAsyncThunk("product/productTop",
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

export const LoadTimKiem = async (url) => {
    try {
        let res = await API.get( endpoints.products + "search/?" + url);
        return res.data;
    }
    catch (error) {
        console.log(error);
        return [];
    }

}







const initialState = {
    ProductTop: [],
    loading: false,
    error: null,
    Pricefilter: [
        { label: 'Dưới 2 triệu', minprice: 0, maxprice: 2 },
        { label: 'Từ 2 - 4 triệu', minprice: 2, maxprice: 4 },
        { label: 'Từ 4 - 7 triệu', minprice: 4, maxprice: 7 },
        { label: 'Từ 7 - 13 triệu', minprice: 7, maxprice: 13 },
        { label: 'Từ 13 - 20 triệu', minprice: 13, maxprice: 20 },
        { label: 'Trên 20 triệu', minprice: 20 },
    ]

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