import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import permissionsReducer from "./permission"
import imageReducer from "./imageSlice";
import supplierReducer from "./supplierTop"
import productsReducer from "./productTop"

const store = configureStore({
    reducer: {
        user: userReducer,
        permissions: permissionsReducer,
        images: imageReducer,
        supplier: supplierReducer,
        products: productsReducer,
    }

});

export default store;