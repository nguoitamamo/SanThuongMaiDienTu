
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import API, { endpoints } from "../Networking/API";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const LoadGioHang = createAsyncThunk("cart/Cart",
    async ({ userid }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            const token = state.user.token;


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

export const RemoveProductGioHang = createAsyncThunk("removegiohang/RemoveGioHang",
    async ({ userid, orderid, token }) => {
        try {

            const formData = new FormData();
            formData.append("OrderID", orderid);
            let res = await API.post(endpoints.customers + userid + "/removegiohang/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
            return res.data.order_id;
        }
        catch (error) {
            console.log(error);
        }
    }
)

export const UpdateGioHang = createAsyncThunk("updategiohang/UpdateGioHang",
    async ({ OrderID, ProductID, token, quantity }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("OrderID", OrderID);
            formData.append("ProductID", ProductID);
            formData.append("Quantity", quantity);
            let res = await API.patch(endpoints.customers + "updategiohang/", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })

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
            .addCase(UpdateGioHang.pending, (state) => {
                console.log("Đang gọi API");
                state.loading = true;
            })
            .addCase(UpdateGioHang.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload;
                state.products.forEach(order => {
                    if (order.OrderID === updatedOrder.OrderID) {
                        order.order_details.forEach(detail => {
                            detail.Quantity = updatedOrder.order_details[0].Quantity
                        });
                    }
                });


            })
            .addCase(UpdateGioHang.rejected, (state) => {
                state.error = true;
                console.log("đã lỗi");
            })
            .addCase(RemoveProductGioHang.fulfilled, (state, action) => {
                state.products = state.products.filter(order => order.OrderID !== action.payload);
            })


    }
})


export default cartSlice.reducer;
