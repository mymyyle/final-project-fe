import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Logo from "components/Logo";
import useAuth from "hooks/useAuth";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ColorModeContext } from "theme";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import "./MainHeader.scss";

export const AccountMenu = ({ user, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();
  const handleAccount = () => {
    navigate("/account/update_profile");
  };
  const handleLogout = () => {
    logout(() => {
      navigate("/login");
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        id="positioned-button"
        sx={{ p: 0, m: 0 }}
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user.avatarUrl ? (
          <Avatar alt={user.name} src={user.avatarUrl} />
        ) : (
          <Avatar sx={{ backgroundColor: "#ffa502" }}>{user.name[0]}</Avatar>
        )}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
};

const NAV_ITEMS = [
  { label: "Home", url: "/", className: "btn" },
  { label: "Jobs", url: "/jobs", className: "btn" },
  { label: "Post a job", url: "/post_job", className: "btn" },
  { label: "DONATE", url: "/donation", className: "btn btn-post" },
];
const MainHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const theme = useTheme();

  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      id="nav"
      sx={{
        position: "fixed",
        zIndex: 100,
        width: "100vw",
        backgroundColor: theme.palette.header,
      }}
    >
      <div className="header-container">
        <Box className="logo" sx={{ m: "0.5rem", mb: "1rem" }}>
          <Logo sx={{ height: "2.5rem" }} />
          <Typography
            component="span"
            sx={{ fontSize: "2rem", fontWeight: "bold" }}
          >
            Volun
          </Typography>
          <span className="red">Cheers</span>
        </Box>
        <Box sx={{ flex: 1 }} />
        <List className="ul" sx={{ p: 0, m: 0 }}>
          {NAV_ITEMS.map((item) => (
            <ListItem
              className="li"
              key={item.label}
              sx={{
                p: 0,
                m: 0,
                height: "3vh",
                whiteSpace: "nowrap",
                color: theme.palette.text.header,
              }}
            >
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive ? `${item.className} selected` : item.className
                }
              >
                {item.label}
              </NavLink>
            </ListItem>
          ))}
        </List>

        <List
          className="ul"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ListItem className="li" sx={{ p: 0, m: 0 }}>
            {isAuthenticated ? (
              <AccountMenu user={user} logout={logout} />
            ) : (
              <NavLink className="btn" to="/login">
                Login
              </NavLink>
            )}
          </ListItem>
          {/* THEME */}
          <ListItem className="li" sx={{ p: 0, m: 0 }}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "text.primary",
                borderRadius: 1,
              }}
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={colorMode.toggleColorMode}
                color="inherit"
              >
                {theme.palette.mode === "dark" ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
          </ListItem>
        </List>
      </div>
    </Box>
  );
};

export default MainHeader;
