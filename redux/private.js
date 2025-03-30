import { createAsyncThunk } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";


export const InfoBaseSupplier = createAsyncThunk ( "supplier/baseinfo",
    async ( supplier_id , { rejectWithValue }) => {
        try {
        const res = await API.get(endpoints.suppliers + supplier_id + "/info_short/", {});
        console.log("thông tin nhà chung câos" + res.data.user.avatar);
        return res.data;
        }catch ( error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
        
    }
)