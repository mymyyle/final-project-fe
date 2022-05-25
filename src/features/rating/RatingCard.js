import { Avatar, Card, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const RatingCard = ({ rating }) => {
  const { jobId: job, voterId: voter, score, comment } = rating;
  return (
    <>
      <Card
        sx={{
          display: "flex",
          gap: "2rem",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          p: "1rem",
        }}
      >
        <Stack spacing={1} id="avatar-name" sx={{ textAlign: "center" }}>
          {voter?.avatarUrl ? (
            <Avatar
              alt="avatar"
              src={voter.avatarUrl}
              sx={{ width: 60, height: 60 }}
            />
          ) : (
            !!voter?.name && (
              <Avatar sx={{ bgcolor: "#ffa502", width: 60, height: 60 }}>
                {voter?.name[0]}
              </Avatar>
            )
          )}
          <Typography variant="b1">{voter?.name}</Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography>{job.name}</Typography>
          <Rating value={score} readOnly />
          <Typography>{comment}</Typography>
        </Stack>
      </Card>
    </>
  );
};

export default RatingCard;
