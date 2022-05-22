import { Stack } from "@mui/material";
import Logo from "components/Logo";
import React from "react";
import { Outlet } from "react-router-dom";

const BlankLayout = () => {
  return (
    <Stack
      sx={{
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Logo sx={{ width: 65, height: 65, mb: 5 }} />
      <Outlet />
    </Stack>
  );
};

export default BlankLayout;
