import React, { useRef, useState } from "react";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { useSpring, animated } from "react-spring";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import Chart from "./Chart";

const AnimatedTypography = animated(Typography);

const ANIMATED_DURATION = 500;

const CarouselStats = ({ text, totalNumber = 0 }) => {
  const theme = useTheme();
  const triggerRef = useRef();
  const dataRef = useIntersectionObserver(triggerRef);

  const { number } = useSpring({
    config: { duration: ANIMATED_DURATION },
    from: { number: 0 },
    number: 100,
    to: dataRef?.isIntersecting ? totalNumber : 0,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box ref={triggerRef}>
      <Box
        id="volunteer-available"
        sx={{
          textAlign: "center",
          p: "1.25rem 0.75rem",
          width: { md: "15vw", sm: "35vw" },
          height: { md: "26vh", sm: "13.5vh" },
          bgcolor: "white",
          color: theme.palette.main,
          transition: "all 0.5s ease",
          "&:hover": {
            bgcolor: theme.palette.main,
            color: "white !important",
          },
        }}
      >
        <AnimatedTypography
          // variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { md: "52px", sm: "40px" },
            lineHeight: 1.2,
          }}
        >
          {number.to((n) => `${n.toFixed(0)}`)}
        </AnimatedTypography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: "black",
            fontSize: { md: "26px", sm: "20px" },
            lineHeight: 1.2,
          }}
        >
          {text} are Available
        </Typography>

        <Button onClick={handleOpen} sx={{ color: "inherit" }}>
          <InsertChartOutlinedOutlinedIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Chart />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default CarouselStats;
