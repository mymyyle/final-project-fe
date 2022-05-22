import { Container, Grid, Typography } from "@mui/material";
import LoadingScreen from "components/LoadingScreen";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlipJobCard from "./FlipJobCard";
import { getJob } from "./jobSlice";

const FeaturingJob = () => {
  const dispatch = useDispatch();
  const { isLoading, error, jobIds, jobs } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getJob({ page: 1, limit: 6, isFeatured: "true" }));
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600, mb: "1rem" }}>
          Featuring Job
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#ff7675", fontWeight: 600, mb: "1.5rem" }}
        >
          ~~ Upcoming ~~
        </Typography>
        <Grid container spacing={3}>
          {jobIds.map((jobId) => (
            <Grid key={jobId} item lg={4} sm={6} xs={12}>
              <FlipJobCard job={jobs[jobId]} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FeaturingJob;
