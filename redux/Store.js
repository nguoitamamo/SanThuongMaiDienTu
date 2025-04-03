import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import permissionsReducer from "./permission"
import imageReducer from "./imageSlice";
import supplierReducer from "./supplierTop"
import productsReducer from "./productTop"
import categoryReducer from "./categorys"
import cartReducer from "./cart"

const store = configureStore({
    reducer: {
        user: userReducer,
        permissions: permissionsReducer,
        images: imageReducer,
        supplier: supplierReducer,
        products: productsReducer,
        category: categoryReducer,
        cart: cartReducer,
    }

});

export default store;