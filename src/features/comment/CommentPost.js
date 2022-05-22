import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { createComment } from "./commentSlice";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

const NewCommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const CommentPost = ({ setPage }) => {
  const methods = useForm({
    resolver: yupResolver(NewCommentSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.comment);

  const { currentJob } = useSelector((state) => state.job);

  const onSubmit = async (data) => {
    dispatch(createComment(currentJob._id, data)).then(() => reset());
  };
  return (
    <Container
      sx={{
        margin: "1rem 0",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Card
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "start",
            p: "1rem",
          }}
        >
          <FTextField
            name="content"
            label="Question"
            placeholder="Enter your question"
          />

          <LoadingButton
            size="small"
            type="submit"
            loading={isSubmitting || isLoading}
          >
            <SendIcon />
          </LoadingButton>
        </Card>
      </FormProvider>
    </Container>
  );
};

export default CommentPost;
