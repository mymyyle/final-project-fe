import {
  Avatar,
  Button,
  Card,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { fToNow } from "utils/formatTime";
import { animated, useSpring } from "react-spring";
import { truncate } from "lodash";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const AnimatedBox = animated(Box);

const IconText = ({ icon, text }) => (
  <Stack direction="row" alignItems="center" gap={1}>
    {icon}
    <Typography>{text}</Typography>
  </Stack>
);

const JobItem = ({ job, panTo }) => {
  const theme = useTheme();

  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const { type } = job;
  const navigate = useNavigate();
  const navigateToJobDetails = (event) => {
    event.stopPropagation();
    navigate(`/job/${job._id}`);
  };

  return (
    <Card
      sx={[
        {
          mb: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          minHeight: { sm: "200px", xs: "300px" },
          width: { xs: "350px", sm: "650px", lg: "650px" },
          borderRadius: "15px",
          margin: "0 auto",
          cursor: "pointer",
        },
        {
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          },
        },
      ]}
      onClick={() => {
        if (job.lng && job.lat) panTo({ lng: job.lng, lat: job.lat });
        setFlipped((flipped) => !flipped);
      }}
    >
      <AnimatedBox
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          p: { sm: "2rem 3rem", xs: "1rem 2rem" },
        }}
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
      >
        <Avatar
          alt={job.authorId.name}
          src={job.authorId.avatarUrl}
          sx={{
            width: { sm: 130, xs: 80 },
            height: { sm: 130, xs: 80 },
            alignSelf: "start",
            mt: { sm: "0rem", xs: "1.5rem" },
          }}
        />
        <Stack
          spacing={2}
          sx={{
            ml: { md: "2rem", xs: "2rem" },
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            zIndex: 99,
          }}
        >
          <Typography
            variant="h5"
            onClick={navigateToJobDetails}
            sx={[
              { fontWeight: 600 },
              {
                "&:hover": {
                  cursor: "pointer",
                },
              },
            ]}
          >
            {job.name}
          </Typography>

          <Stack
            spacing={1}
            // direction={{ sm: "row", xs: "column" }}
            direction={{ xs: "column" }}
            sx={{
              m: "0.5rem 0 1rem 0",
              display: "flex",
              flexWrap: "wrap",
              gap: "3px",
              // alignItems: { sm: "center", xs: "flex-start" },
              alignItems: { xs: "flex-start" },
              color: "#616161",
            }}
          >
            <Stack
              spacing={{ sm: 9, xs: 1 }}
              direction={{ sm: "row", xs: "column" }}
            >
              <IconText icon={<FmdGoodIcon />} text={job.location} />
              <IconText icon={<CategoryIcon />} text={job.category} />
            </Stack>
            <IconText icon={<AccessTimeIcon />} text={fToNow(job.createdAt)} />
          </Stack>
          <Chip
            label={type}
            sx={{
              fontWeight: 500,
              fontSize: "16px",
              padding: "0.25rem 0.5rem",
              border: "2px solid",
              maxWidth: 130,
            }}
            variant="outlined"
            color={
              type === "Full time"
                ? "success"
                : type === "Temporary"
                ? "warning"
                : "secondary"
            }
          />
        </Stack>
      </AnimatedBox>
      <AnimatedBox
        style={{
          opacity,
          transform,
          rotateX: "180deg",
        }}
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          bgcolor: theme.palette.main,
          p: "1rem 2rem",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
            Description
          </Typography>
          <Typography variant="body1">
            {truncate(job.description, { length: 220 })}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowCircleRightIcon />}
          sx={{
            bgcolor: "white",
            color: "black",
            alignSelf: "flex-end",
            "&:hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          onClick={navigateToJobDetails}
        >
          See more
        </Button>
      </AnimatedBox>
    </Card>
  );
};

export default JobItem;
