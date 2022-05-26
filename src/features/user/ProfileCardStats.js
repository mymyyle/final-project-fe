import {
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import RatingList from "features/rating/RatingList";
import { useSelector } from "react-redux";

import React, { useState } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 600,
  //   height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ProfileCardStats = ({ user }) => {
  const {
    employerRatingId,
    totalEmployerScore,
    employeeRatingId,
    totalEmployeeScore,
    allStart,
  } = user;
  const [openVolunteer, setOpenVolunteer] = useState(false);
  const handleOpenVolunteer = () => setOpenVolunteer(true);
  const handleCloseVolunteer = () => setOpenVolunteer(false);

  const [openOrganiser, setOpenOrganiser] = useState(false);
  const handleOpenOrganiser = () => setOpenOrganiser(true);
  const handleCloseOrganiser = () => setOpenOrganiser(false);
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        width: "35%",
        m: "auto",
        p: "1rem",
      }}
    >
      <Stack
        id="vote-for-volunteer"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        {employeeRatingId.length > 0 ? (
          <>
            <Typography variant="h4">
              <Rating
                name="read-only"
                value={totalEmployeeScore / employeeRatingId.length}
                readOnly
              />
            </Typography>
            <Typography variant="b2">
              {employeeRatingId.length} &nbsp;
              {employeeRatingId.length === 1 ? "vote for" : "votes for"}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4">
              <Rating name="disabled" value={0} disabled />
            </Typography>
            <Typography variant="b2">No vote for</Typography>
          </>
        )}
        <Button onClick={handleOpenVolunteer} sx={{ fontSize: "20px" }}>
          Volunteer
        </Button>
        <Modal open={openVolunteer} onClose={handleCloseVolunteer}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: "1rem" }}
            >
              Rating List
            </Typography>

            <RatingList user={user} type="employee" />
          </Box>
        </Modal>
      </Stack>

      <Divider orientation="vertical" flexItem variant="middle" />

      <Stack
        id="vote-for-organiser"
        spacing={1}
        justifyContent="center"
        alignItems="center"
      >
        {employerRatingId.length > 0 ? (
          <>
            <Typography variant="h4">
              <Rating
                name="read-only"
                value={totalEmployerScore / employerRatingId.length}
                readOnly
              />
            </Typography>
            <Typography variant="b2">
              {employerRatingId.length} &nbsp;
              {employerRatingId.length === 1 ? "vote for" : "votes for"}
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="h4">
              <Rating name="disabled" value={0} disabled />
            </Typography>
            <Typography variant="b2">No vote for</Typography>
          </>
        )}
        <Button onClick={handleOpenOrganiser} sx={{ fontSize: "20px" }}>
          Organiser
        </Button>
        <Modal open={openOrganiser} onClose={handleCloseOrganiser}>
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", mb: "1rem" }}
            >
              Rating List
            </Typography>

            <RatingList user={user} type="employer" />
          </Box>
        </Modal>
      </Stack>
    </Card>
  );
};

export default ProfileCardStats;
