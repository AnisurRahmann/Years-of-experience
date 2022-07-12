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
  }
});

export const { reset, setModalOpen } = utilSlice.actions;

export default utilSlice.reducer;
