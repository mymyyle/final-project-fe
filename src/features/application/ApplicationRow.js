import {
  Avatar,
  Button,
  Chip,
  Modal,
  TableCell,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { startCase, toLower } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { respondRequest } from "./applicationSlice";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import RatingForm from "features/rating/RatingForm";

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

const ApplicationRow = ({ application, jobStatus }) => {
  const [openRating, setOpenRating] = useState(false);
  const handleOpenRating = () => setOpenRating(true);
  const handleCloseRating = () => setOpenRating(false);

  const {
    candidateId: candidate,
    message,
    status,
    jobId: job,
    isEmployerRated,
  } = application;
  const navigate = useNavigate();
  const handleClickName = () => {
    navigate(`/user/${candidate._id}`);
  };

  const dispatch = useDispatch();
  const handleResponse = (request) => {
    dispatch(respondRequest(request, candidate._id, job._id));
  };
  console.log("application", application);
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
      {/* action */}
      {jobStatus === "ongoing" ? (
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
      ) : status === "approved" ? (
        <TableCell align="right">
          <Button
            variant="outlined"
            onClick={handleOpenRating}
            disabled={isEmployerRated}
            sx={{ mr: "2px", textTransform: "none" }}
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
                acceptor={candidate}
                type="employee"
                jobId={job._id}
                handleCloseRating={handleCloseRating}
              />
            </Box>
          </Modal>
        </TableCell>
      ) : null}
    </>
  );
};

export default ApplicationRow;
