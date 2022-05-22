import React, { useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useSpring, animated } from "react-spring";

import useIntersectionObserver from "../hooks/useIntersectionObserver";

const AnimatedBox = animated(Box);
const AnimatedTypography = animated(Typography);

const ANIMATED_DURATION = 1000;

const WelcomeStats = ({ text, percent = 100 }) => {
  const theme = useTheme();
  const triggerRef = useRef();
  const dataRef = useIntersectionObserver(triggerRef);

  const { number } = useSpring({
    config: { duration: ANIMATED_DURATION },
    from: { number: 0 },
    number: 100,
    to: dataRef?.isIntersecting ? percent : 0,
  });

  const statStyle = useSpring({
    config: { duration: ANIMATED_DURATION },
    from: {
      width: "0%",
    },
    to: {
      width: dataRef?.isIntersecting ? `${percent}%` : 0,
    },
  });

  return (
    <Box ref={triggerRef}>
      <Typography sx={{ fontWeight: 600, mb: "0.5rem" }}>{text}</Typography>

      <AnimatedBox
        sx={{
          width: "90%",
          height: "15px",
          bgcolor: "#eff5f4",
          borderRadius: "8px",
        }}
      >
        <AnimatedBox
          style={statStyle}
          sx={{
            maxWidth: "100%",
            height: "15px",
            bgcolor: theme.palette.main,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        />
        <AnimatedTypography
          style={statStyle}
          sx={{
            color: theme.palette.main,
            fontSize: "16px",
            fontWeight: 600,
            textAlign: "right",
          }}
        >
          {number.to((n) => `${n.toFixed(0)}%`)}
        </AnimatedTypography>
      </AnimatedBox>
    </Box>
  );
};

export default WelcomeStats;
