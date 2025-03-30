import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";



export const LoadSupplierTop = createAsyncThunk("category/categoryTop",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get(endpoints.suppliers + "top/", {});
            return res.data.map(item => item.user);
        }
        catch(error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }

    }
)




const initialState = {
    supplierTop: [],
    loading: false, 
    error: null
}


const SupplierTopSlice = createSlice({
    name: "supplier",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(LoadSupplierTop.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoadSupplierTop.fulfilled, (state, action) => {
                state.loading = false;
                state.supplierTop = action.payload;
            })
            .addCase(LoadSupplierTop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});


export default SupplierTopSlice.reducer