import { Box } from "@mui/system";
import React from "react";
import CarouselCircle from "assets/carousel-circle.png";
import { Typography } from "@mui/material";
// import { makeStyles } from "@material-ui/core/styles";

export const CarouselContent = () => {
  return (
    <Box
      id="carousel-content"
      sx={{
        color: "white",
        display: { md: "flex", xs: "none" },
        flexDirection: "column",
        position: "absolute",
        top: "25vh",
        left: "10vw",
        gap: 4,
      }}
    >
      <Typography variant="h3" sx={{ fontFamily: "Reey, sans-serif" }}>
        Helping Them Today
      </Typography>
      <Typography variant="h1" sx={{ fontWeight: 800 }}>
        Help the Poor <br /> in need
      </Typography>
      <Box
        component="img"
        src={CarouselCircle}
        sx={{
          position: "absolute",
          top: "10vh",
          right: "-5vh",
          animation: " mymove 3s infinite",
          "@keyframes mymove": {
            "0%": {
              transform: "scale(0.90)",
            },
            "50%": {
              transform: "scale(1)",
            },
            "100%": {
              transform: "scale(0.9)",
            },
          },
        }}
      />
    </Box>
  );
};
