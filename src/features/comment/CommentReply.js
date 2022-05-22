import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { createComment, replyComment } from "./commentSlice";
import { useParams } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import { useTheme } from "@emotion/react";

const CommentSchema = Yup.object().shape({
  reply: Yup.string().required("your answer is required"),
});

const defaultValues = {
  reply: "",
};

const CommentReply = ({ id }) => {
  const methods = useForm({
    resolver: yupResolver(CommentSchema),
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
  const onSubmit = async (data) => {
    dispatch(replyComment(id, data)).then(() => reset());
  };
  const theme = useTheme();

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
            bgcolor: theme.palette.comment,
          }}
        >
          <FTextField
            name="reply"
            label="Answer"
            placeholder="Employer enter answer"
            size="small"
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

export default CommentReply;
