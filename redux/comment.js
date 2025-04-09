import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    IDEdComment: null
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        addIDEdComment: (state, action) => {
            state.IDEdComment= action.payload;
            console.log(action.payload);
        },
        removeIDEdComment: (state) => {
            state.IDEdComment= null;
            console.log(state.IDEdComment);
        },
    },
});

export const { addIDEdComment, removeIDEdComment } = commentSlice.actions;
export default commentSlice.reducer;
