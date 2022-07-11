import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import utilService from "./utilService";

interface UtilState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  isModalOpen: {
    isOpen: boolean;
    modalType: string;
  };
  imageUrl: string;
}

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  isModalOpen: {
    isOpen: false,
    modalType: "",
  },
  imageUrl: "",
} as UtilState;

export const uploadImageToCloudinary = createAsyncThunk(
  "util/uploadImageToCloudinary",
  async (image: File | null, thunkAPI: any) => {
    try {
      return await utilService.uploadImageToCloudinary(image);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.isModalOpen = {
        isOpen: false,
        modalType: "",
      };
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadImageToCloudinary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImageToCloudinary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.imageUrl = action.payload.url;
      })
      .addCase(uploadImageToCloudinary.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.imageUrl = "";
      });
  },
});

export const { reset, setModalOpen } = utilSlice.actions;

export default utilSlice.reducer;
