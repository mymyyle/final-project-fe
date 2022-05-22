import React, { useEffect, useState } from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { Card, Container, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  applyJob,
  cancelJob,
  getApplicationOfUser,
} from "features/application/applicationSlice";
import { Box } from "@mui/system";
import useAuth from "hooks/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiService from "app/apiService";

const defaultValues = {
  message: "",
};

const ApplyJob = () => {
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { currentJob } = useSelector((state) => state.job);
  const { currentApplication, isLoading } = useSelector(
    (state) => state.application
  );
  // const [application, setApplication] = useState(null);

  useEffect(() => {
    dispatch(getApplicationOfUser(jobId));
  }, []);

  const onSubmit = async (data) => {
    dispatch(applyJob(jobId, data)).then(() => reset());
  };

  const handleCancel = async () => {
    dispatch(cancelJob(jobId));
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate("/login", { state: { from: location } });
  };
  const { isAuthenticated } = useAuth();
  console.log("currentApplication", currentApplication);
  const isCurrentApplication =
    Object?.keys(currentApplication)?.length > 0 ? true : false;
  return (
    <Card
      sx={{
        mt: "1rem",
        p: "1rem 0",
        width: "100%",
      }}
    >
      <Container maxWidth="xs">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={1}>
            <FTextField
              name="message"
              label="Message"
              placeholder="Tell employer something about yourself
           "
              multiline
              rows="3"
            />
            {currentJob.status === "done" ? (
              <LoadingButton
                fullWidth
                size="large"
                variant="contained"
                loading={isLoading}
                color="error"
              >
                Closed
              </LoadingButton>
            ) : !isAuthenticated ? (
              <>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled
                >
                  Send an Application
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  loading={isLoading}
                  onClick={handleLogin}
                >
                  Login to Apply
                </LoadingButton>
              </>
            ) : !isCurrentApplication ? (
              <LoadingButton
                fullWidth
                type="submit"
                size="large"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Send an Application
              </LoadingButton>
            ) : (
              <>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  disabled
                  loading={isLoading}
                >
                  {currentApplication.status !== "pending"
                    ? `${currentApplication.status}`
                    : "Sent your application"}
                </LoadingButton>
                <LoadingButton
                  fullWidth
                  size="large"
                  variant="contained"
                  loading={isLoading}
                  onClick={handleCancel}
                >
                  Cancel
                </LoadingButton>
              </>
            )}
          </Stack>
        </FormProvider>
      </Container>
    </Card>
  );
};

export default ApplyJob;
