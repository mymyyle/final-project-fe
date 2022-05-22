import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

const Join = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };
  return (
    <Box
      sx={{
        bgcolor: "#ff7675",
        height: "43vh",
        padding: { sm: "4.5rem 4rem 4rem 4rem", xs: "3rem" },
        mb: "3rem",
      }}
    >
      <Box
        id="main content"
        sx={{
          maxWidth: "1100px",
          display: "flex",
          flexDirection: { md: "row", xs: "column" },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          m: "0 auto",
          position: "relative",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontSize: { sm: "45px", xs: "30px" },
            lineHeight: 1.6,
            fontWeight: "700",
            textAlign: { xs: "center" },
          }}
        >
          Join your hand with us for <br /> a better life and future
        </Typography>

        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowCircleRightIcon />}
          sx={{
            bgcolor: "white",
            color: "black",
            padding: "1rem 2rem",
            "&:hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          onClick={handleClick}
        >
          Register
        </Button>

        <Typography
          sx={{
            fontFamily: "Reey, sans-serif",
            fontWeight: 200,
            fontSize: "50px",
            color: "rgba(255,255,255,0.3)",
            position: "absolute",
            top: "-30px",
            left: "-10px",
            textAlign: { xs: "center" },
          }}
        >
          Become a Volunteers
        </Typography>
      </Box>
    </Box>
  );
};

export default Join;
