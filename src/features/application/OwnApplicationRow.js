import { Box, Button, Chip, Modal, TableCell, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "utils/formatTime";
import { cancelJob } from "./applicationSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import RatingForm from "features/rating/RatingForm";
import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, sm: 500 },
  height: { sm: 300 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const OwnApplicationRow = ({ application }) => {
  const [openRating, setOpenRating] = useState(false);
  const handleOpenRating = () => setOpenRating(true);
  const handleCloseRating = () => setOpenRating(false);

  const {
    candidateId: candidate,
    message,
    status,
    jobId: job,
    employerId: employer,
  } = application;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancelJob = (jobId) => {
    dispatch(cancelJob(job._id));
  };
  const handleClickName = () => {
    navigate(`/job/${job._id}`);
  };

  return (
    <>
      <TableCell>
        <Button
          sx={{ alignSelf: "end", textTransform: "none" }}
          onClick={handleClickName}
        >
          {job?.name}
        </Button>
        {status === "approved" && (
          <Typography>Message: {job.detailedInformation}</Typography>
        )}
      </TableCell>
      <TableCell align="right">{fDateTime(job.createdAt)}</TableCell>
      <TableCell align="right">
        {status === "pending" ? (
          <Chip label="Waiting for response" color="warning" />
        ) : status === "approved" ? (
          <Chip
            icon={<CheckCircleOutlineIcon />}
            label="Approved"
            color="success"
          />
        ) : (
          <Chip icon={<CancelIcon />} label="Rejected" color="error" />
        )}
      </TableCell>
      <TableCell align="right">
        {job.status === "done" && status === "approved" ? (
          <>
            <Button
              variant="outlined"
              sx={{ alignSelf: "end", textTransform: "none", ml: "0.5rem" }}
              onClick={handleOpenRating}
            >
              Rating
            </Button>
            <Modal
              open={openRating}
              onClose={handleCloseRating}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <RatingForm
                  acceptor={employer}
                  type="employer"
                  jobId={job._id}
                  handleCloseRating={handleCloseRating}
                />
              </Box>
            </Modal>
          </>
        ) : (
          <Button
            variant="contained"
            sx={{ alignSelf: "end", textTransform: "none" }}
            onClick={handleCancelJob}
          >
            Cancel
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default OwnApplicationRow;
