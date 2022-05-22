import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";

const MainLayout = () => {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Box sx={{ m: { md: "6rem 0 1rem 0", xs: "12rem 0 1rem 0" } }}>
        <Outlet />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
};

export default MainLayout;
