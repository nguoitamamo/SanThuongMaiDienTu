import API, { endpoints } from "../Networking/API";
import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { PaperProvider } from "react-native-paper";
import API, { endpoints } from "../Networking/API";


export const LoadSupplierDkBanHang = createAsyncThunk("supplier/SupplierDkBanHang",
    async (_, { getState, rejectWithValue }) => {

        try {

            const token = getState().user.token;
            console.log(token);

            const formData = new FormData();
            formData.append("token", token);


            let res = await API.get(endpoints.suppliers + "get_store_not_active/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },

            });

            console.log(res.data);
            return res.data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data || "Lỗi khi đăng xuất");
        }
    }
)



const initialState = {
    SupplierDkBanHang: [],
    loading: false,
    error: null

}

const SupplierDkBanHangSlice = createSlice({
    name: "supplierDKBanHang",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(LoadSupplierDkBanHang.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoadSupplierDkBanHang.fulfilled, (state, action) => {
                state.loading = false;
                state.SupplierDkBanHang = action.payload;
            })
            .addCase(LoadSupplierDkBanHang.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }


})


export default SupplierDkBanHangSlice.reducer;