import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingProduct = state.products.find(product => product.ProductID === action.payload.ProductID);

            if (existingProduct) {
                existingProduct.quantity += 1; 
            } else {
                state.products.push({ ...action.payload, quantity: 1 }); 
            }
        },
        removeFromCart: (state, action) => {
            state.products = state.products.filter(product => product.ProductID !== action.payload);
        },
        decreaseQuantity: (state, action) => {
            const product = state.products.find(product => product.ProductID === action.payload);
            if (product) {
                if (product.quantity > 1) {
                    product.quantity -= 1; 
                } else {
                    state.products = state.products.filter(product => product.ProductID !== action.payload); 
                }
            }
        },
        clearCart: (state) => {
            state.products = [];
        }
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
