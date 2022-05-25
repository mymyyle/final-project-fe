import { Pagination, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RatingCard from "./RatingCard";
import { getRatingListByUserId } from "./ratingSlice";

const LIMIT = 3;

const RatingList = ({ user, type }) => {
  const [page, setPage] = useState(1);
  const { ratingList, totalPages, totalRatings } = useSelector(
    (state) => state.rating
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const data = {
      userId: user._id,
      type,
      page,
      limit: LIMIT,
    };
    dispatch(getRatingListByUserId(data));
  }, [page]);

  return (
    <Stack spacing={2} sx={{ mt: "1rem" }}>
      {!ratingList.length && (
        <Typography sx={{ fontStyle: "italic" }}>No rating found</Typography>
      )}
      {ratingList.map((rating) => (
        <RatingCard rating={rating} />
      ))}
      {totalRatings > 0 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            m: "1rem 0",
            width: "100%",
          }}
          count={totalPages}
          page={page}
          onChange={handleChangePage}
        />
      )}
    </Stack>
  );
};

export default RatingList;
