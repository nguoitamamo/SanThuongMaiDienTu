import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import permissionsReducer from "./permission"
import imageReducer from "./imageSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        permissions: permissionsReducer,
        images: imageReducer,
    }

});

export default store;