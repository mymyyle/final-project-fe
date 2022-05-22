import { Avatar, Card, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Employer = () => {
  const { currentJob } = useSelector((state) => state.job);
  const { authorId: author } = currentJob;
  const navigate = useNavigate();
  const handleClickName = () => {
    navigate(`/user/${author._id}`);
  };

  return (
    <>
      {author && (
        <Card
          sx={{
            padding: "1.75rem",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              {!author.avatarUrl ? (
                <Avatar
                  sx={{ width: 80, height: 80, backgroundColor: "#ffa502" }}
                ></Avatar>
              ) : (
                <Avatar
                  alt={author.name}
                  src={author.avatarUrl}
                  sx={{ width: 80, height: 80, alignSelf: "start" }}
                />
              )}
            </Box>
            <Typography
              onClick={handleClickName}
              variant="h6"
              sx={[
                {
                  "&:hover": {
                    cursor: "pointer",
                    color: "#ff7675",
                  },
                },
              ]}
            >
              {author.name}
            </Typography>
            <Typography>{author.email}</Typography>
          </Box>
          <Typography sx={{ textIndent: "50px", textAlign: "justify" }}>
            {author?.aboutMe?.slice(0, 110)}
            {author?.aboutMe?.length > 110 && `...`}
          </Typography>
        </Card>
      )}
    </>
  );
};
