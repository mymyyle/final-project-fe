import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useDispatch, useSelector } from "react-redux";
import { countAllJob } from "features/job/jobSlice";
import { countAllUser } from "features/user/userSlice";
import CarouselStats from "./CarouselStats";
import { CarouselContent } from "./CarouselContent";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "San Francisco – Oakland Bay Bridge, United States",
    // imgPath: "https://i.imgur.com/p8UUzyy.png",
    imgPath:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80",
    url: "/jobs",
  },
  {
    label: "Bird",
    imgPath:
      "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1600&q=80",
    url: "/post_jobs",
  },
  // {
  //   label: "Bali, Indonesia",
  //   imgPath: "https://i.imgur.com/JCpfplI.png",
  //   url: "/",
  // },
];

const Carousel = () => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  // stats
  const { countJobs } = useSelector((state) => state.job);
  const { totalUsers } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countAllUser());
  }, []);
  useEffect(() => {
    dispatch(countAllJob());
  }, []);

  return (
    <Box
      sx={{
        height: { md: "125vh", sm: "50vh", xs: "25vh" },
        position: "relative",
      }}
    >
      <Box
        sx={[
          {
            width: "100vw",
            maxHeight: "125vh",
            flexGrow: 1,
            margin: "auto",
            position: "relative",
            overflow: "hidden",
          },
          {
            "&:hover": {
              overflow: "hidden",
            },
          },
        ]}
      >
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval="5000"
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <>
                  <Box
                    component="img"
                    sx={[
                      {
                        display: { xs: "block", md: "none" },
                        width: "100vw",
                        height: { md: "125vh", sm: "45vh", xs: "28vh" },
                        objectFit: "contain",
                        transform: "scale(1.2)",
                        overflow: "hidden",
                        transitionDuration: "4s",
                        // backgroundImage: {
                        //   xs: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${step.imgPath})  `,
                        // },
                        // backgroundRepeat: "no-repeat",
                        // backgroundAttachment: "fixed",
                      },
                      {
                        "&:hover": {
                          transform: "scale(1.3)",
                          transitionDuration: "4s",
                        },
                      },
                    ]}
                    src={step.imgPath}
                    alt={step.label}
                  />
                  <Box
                    component="img"
                    sx={[
                      {
                        display: { xs: "none", md: "block" },
                        width: "100vw",
                        height: { md: "125vh", sm: "45vh", xs: "28vh" },
                        objectFit: "contain",
                        transform: "scale(1.2)",
                        overflow: "hidden",
                        transitionDuration: "4s",
                        backgroundImage: {
                          md: `linear-gradient(rgba(0, 0, 0, 0.37),rgba(0, 0, 0, 0.5)), url(${step.imgPath})  `,
                        },
                        // backgroundRepeat: "no-repeat",
                        // backgroundAttachment: "fixed",
                      },
                      {
                        "&:hover": {
                          transform: "scale(1.3)",
                          transitionDuration: "4s",
                        },
                      },
                    ]}
                    // src={step.imgPath}
                    alt={step.label}
                  />
                </>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          sx={{
            position: "absolute",
            // bottom: "0",
            // left: "10%",
            // transform: "translate(-50%, 0)",
            left: 0,
            top: "15vh",
            width: "10%",
            background: "transparent",
            zIndex: 10,
          }}
          steps={maxSteps}
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
            </Button>
          }
        />
      </Box>
      <Box
        id="carousel-stats"
        sx={{
          display: { sm: "flex", xs: "none" },
          position: "absolute",
          bottom: { md: "0", sm: "5vh" },
          right: { md: "10vw", sm: "15vw" },
        }}
      >
        <CarouselStats text="Volunteers" totalNumber={totalUsers} />
        <CarouselStats text="Jobs" totalNumber={countJobs} />
      </Box>
      <CarouselContent />
    </Box>
  );
};

export default Carousel;
