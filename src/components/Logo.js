import { Box } from "@mui/material";
import React from "react";
import Icon from "assets/icon1.png";
import { Link } from "react-router-dom";

const Logo = ({ disableLink = false, sx }) => {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={Icon} alt="logo" width="100%" />
    </Box>
  );

  if (disableLink) return <>{logo}</>;
  return <Link to="/">{logo}</Link>;
};

export default Logo;
