import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "../features/comment/commentSlice";
import applicationReducer from "../features/application/applicationSlice";
import jobReducer from "../features/job/jobSlice";
import userReducer from "../features/user/userSlice";
import ratingReducer from "../features/rating/ratingSlice";

const rootReducer = {
  comment: commentReducer,
  application: applicationReducer,
  job: jobReducer,
  user: userReducer,
  rating: ratingReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
