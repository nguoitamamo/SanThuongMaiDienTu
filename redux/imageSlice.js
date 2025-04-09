import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ImageProduct: [],
};

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addImage: (state, action) => {
            state.ImageProduct.push(action.payload);
        },
        removeImage: (state) => {
            state.ImageProduct = [];
        },
        removeImageID: (state, action) => {
            state.ImageProduct = state.ImageProduct.filter(img => img.id !== action.payload);
        }
    },
});

export const { addImage, removeImageID } = imageSlice.actions;
export const { removeImage } = imageSlice.actions;
export default imageSlice.reducer;
