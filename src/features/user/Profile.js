import { Avatar, Box, Card, Container, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";

const Profile = ({ user }) => {
  return (
    <Container sx={{ width: "90%", m: "1rem auto" }}>
      <Card sx={{ padding: "1.75rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              bgcolor: "#fab1a0",
              height: { md: "35vh", xs: "25vh" },
              width: "90%",
              borderRadius: "10px",
              border: "5px solid #fff",
              position: "relative",
              mb: "5rem",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: " translate(-50%,50%)",
              }}
            >
              {!user.avatarUrl ? (
                <Avatar
                  sx={{ backgroundColor: "#ffa502", width: 150, height: 150 }}
                >
                  <PersonIcon color="action" sx={{ fontSize: "90px" }} />
                </Avatar>
              ) : (
                <Avatar
                  alt={user.name}
                  src={user.avatarUrl}
                  sx={{ width: 150, height: 150, alignSelf: "start" }}
                />
              )}
            </Box>
          </Box>

          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
        </Box>

        <Typography
          sx={{ textIndent: "50px", textAlign: "justify", m: "1rem 0" }}
        >
          {user.aboutMe}
        </Typography>
      </Card>
    </Container>
  );
};

export default Profile;
