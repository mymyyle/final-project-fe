import apiService from "app/apiService";
import { stringify } from "query-string";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isLoading: false,
  error: null,
  ratingList: [],
  totalPages: 1,
  totalRatings: 0,
};

const slice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createRatingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    },
    getRatingListByUserIdSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { ratingList, count, totalPage } = action.payload;
      state.ratingList = [...ratingList];
      state.totalRatings = count;
      state.totalPages = totalPage;
    },
  },
});

export const createRating = (data) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    console.log("data", data);
    const response = await apiService.post("/rating/create", data);
    dispatch(slice.actions.createRatingSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getRatingListByUserId =
  ({ userId, page, limit, type }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, type };
    try {
      const response = await apiService.get(
        `/rating/all/${userId}?${stringify(query)}`
      );
      dispatch(slice.actions.getRatingListByUserIdSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export default slice.reducer;
