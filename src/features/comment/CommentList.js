import {
  Autocomplete,
  Box,
  Button,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentReply from "./CommentReply";
import { deleteComment, getCommentList } from "./commentSlice";
import { flexbox } from "@mui/system";
import EditQuestion from "./EditQuestion";
import useAuth from "hooks/useAuth";
import Comment from "./Comment";
import { LIMIT_COMMENT_PER_PAGE } from "constants/index";

const LIMIT = LIMIT_COMMENT_PER_PAGE;
const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, commentIds, totalPages, totalComments } = useSelector(
    (state) => state.comment
  );
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const { currentJob } = useSelector((state) => state.job);
  useEffect(() => {
    dispatch(getCommentList(currentJob._id, status, page, LIMIT));
  }, [status, page]);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "0.5rem" }}
      >
        <Typography
          variant="subtitle"
          sx={{
            color: "text.secondary",
            m: "1rem 0 0 1.7rem",
            alignSelf: "start",
          }}
        >
          {totalComments > 1
            ? `${totalComments} comments found`
            : totalComments === 1
            ? `${totalComments} comment found`
            : "No comment found"}
        </Typography>

        <Autocomplete
          id="search-category"
          onInputChange={(event, newInputValue) => {
            if (newInputValue === "No answer") setStatus("missing");
            else setStatus(newInputValue);
            setPage(1);
          }}
          size={"small"}
          style={{ width: 200, marginRight: 25 }}
          options={["No answer"]}
          renderInput={(params) => (
            <TextField
              {...params}
              label="status"
              InputProps={{
                ...params.InputProps,
                style: { height: 40 },
              }}
            />
          )}
        />
      </Box>
      {commentIds?.map((id) => {
        return <Comment key={id} comment={comments[id]} />;
      })}

      {totalComments > 0 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "1rem 0",
            width: "100%",
          }}
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      )}
    </>
  );
};

export default CommentList;
