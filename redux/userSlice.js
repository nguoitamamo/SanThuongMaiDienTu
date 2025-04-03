import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import API, { endpoints } from "../Networking/API";



export const getToken = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client_id", "kmFU6SfP5tlxLl32F40efKFzunsnQxqfAwxpdjTI");
    formData.append("client_secret", "9hXxO3WhrLLCG1D8cZ9Ythz7UfGbp4GUT8nFZcGxICgb0QHodXAbudLLwb4R74RJZoCrhIEwXVJenHvHUzikyNmSAKMMWUuKfHkFEyXlWuiKoR0ekqjuLIB7oiQyAF2B");

    const res = await API.post("/o/token/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.access_token;
  } catch (error) {
    throw error.response?.data || "Lỗi khi lấy token";
  }
};




export const SupplierInfo = async (id) => {
  try {
    let res = await API.get(endpoints.suppliers + id + "/info_short/");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API111:", error);
  }
};




export const loginUser = createAsyncThunk("users/login", async ({ username, password }, { rejectWithValue }) => {
  try {

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await API.post(endpoints.users + "login/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });

    const token = await getToken(username, password);
    let supplier = null;

    if (res.data.role === "Supplier") {

      supplier = await SupplierInfo(res.data.id);
    }


    return { user: res.data, token, supplier };
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi không xác định");
  }
}
);




export const logoutUser = createAsyncThunk("users/logout", async (_, { getState, rejectWithValue }) => {
  const token = getState().user.token;
  console.log(token);

  const formData = new FormData();
  formData.append("token", token);


  try {
    await API.post(endpoints.users + "logout/", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },

    });

    return null;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi khi đăng xuất");
  }
});

export const LoadCategorySupplier = createAsyncThunk(
  "category/Category",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const id = state.user.user.id;
    const token = state.user.token;

    try {

      let res = await API.get(endpoints.suppliers + id + "/get_category/", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);





const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null, token: null, supplier: null, category: null },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.supplier = action.payload.supplier;
        state.loading = false;

        console.log("ID user" + state.user.id);
        console.log("token: " + state.token);
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        console.log("lỗi");
        state.error = true;
        state.loading = false;
      })

      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(LoadCategorySupplier.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
      })
  },
});

export default userSlice.reducer;



