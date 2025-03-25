import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API, {endpoints} from "../Networking/API"; 



export const fetchPermissions = createAsyncThunk("permissions/FetchPermissions",
    async (user_id, { rejectWithValue }) => {
        try {
            console.log(user_id);
            const res = await API.get(endpoints.users + user_id  + "/permissions/", {});
            console.log("Dữ liệu quyền nhận được:", res.data);
            return res.data.permissions || [];
        } catch (error) {
            console.error("Lỗi khi tải quyền:", error);
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
);

const permissionsSlice = createSlice({
    name: "permissions",
    initialState: { data: [], loading: false, error: null },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default permissionsSlice.reducer;
