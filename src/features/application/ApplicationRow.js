import { Avatar, Button, Chip, TableCell, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { startCase, toLower } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { respondRequest } from "./applicationSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
const ApplicationRow = ({ application }) => {
  const { candidateId: candidate, message, status, jobId: job } = application;
  const navigate = useNavigate();
  const handleClickName = () => {
    navigate(`/user/${candidate._id}`);
  };

  const dispatch = useDispatch();
  const handleResponse = (request) => {
    dispatch(respondRequest(request, candidate._id, job._id));
  };

  return (
    <>
      <TableCell>
        <Box>
          <Box sx={{ display: "flex", marginBottom: 2 }}>
            {candidate?.avatarUrl ? (
              <Avatar alt="avatar" src={candidate.avatarUrl} />
            ) : (
              !!candidate?.name && (
                <Avatar sx={{ bgcolor: "#ffa502" }}>
                  {candidate?.name[0]}
                </Avatar>
              )
            )}
            <Button
              sx={{ alignSelf: "end", textTransform: "none" }}
              onClick={handleClickName}
            >
              {startCase(toLower(candidate?.name))}{" "}
            </Button>
          </Box>
          {message && (
            <Typography sx={{ maxWidth: "600px " }}>
              <strong>Message:</strong> {message}
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell align="center">
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
        {status === "pending" ? (
          <>
            {" "}
            <Button
              onClick={() => handleResponse("approved")}
              variant="outlined"
              sx={{ mr: "2px", textTransform: "none" }}
            >
              Approve
            </Button>
            <Button
              color="error"
              onClick={() => handleResponse("rejected")}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Reject
            </Button>
          </>
        ) : status === "approved" ? (
          <Button
            color="error"
            onClick={() => handleResponse("rejected")}
            // variant="contained"
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            Reject
          </Button>
        ) : (
          <Button
            onClick={() => handleResponse("approved")}
            // variant="contained"
            variant="outlined"
            sx={{ mr: "2px", textTransform: "none" }}
          >
            Approve
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default ApplicationRow;
