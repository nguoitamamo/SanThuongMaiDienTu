import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
interface IPayLoad {
  username: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }: IPayLoad, { rejectWithValue }) => {
    try {
      const yourToken = "UmpQL5BWqq8Yqw5U5Xda9khU4XfBwZ";

      // Tạo FormData và append dữ liệu
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      // Gửi request 
      const res = await axios.post("http://10.0.2.2:8000/users/login/", formData, {
        headers: {
          "Authorization": `Bearer ${yourToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("✅ Đăng nhập thành công:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ Lỗi API:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || "Lỗi không xác định");
    }
  }
);

// // 🔥 Action async đăng nhập
// export const loginUser = createAsyncThunk(
//   "users/login",
//   async (credentials, { rejectWithValue }) => {
//     try {
//       let formData = new FormData();
//       formData.append("username", credentials.username);
//       formData.append("password", credentials.password);

//       const yourToken = "UmpQL5BWqq8Yqw5U5Xda9khU4XfBwZ";
//       const response = await axios.post("http://10.0.2.2:8000/users/login/", formData, {
//         headers: {
//           "Authorization": `Bearer ${yourToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ Đăng nhập thành công:", response.data);
//       return response.data;
//     } catch (error) {
//       console.log("❌ Lỗi API:", error.response?.data || error.message);
//       return rejectWithValue(error.response?.data || "Lỗi không xác định");
//     }
//   }
// );


// 🔥 Slice quản lý trạng thái user
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {}, // Nếu cần reducers nội bộ, thêm ở đây
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("active");
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        console.log("pending");
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        console.log("lõi");
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
