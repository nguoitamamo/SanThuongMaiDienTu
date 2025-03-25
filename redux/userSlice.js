import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import API, { endpoints } from "../Networking/API";




export const GetPermissionUser = createAsyncThunk("permission", async({user_id}) => {
  try {
    const res = API.post(endpoints.users + user_id + "/permissions/", {});

    return res.data
  }
  catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi không xác định");
  }

})



export const loginUser = createAsyncThunk("users/login", async ({ username, password }) => {
  try {

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await API.post(endpoints.users + "login/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: "Bearer 3EFtDwzX2BamxcrncU0jp4tXxljgmS"
      }
    });

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi không xác định");
  }
}
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        console.log("ID user" + state.user.id);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        console.log("lỗi");
        state.error = true;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;



