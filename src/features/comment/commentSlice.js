import { createSlice } from "@reduxjs/toolkit";
import apiService from "app/apiService";
import { stringify } from "query-string";
import { LIMIT_COMMENT_PER_PAGE } from "constants/index";

const LIMIT = LIMIT_COMMENT_PER_PAGE;

const initialState = {
  isLoading: false,
  error: null,
  commentIds: [],
  comments: {},
  totalPages: 1,
  totalComments: 0,
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      console.log("cmt before", state.commentIds);
      if (state.commentIds.length % LIMIT === 0) state.commentIds.pop();
      console.log("cmt after", state.commentIds);

      state.commentIds.unshift(action.payload._id);
      state.comments[action.payload._id] = action.payload;
      state.totalComments = state.totalComments + 1;
    },
    getCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { commentList, count, totalPage } = action.payload;
      state.commentIds = [];
      commentList?.forEach((comment) => {
        if (!state.commentIds.includes(comment._id))
          state.commentIds.unshift(comment._id);
        state.comments[comment._id] = { ...comment };
      });
      state.totalComments = count;
      state.totalPages = totalPage;
    },
    replyCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.comments[comment._id] = { ...comment };
    },
    editCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.comments[comment._id] = { ...comment };
    },
    deleteCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const comment = action.payload;
      state.commentIds = state.commentIds.filter((id) => id !== comment._id);
      state.totalComments = state.commentIds.length;
    },
  },
});
export const createComment =
  (jobId, { content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/comment/create/${jobId}`, {
        content,
      });
      dispatch(slice.actions.createCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const getCommentList =
  (jobId, reply, page, limit) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    const query = { page, limit, reply };
    try {
      const response = await apiService.get(
        `/comment/all/${jobId}?${stringify(query)}`
      );
      dispatch(slice.actions.getCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const replyComment =
  (id, { reply }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comment/${id}`, {
        reply,
      });
      dispatch(slice.actions.replyCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const editComment =
  (id, { content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/comment/update/${id}`, {
        content,
      });
      dispatch(slice.actions.editCommentSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };
export const deleteComment = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/comment/delete/${id}`);
    dispatch(slice.actions.deleteCommentSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
export default slice.reducer;
