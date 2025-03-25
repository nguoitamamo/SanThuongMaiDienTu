import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    providers: [],
};

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers: {
        addImage: (state, action) => {
            state.providers.push(action.payload);
        },
        removeImage: (state, action) => {
            state.providers = [];
        }
    },
});

export const { addImage, setImages } = imageSlice.actions;
export const { removeImage } = imageSlice.actions;
export default imageSlice.reducer;
