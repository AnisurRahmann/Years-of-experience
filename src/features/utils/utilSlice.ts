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
} as UtilState;

export const uploadImageToCloudinary = createAsyncThunk(
  "util/uploadImageToCloudinary",
  async (data, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await utilService.uploadImageToCloudinary(token, userId, data);
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
    },
    setModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { reset, setModalOpen } = utilSlice.actions;
export default utilSlice.reducer;
