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
        removeImage: (state, action) => {
            state.ImageProduct = [];
        }
    },
});

export const { addImage, setImages } = imageSlice.actions;
export const { removeImage } = imageSlice.actions;
export default imageSlice.reducer;
