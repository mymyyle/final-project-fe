import { Button, Chip, TableCell } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useDispatch } from "react-redux";
import { deleteJob } from "./jobSlice";
import { useNavigate } from "react-router-dom";
import { fDateTime } from "utils/formatTime";

import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

export const JobRow = ({ job }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleDeleteJob = (jobId) => {
    dispatch(deleteJob(jobId));
  };
  const handleEditJob = (jobId) => {
    navigate(`/job/edit/${jobId}`);
  };
  const navigateToListApplicationOfJob = (jobId) => {
    navigate(`/applications/${jobId}`, { state: { jobName: job.name } });
  };
  const navigateToDetailJobPage = (jobId) => {
    navigate(`job/${jobId}`);
  };

  return (
    <>
      <TableCell>
        <Button onClick={() => navigateToListApplicationOfJob(job._id)}>
          {job.name}
        </Button>
      </TableCell>
      <TableCell align="right">{fDateTime(job.createdAt)}</TableCell>
      <TableCell align="right">
        {job.status === "ongoing" ? (
          <Chip label="Ongoing" color="success" />
        ) : (
          <Chip label="Closed" color="error" />
        )}
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => handleEditJob(job._id)}>
          <EditTwoToneIcon />
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button onClick={() => handleDeleteJob(job._id)}>
          <DeleteIcon />
        </Button>
      </TableCell>
      {/* <TableCell align="right">
        <Button onClick={() => navigateToDetailJobPage(job._id)}>
          <ArrowRightAltOutlinedIcon />
        </Button>
      </TableCell> */}
    </>
  );
};
