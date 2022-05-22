import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";
import { stringify } from "query-string";

const initialState = {
  isLoading: false,
  error: null,
  currentApplication: {},
  applicationList: [],
  totalApplications: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    applyJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentApplication = { ...action.payload };
    },
    getApplicationOfUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentApplication = { ...action.payload };
      console.log(" state.currentApplication", action.payload);
    },
    cancelJobSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.currentApplication = {};
      state.applicationList = state.applicationList.filter(
        (application) => application._id !== action.payload.applicationId
      );
    },

    respondRequestSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const found = state.applicationList.findIndex(
        (application) =>
          application.jobId._id === action.payload.jobId &&
          application.candidateId._id === action.payload.candidateId
      );
      state.applicationList = [...state.applicationList];
      state.applicationList[found].status = action.payload.status;
    },
    getAllApplicationsByJobIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { applicationList, count, totalPage } = action.payload;
      state.applicationList = [...applicationList];
      state.totalApplications = count;
      state.totalPages = totalPage;
    },
    getAllOwnApplicationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { applicationList, count, totalPage } = action.payload;
      state.applicationList = applicationList;
      state.totalApplications = count;
      state.totalPages = totalPage;
    },
  },
});

export const applyJob =
  (jobId, { message }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/application/apply/${jobId}`, {
        message,
      });
      console.log(response.data);
      dispatch(slice.actions.applyJobSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const cancelJob = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/application/cancel/${jobId}`);
    dispatch(slice.actions.cancelJobSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const respondRequest =
  (status, candidateId, jobId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/application/respond/${jobId}`, {
        status,
        candidateId,
      });
      dispatch(slice.actions.respondRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getAllApplicationsByJobId =
  (jobId, { status, page = 1, limit = 5 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, status };
    try {
      const response = await apiService.get(
        `/application/${jobId}?${stringify(query)}`
      );
      dispatch(slice.actions.getAllApplicationsByJobIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getAllOwnApplication =
  ({ status, page = 1, limit = 5 }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, status };
    try {
      const response = await apiService.get(
        `/application/me?${stringify(query)}`
      );
      dispatch(slice.actions.getAllOwnApplicationSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getApplicationOfUser = (jobId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/application/me/${jobId}`);
    console.log(`response`, response);
    dispatch(slice.actions.getApplicationOfUserSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
