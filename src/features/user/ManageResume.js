import {
  Card,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getJobOfCurrentUser } from "features/job/jobSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { JobRow } from "features/job/JobRow";
import SearchInput from "components/SearchInput";
import { Box } from "@mui/system";

const ManageResume = () => {
  const [filterName, setFilterName] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { allJobs, totalJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getJobOfCurrentUser({
        name: filterName,
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [filterName, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
    setPage(0);
  };
  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
          <SearchInput
            label="Search by Job's Name"
            placeholder={`Search by Job's Name`}
            handleSubmit={handleSubmit}
          />
          <Typography
            variant="subtitle"
            sx={{ color: "text.secondary", ml: 1 }}
          >
            {totalJobs > 1
              ? `${totalJobs} opportunities found`
              : totalJobs === 1
              ? `${totalJobs} opportunity found`
              : "No opportunity found"}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <TablePagination
            sx={{
              "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                {
                  display: { xs: "none", md: "block" },
                },
            }}
            component="div"
            count={totalJobs ? totalJobs : 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Stack>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Job's Name</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Status</TableCell>
                {/* <TableCell align="right">Detailed Page</TableCell> */}
                <TableCell align="right">Edit Job </TableCell>
                <TableCell align="right">Delete Job</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allJobs.map((job) => (
                <TableRow
                  key={job._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <JobRow job={job} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ManageResume;
