import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

interface workExperience {
  company: string;
  job_title: string;
  job_description: string;
  company_logo: string;
  start_date: string;
  end_date: string;
  is_public: boolean;
  is_current: boolean;
}

interface UserState {
  profile_picture_url: string;
  name: string;
  email: string;
  introduction: string;
  age: number | null;
  is_public: boolean;
  work_experience: workExperience[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
  is_new_work_experience_added: boolean;
  delete: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  updateWorkExperience: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  addWorkExperience: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  updateProfile: {
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  isUserLoading: boolean;
}

const initialState = {
  profile_picture_url: "",
  name: "",
  email: "",
  introduction: "",
  age: 0,
  is_public: false,
  work_experience: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
  is_new_work_experience_added: false,
  delete: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  updateWorkExperience: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  addWorkExperience: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  updateProfile: {
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  isUserLoading: false,
} as UserState;

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.getUser(token, userId);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUserProfileUrl = createAsyncThunk(
  "user/updateUserProfileUrl",
  async (url: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.updateUserProfileUrl(token, userId, url);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCompanyLogoUrl = createAsyncThunk(
  "user/updateCompanyLogoUrl",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.updateCompanyLogoUrl(token, userId, data);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (
    data: {
      name?: string;
      introduction?: string;
      age?: number | null;
      is_public?: boolean;
    },
    thunkAPI: any
  ) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.updateUser(token, userId, data);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateWorkExperience = createAsyncThunk(
  "user/updateWorkExperience",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.updateWorkExperience(token, userId, data);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addWorkExperience = createAsyncThunk(
  "user/addWorkExperience",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.addWorkExperience(token, userId, data);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteWorkExperience = createAsyncThunk(
  "user/deleteWorkExperience",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const userId = thunkAPI.getState().auth.user.id;
      return await userService.deleteWorkExperience(token, userId, data);
    } catch (err: any) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.profile_picture_url = "";
      state.name = "";
      state.email = "";
      state.introduction = "";
      state.age = null;
      state.is_public = false;
      state.is_new_work_experience_added = false;
      state.delete = {
        isLoading: false,
        isSuccess: false,
        message: "",
        isError: false,
      };
      state.updateWorkExperience = {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
      };
      state.updateProfile = {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
      };
      state.isUserLoading = false;
    },
    resetUpdateWorkExperience: (state) => {
      state.updateWorkExperience = {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
      };
    },
    resetAddWorkExperience: (state) => {
      state.addWorkExperience = {
        isLoading: false,
        isSuccess: false,
        isError: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.isUserLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isUserLoading = false;
        state.isSuccess = true;
        state.profile_picture_url = action.payload.profile_picture_url;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.introduction = action.payload.introduction;
        state.age = action.payload.age;
        state.is_public = action.payload.is_public;
        state.work_experience = action.payload.work_experience;
      })
      .addCase(getUser.rejected, (state, action: any) => {
        state.isUserLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfileUrl.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfileUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile_picture_url = action.payload.profile_picture_url;
      })
      .addCase(updateUserProfileUrl.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.updateProfile.isLoading = true;
        state.updateProfile.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateProfile.isLoading = false;
        state.updateProfile.isSuccess = true;
        state.name = action.payload.name;
        state.introduction = action.payload.introduction;
        state.age = action.payload.age;
        state.is_public = action.payload.is_public;
      })
      .addCase(updateUser.rejected, (state, action: any) => {
        state.updateProfile.isLoading = false;
        state.updateProfile.isError = true;
        state.updateProfile.isSuccess = false;
        state.updateProfile.message = action.payload;
      })
      .addCase(updateWorkExperience.pending, (state, action) => {
        state.updateWorkExperience.isLoading = true;
      })
      .addCase(updateWorkExperience.fulfilled, (state, action) => {
        state.updateWorkExperience.isLoading = false;
        state.updateWorkExperience.isSuccess = true;
        state.work_experience = action.payload
      })
      .addCase(updateWorkExperience.rejected, (state, action: any) => {
        state.updateWorkExperience.isLoading = false;
        state.updateWorkExperience.isError = true;
        state.updateWorkExperience.message = action.payload;
      })
      .addCase(addWorkExperience.pending, (state, action) => {
        state.addWorkExperience.isLoading = true;
      })
      .addCase(addWorkExperience.fulfilled, (state, action) => {
        state.addWorkExperience.isLoading = false;
        state.addWorkExperience.isSuccess = true;
        state.work_experience.push(action.payload);
      })
      .addCase(addWorkExperience.rejected, (state, action: any) => {
        state.addWorkExperience.isLoading = false;
        state.addWorkExperience.isError = true;
        state.addWorkExperience.message = action.payload;
      })
      .addCase(updateCompanyLogoUrl.pending, (state, action) => {
        // state.isLoading = true;
      })
      .addCase(updateCompanyLogoUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.work_experience = action.payload;
      })
      .addCase(updateCompanyLogoUrl.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteWorkExperience.pending, (state, action) => {
        state.delete.isLoading = true;
      })
      .addCase(deleteWorkExperience.fulfilled, (state, action) => {
        state.delete.isLoading = false;
        state.delete.isSuccess = true;
        state.work_experience = action.payload
      })
      .addCase(deleteWorkExperience.rejected, (state, action: any) => {
        state.delete.isLoading = false;
        state.delete.isError = true;
        state.delete.message = action.payload;
      });
  },
});

export const { reset, resetUpdateWorkExperience, resetAddWorkExperience } =
  userSlice.actions;

export default userSlice.reducer;
