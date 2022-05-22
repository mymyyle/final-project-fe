import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Card, Container, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useDispatch, useSelector } from "react-redux";
import { createComment, editComment } from "./commentSlice";
import { useParams } from "react-router-dom";

const NewCommentSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
};

const EditQuestion = ({ id, setShowEdit, content }) => {
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

  const onSubmit = async (data) => {
    setShowEdit(false);
    dispatch(editComment(id, data)).then(() => reset());
  };
  console.log("content", content);
  return (
    <Container
      maxWidth="md"
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
            w: "100%",
            gap: 1,
          }}
        >
          <FTextField
            name="content"
            label="Edit Question"
            placeholder="Enter your new question"
            multiline
            sx={{ width: "22vw" }}
          />

          <LoadingButton
            size="small"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Update
          </LoadingButton>
        </Card>
      </FormProvider>
    </Container>
  );
};

export default EditQuestion;
