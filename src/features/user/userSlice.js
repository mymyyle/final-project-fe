import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";
import useAuth from "hooks/useAuth";
import { cloudinaryUpload } from "utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  currentUser: null,
  profileUser: null,
  totalUsers: 0,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateAccountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser = action.payload;
    },
    deactivateAccountSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentUser = null;
    },
    getUserByIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.profileUser = action.payload;
    },
    countAllUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.totalUsers = action.payload.count;
    },
  },
});

export const updateAccount =
  ({ password, passwordConfirmation, avatarUrl, ...data }) =>
  async (dispatch) => {
    data.newPassword = password;
    data.confirmPassword = passwordConfirmation;

    dispatch(slice.actions.startLoading());
    try {
      if (avatarUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(avatarUrl);
        data.avatarUrl = imageUrl;
      } else data.avatarUrl = avatarUrl;
      console.log(data);
      const response = await apiService.put("/user/me/update", data);
      dispatch(slice.actions.updateAccountSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const deactivateAccount = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete("/user/me/deactivate");
    dispatch(slice.actions.deactivateAccountSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const getUserById = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/user/${userId}`);
    dispatch(slice.actions.getUserByIdSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export const countAllUser = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/user/count`);
    dispatch(slice.actions.countAllUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
