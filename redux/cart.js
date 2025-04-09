
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";

export const LoadGioHang = createAsyncThunk("cart/Cart",
    async ({ userid }, { getState, rejectWithValue }) => {
        try {
            const token = getState().user.token;

            let res = await API.get(endpoints.customers + userid + "/getgiohang/", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            return res.data;

        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
)

export const AddToCart = createAsyncThunk("addtocart/AddToCart",
    async ({ userid, token, product }, { rejectWithValue }) => {
        try {
            console.log(userid);
            console.log(product);
            console.log(token);

            let res = await API.post(endpoints.customers + userid + "/addgiohang/",
                product
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })

            console.log(res.data);
            return res.data;

        }
        catch (error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
)








const initialState = {
    products: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (bulider) => {
        bulider
            .addCase(LoadGioHang.fulfilled, (state, action) => {
                state.products = action.payload;
                state.loading = false;
            })
            .addCase(LoadGioHang.pending, (state) => {
                state.loading = true;
            })
            .addCase(LoadGioHang.rejected, (state) => {
                state.error = true;
            })
            .addCase(AddToCart.fulfilled, (state, action) => {
                state.products.push(action.payload);
                state.loading = false;
            })
            .addCase(AddToCart.pending, (state) => {
                state.loading = true;
                console.log("đang gọi API");
            })
            .addCase(AddToCart.rejected, (state) => {
                state.loading = false;
                state.error = true;
                console.log("Đã lõip");
            })
    }
})


export default cartSlice.reducer;
