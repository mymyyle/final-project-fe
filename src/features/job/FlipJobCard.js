import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { fDay, fTime, fDate } from "utils/formatTime";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { truncate } from "lodash";

const AnimatedBox = animated(Box);

const FlipJobCard = ({ job }) => {
  const theme = useTheme();

  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const navigate = useNavigate();
  const navigateToJobDetails = (event) => {
    event.stopPropagation();

    navigate(`/job/${job._id}`);
  };

  const { authorId: author } = job;

  return (
    <>
      <Card
        sx={[
          {
            height: 400,
            maxWidth: 370,
            position: "relative",
            cursor: "pointer",
          },
          {
            "&:hover": {
              boxShadow: "rgba(0, 0, 0, 0.70) 0px 5px 15px",
            },
          },
        ]}
        onClick={() => set((state) => !state)}
      >
        <AnimatedBox
          sx={{
            height: "100%",
            width: "100%",
            position: "absolute",
          }}
          style={{ opacity: opacity.to((o) => 1 - o), transform }}
        >
          <Box
            component="img"
            src={job.imageUrl}
            alt="job img"
            sx={[{ height: "100%", width: "100%", objectFit: "cover" }]}
          />
          <Box
            sx={{
              textAlign: "center",
              height: 73,
              width: 70,
              backgroundColor: "#ff7675",
              position: "absolute",
              top: 0,
              left: "10%",
              zIndex: 2,
              fontWeight: 700,
              color: "white",
              fontSize: 22,
              borderRadius: "0 0 10px 10px",
            }}
          >
            {fDay(job.createdAt)}
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              zIndex: 2,
              fontWeight: 700,
              color: "white",
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0,1))",
              height: "50%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "65%",
                position: "absolute",
                bottom: "10%",
                left: "10%",
              }}
            >
              <Typography
                variant="b2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AccessTimeIcon /> {`${" "}`} {fTime(job.createdAt)}
              </Typography>
              <Button
                onClick={navigateToJobDetails}
                variant="h5"
                sx={{
                  zIndex: 99,
                  fontWeight: 700,
                  fontSize: 24,
                  textTransform: "none",
                  textAlign: "left",
                  m: 0,
                  p: 0,
                }}
              >
                {job.name}
              </Button>
            </Box>
          </Box>
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardHeader
            avatar={
              author.avatarUrl ? (
                <Avatar alt={author.name} src={author.avatarUrl} />
              ) : (
                <Avatar sx={{ backgroundColor: theme.palette.main }}>
                  {author.name[0]}
                </Avatar>
              )
            }
            title={job.name}
            subheader={fDate(job.createdAt)}
          />
          <CardContent sx={{ textAlign: "center", flex: 1 }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Description
            </Typography>
            <Typography variant="body1">
              {truncate(job.description, { length: 160 })}
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{ justifyContent: "center", padding: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowCircleRightIcon />}
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": {
                  bgcolor: "black",
                  color: "white",
                },
              }}
              onClick={navigateToJobDetails}
            >
              See more
            </Button>
          </CardActions>
        </AnimatedBox>
      </Card>
    </>
  );
};

export default FlipJobCard;
