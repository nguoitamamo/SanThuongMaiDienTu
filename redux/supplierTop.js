import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";



export const LoadSupplierTop = createAsyncThunk("category/categoryTop",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get(endpoints.suppliers + "top/", {});
            return res.data;
        }
        catch(error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }

    }
)


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
    supplierTop: [],
    SupplierDkBanHang: [],
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
            .addCase(LoadSupplierDkBanHang.fulfilled, (state, action) => {
                state.loading = false;
                state.SupplierDkBanHang = action.payload;
            })
    }
});


export default SupplierTopSlice.reducer