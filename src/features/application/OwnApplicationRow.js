import { Button, Chip, TableCell, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "utils/formatTime";
import { cancelJob } from "./applicationSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const OwnApplicationRow = ({ application }) => {
  const { candidateId: candidate, message, status, jobId: job } = application;
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
        <Button
          variant="contained"
          sx={{ alignSelf: "end", textTransform: "none" }}
          onClick={handleCancelJob}
        >
          Cancel
        </Button>
      </TableCell>
    </>
  );
};

export default OwnApplicationRow;
