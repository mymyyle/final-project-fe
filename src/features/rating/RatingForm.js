import { LoadingButton } from "@mui/lab";
import { Avatar, Card, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormProvider, FTextField } from "components/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createRating } from "./ratingSlice";

const defaultValues = {
  comment: "",
};

const RatingForm = ({ acceptor, type, jobId, handleCloseRating }) => {
  const [score, setScore] = useState(1);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,

    formState: { isSubmitting },
  } = methods;

  const { isLoading } = useSelector((state) => state.rating);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    const rating = {
      jobId,
      acceptorId: acceptor._id,
      score,
      comment: data.comment,
      type,
    };
    dispatch(createRating(rating)).then(handleCloseRating);
  };
  return (
    <Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="h4"
          component="legend"
          sx={{ textAlign: "center", mb: "1rem" }}
        >
          Rating
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box id="avatar-name" sx={{ textAlign: "center" }}>
            {acceptor?.avatarUrl ? (
              <Avatar
                alt="avatar"
                src={acceptor.avatarUrl}
                sx={{ width: 110, height: 110 }}
              />
            ) : (
              !!acceptor?.name && (
                <Avatar sx={{ bgcolor: "#ffa502", width: 110, height: 110 }}>
                  {acceptor?.name[0]}
                </Avatar>
              )
            )}
            <Typography variant="h5">{acceptor?.name}</Typography>
          </Box>

          <Stack spacing={3}>
            <Stack spacing={2} direction="row">
              <Typography component="span">Click to rate: &nbsp;</Typography>
              <Rating
                name="controlled"
                value={score}
                onChange={(event, newValue) => {
                  setScore(newValue);
                  console.log("rating", newValue);
                }}
              />
            </Stack>
            <Stack spacing={3}>
              <FTextField
                name="comment"
                label="Comment"
                placeholder="Enter your comment"
                multiline
              />

              <LoadingButton
                size="small"
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
                // loading={isSubmitting}
                sx={{ p: "0.5rem" }}
              >
                Send your Rate
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </FormProvider>
    </Stack>
  );
};

export default RatingForm;
