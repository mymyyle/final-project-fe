import { Button, Typography } from "@mui/material";
import CommentList from "features/comment/CommentList";
import CommentPost from "features/comment/CommentPost";
import useAuth from "hooks/useAuth";
import React from "react";
import { useNavigate } from "react-router-dom";

const CommentJob = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const navigateToLoginPage = () => {
    navigate("/login");
  };
  return (
    <div>
      <Typography variant="h5">Question & Answer</Typography>
      <Typography>Let me know if you have any questions</Typography>
      {isAuthenticated ? (
        <CommentPost />
      ) : (
        <Button
          onClick={navigateToLoginPage}
          sx={{ textAlign: "center", fontSize: "12px" }}
        >
          Login to take a question
        </Button>
      )}
      <CommentList />
    </div>
  );
};

export default CommentJob;
