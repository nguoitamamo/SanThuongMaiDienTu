import API, {endpoints} from "../Networking/API";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


export const LoadCategory = createAsyncThunk ("category/Categies", 
    async (_, { rejectWithValue }) => {
        try {
            let res =  await API.get(endpoints.categorys , {});
            console.log("vào đây: "+ res.data);
            return res.data;

        }
        catch(error) {
            return rejectWithValue(error.response?.data || "Lỗi không xác định");
        }
    }
)



const initialState = {
    categories : [],
    loading: false, 
    
    error: null

    
}


const CategorySlice = createSlice({
    name: "category",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(LoadCategory.fulfilled , (state, action) => {
            state.categories = action.payload;
            state.loading = false;
        })
        .addCase(LoadCategory.pending, (state) => {
            state.loading = true;
        })
        .addCase(LoadCategory.rejected, (state) => {
            state.loading = false;
            state.error= true;
        })

    }
})


export default CategorySlice.reducer;