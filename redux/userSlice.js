import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import API, { endpoints } from "../Networking/API";



export const GetCurrentUser = createAsyncThunk("users/currentuser", async (_, {getState , rejectWithValue }) => {
  try {

    const state = getState();
    let token = state.user.token;
    // const formData = new FormData();
    // formData.append("username", username);
    // formData.append("password", password);

    const user = await API.post(endpoints.users + "current-user/", {
     headers: {
            'Authorization': `Bearer ${token}`
        }
    });


    return user.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Lỗi không xác định");
  }
}
);




export const getToken = async (username, password) => {
  try {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client_id", "kmFU6SfP5tlxLl32F40efKFzunsnQxqfAwxpdjTI");
    formData.append("client_secret", "9hXxO3WhrLLCG1D8cZ9Ythz7UfGbp4GUT8nFZcGxICgb0QHodXAbudLLwb4R74RJZoCrhIEwXVJenHvHUzikyNmSAKMMWUuKfHkFEyXlWuiKoR0ekqjuLIB7oiQyAF2B");

    const token = await API.post("/o/token/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return token.data.access_token;
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




export const LoadStateOrder = createAsyncThunk("stateorder/StateOrder",
  async (_, { rejectWithValue }) => {
      try {
          let res = await API.get(endpoints.stateorder, {});
          return res.data;
      }
      catch(error) {
          return rejectWithValue(error.response?.data || "Lỗi không xác định");
      }
  }
)




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

export const LoadSuggestProduct = createAsyncThunk(
  "suggest/SuggestProduct",
  async ({userid}, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.user.token;

      const res = await API.get(endpoints.customers + userid + "/suggest/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res.data;
    } catch (error) {
      console.error("Lỗi Suggest:", error.response?.data || error.message);
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null, token: null, category: null, stateorder: [], suggestproducts: []},
  extraReducers: (builder) => {
    builder
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loading = false;
        console.log("token: " + state.token);
      })
      .addCase(getToken.rejected, (state) => {
        state.token = null;
        state.loading = false;
        console.log("token: " + state.token);
      })
      .addCase(GetCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loading = false;

        console.log("ID user" + state.user.id);
        console.log("token: " + state.token);
      })
      .addCase(GetCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(GetCurrentUser.rejected, (state) => {
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
      .addCase(LoadStateOrder.fulfilled , (state, action) => {
        state.stateorder = action.payload;
        state.loading = false;
      })
      .addCase(LoadSuggestProduct.fulfilled, (state, action) => {
        state.suggestproducts = action.payload;
        state.loading = false;
      })
      .addCase(LoadSuggestProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoadSuggestProduct.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      
  },
});

export default userSlice.reducer;



