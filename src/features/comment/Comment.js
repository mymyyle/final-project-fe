import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import useAuth from "hooks/useAuth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { deleteComment } from "./commentSlice";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CommentReply from "./CommentReply";
import EditQuestion from "./EditQuestion";
import { useNavigate } from "react-router-dom";
import { fDay } from "utils/formatTime";
import { useTheme } from "@mui/system";

const Comment = ({ comment }) => {
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
  };
  const id = comment._id;
  const { authorCommentId: questioner } = comment;
  const { currentJob } = useSelector((state) => state.job);
  const { authorId: authorJob } = currentJob;
  const navigate = useNavigate();
  const handleClickQuestionerName = () => {
    navigate(`/user/${questioner._id}`);
  };
  const handleClickEmployerName = () => {
    navigate(`/user/${authorJob._id}`);
  };
  const theme = useTheme();

  return (
    <>
      {comment && (
        <Card
          sx={{
            p: "0.75rem",
            borderRadius: "5px",
            pl: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "0.75rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {!questioner.avatarUrl ? (
                <Avatar
                  sx={{
                    backgroundColor: "#ffa502",
                    width: 40,
                    height: 40,
                    alignSelf: "start",
                  }}
                />
              ) : (
                <Avatar
                  alt={questioner.name}
                  src={questioner.avatarUrl}
                  sx={{ width: 40, height: 40, alignSelf: "start" }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  bgcolor: theme.palette.comment,

                  minWidth: "37vw",
                  borderRadius: "10px",
                  ml: "0.5rem",
                  p: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                }}
              >
                <Box
                  id="name-content-comment"
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    onClick={handleClickQuestionerName}
                    sx={[
                      { fontWeight: "700" },
                      {
                        "&:hover": {
                          cursor: "pointer",
                          color: "#ff7675",
                        },
                      },
                    ]}
                    variant="body1"
                  >
                    {questioner.name}
                  </Typography>

                  <Box id="content-content edit">
                    <Typography
                      sx={{ ml: "1rem", wordBreak: "break-word" }}
                      variant="body1"
                    >
                      {comment.content}
                    </Typography>
                    {showEdit && !comment.reply && (
                      <EditQuestion
                        id={id}
                        setShowEdit={setShowEdit}
                        content={comment.content}
                      />
                    )}
                  </Box>
                </Box>

                <Box
                  id="day-btn-edit-delete"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: 12 }}>
                    {fDay(comment.createdAt)}
                  </Typography>
                  {isAuthenticated && (
                    <Box>
                      {!comment.reply && (
                        <EditIcon
                          fontSize="small"
                          onClick={() => setShowEdit(!showEdit)}
                          sx={[
                            {
                              "&:hover": {
                                cursor: "pointer",
                                color: "#0652DD",
                              },
                            },
                          ]}
                        />
                      )}

                      <DeleteForeverIcon
                        onClick={() => handleDeleteComment(id)}
                        fontSize="small"
                        sx={[
                          {
                            "&:hover": {
                              cursor: "pointer",
                              color: "#0652DD",
                            },
                          },
                        ]}
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* comment reply */}
          {comment.reply ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {!authorJob.avatarUrl ? (
                <Avatar
                  sx={{
                    backgroundColor: "#ffa502",
                    width: 40,
                    height: 40,
                    alignSelf: "start",
                  }}
                />
              ) : (
                <Avatar
                  alt={authorJob.name}
                  src={authorJob.avatarUrl}
                  sx={{ width: 30, height: 30, alignSelf: "start", ml: "1rem" }}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",

                  bgcolor: theme.palette.comment,
                  minWidth: "36.5vw",
                  borderRadius: "10px",
                  ml: "0.75rem",
                  p: "0.75rem",
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    onClick={handleClickEmployerName}
                    sx={[
                      { fontWeight: "700" },
                      {
                        "&:hover": {
                          cursor: "pointer",
                          color: "#ff7675",
                        },
                      },
                    ]}
                    variant="body1"
                  >
                    {authorJob.name}
                  </Typography>
                  <Typography
                    sx={{ ml: "1rem", wordBreak: "break-word" }}
                    variant="body1"
                  >
                    {comment.reply}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12 }}>
                  {fDay(comment.updatedAt)}
                </Typography>
              </Box>
            </Box>
          ) : (
            isAuthenticated && <CommentReply id={id} />
          )}
        </Card>
      )}
    </>
  );
};

export default Comment;
