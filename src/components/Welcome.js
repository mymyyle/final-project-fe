import { Box } from "@mui/system";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import React from "react";
import WelcomeImage from "./WelcomeImage";
import WelcomeStats from "./WelcomeStats";

const Welcome = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ m: "3rem auto", lineHeight: "1.6" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "2.5rem",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <WelcomeImage />
        <Stack spacing={2.5} sx={{ flex: 1 }}>
          <Typography
            variant="body1"
            sx={{ color: theme.palette.main, fontWeight: 600 }}
          >
            Welcome to our Community
          </Typography>
          <Typography
            // variant="h3"
            sx={{ fontWeight: 800, fontSize: "45px", lineHeight: "60px" }}
          >
            Helping each other can make world better
          </Typography>

          <Typography variant="b1" sx={{ color: "#707876" }}>
            Lorem ipsum dolor sit amet, consectetur notted adipisicing elit sed
            do eiusmod tempor incididunt ut labore et simply free text dolore
            magna aliqua lonm andhn.
          </Typography>
          <Box
            id="mission-story"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "start",
            }}
          >
            <Box id="mission">
              <Typography
                sx={{
                  mb: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowCircleRightIcon
                  htmlColor={theme.palette.main}
                  sx={{ fontSize: "30px" }}
                />
                <Typography
                  component="span"
                  sx={{ ml: "0.75rem", fontWeight: 600 }}
                >
                  Our Mission
                </Typography>
              </Typography>

              <Typography variant="b1 " sx={{ color: "#707876" }}>
                Lorem ipsum dolor sit amet not is consectetur notted.
              </Typography>
            </Box>
            <Box id="story">
              <Typography
                sx={{
                  mb: "0.5rem",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <ArrowCircleRightIcon
                  htmlColor={theme.palette.main}
                  sx={{ fontSize: "30px" }}
                />
                <Typography
                  component="span"
                  sx={{ ml: "0.75rem", fontWeight: 600 }}
                >
                  Our Story
                </Typography>
              </Typography>

              <Typography variant="b1 " sx={{ color: "#707876" }}>
                Lorem ipsum dolor sit amet not is consectetur notted.
              </Typography>
            </Box>
          </Box>
          <WelcomeStats text="Charity" percent={53} />
          <WelcomeStats text="Donations" percent={79} />
          <WelcomeStats text="Goal" percent={42} />
        </Stack>
      </Box>
    </Container>
  );
};

export default Welcome;
