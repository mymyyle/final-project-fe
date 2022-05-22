import { Box, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material";

import WelcomeImg from "assets/welcome.jpg";
import WelcomeSubImg from "assets/welcome2.jpg";
import WelcomeHeart from "assets/welcome-heart.png";

const WelcomeImage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ position: "relative", padding: `0 2rem`, flex: 1 }}>
      <Box
        sx={{
          padding: `0 2rem`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-10px",
            height: "50%",
            width: "30px",
            backgroundColor: theme.palette.main,
            display: { xs: "none", md: "block" },
          },
        }}
      >
        <Box
          component="img"
          src={WelcomeImg}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Box
        component="img"
        sx={{
          position: "absolute",
          left: "-10px",
          bottom: "-30px",
          height: "45%",
          display: { xs: "none", md: "block" },
        }}
        src={WelcomeSubImg}
      />
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.main,
          fontFamily: "Reey, sans-serif",
          position: "absolute",
          zIndex: 1,
          left: 0,
          fontSize: { xs: "3rem", sm: "6rem", md: "3rem" },
          bottom: { xs: "90px", sm: "130px", md: "40px" },
          width: { xs: "100%" },
          textAlign: "center",
        }}
      >
        Helping Today
      </Typography>
      <Box
        component="img"
        sx={{
          position: "absolute",
          height: { xs: "100px", md: "100px" },
          right: { xs: "10px", md: 0 },
          bottom: { xs: "-20px", sm: "20px" },
          objectFit: "cover",
        }}
        src={WelcomeHeart}
      />
    </Box>
  );
};

export default WelcomeImage;
