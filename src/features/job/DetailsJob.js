import { Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CategoryIcon from "@mui/icons-material/Category";
import { fToNow } from "utils/formatTime";
import { Box } from "@mui/system";

const DetailsJob = () => {
  const { currentJob } = useSelector((state) => state.job);
  const { name, type, category, description, location, imageUrl, createdAt } =
    currentJob;

  return (
    <>
      {currentJob && (
        <Card sx={{ padding: "1rem 1.5rem", mb: "1rem" }}>
          <Stack spacing={2}>
            <Typography variant="h4">{name}</Typography>
            <Stack
              spacing={1}
              direction={{ sm: "row", xs: "column" }}
              sx={{
                // m: "0.5rem 0 1rem 0",
                display: "flex",
                flexWrap: "wrap",
                alignItems: { sm: "center", xs: "flex-start" },
                fontSize: "16px",
                color: "#616161",
              }}
            >
              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <FmdGoodIcon /> {location}
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon /> {createdAt && fToNow(createdAt)}
              </Typography>

              <Typography sx={{ display: "flex", alignItems: "center" }}>
                <CategoryIcon />
                {category}
              </Typography>
            </Stack>
            <Chip
              label={type}
              sx={{
                fontWeight: 500,
                fontSize: "16px",
                padding: "0.25rem 0.5rem",
                border: "2px solid",
                width: { md: "20%", sm: "30%", xs: "40%" },
              }}
              variant="outlined"
              color={
                type === "Full time"
                  ? "success"
                  : type === "Temporary"
                  ? "warning"
                  : "secondary"
              }
            />

            {imageUrl && (
              <Box
                component="img"
                src={imageUrl}
                alt="img"
                maxWidth="90%"
                maxHeight="70%"
                margin="0.5rem 0"
                display="inline-block"
              />
            )}
            <Typography variant="h5">Description</Typography>
            <Box
              variant="body1"
              sx={{ textIndent: "50px", textAlign: "justify" }}
            >
              {description}
            </Box>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default DetailsJob;
