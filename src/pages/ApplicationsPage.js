import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  Box,
  TablePagination,
} from "@mui/material";
import ApplicationRow from "features/application/ApplicationRow";
import { getAllApplicationsByJobId } from "features/application/applicationSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SearchInput from "components/SearchInput";

const ApplicationsPage = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applicationList, totalApplications } = useSelector(
    (state) => state.application
  );

  const location = useLocation();

  useEffect(() => {
    dispatch(
      getAllApplicationsByJobId(jobId, {
        status: filterStatus,
        page: page + 1,
        limit: rowsPerPage,
      })
    );
  }, [filterStatus, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSubmit = (searchQuery) => {
    setFilterStatus(searchQuery);
    setPage(0);
  };

  return (
    <div>
      <Typography
        sx={{
          textAlign: "center",
          mt: { md: "1rem", xs: "0.5rem" },
          fontSize: "18px",
        }}
      >
        Applications List
      </Typography>
      <Typography sx={{ textAlign: "center", m: "1rem", fontSize: "26px" }}>
        {location?.state?.jobName}
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        sx={{ m: "1.5rem" }}
      >
        <SearchInput
          label="Search by Status"
          placeholder={`approved, rejected or pending`}
          handleSubmit={handleSubmit}
        />
        <Typography variant="subtitle" sx={{ color: "text.secondary", ml: 1 }}>
          {totalApplications > 1
            ? `${totalApplications} applications found`
            : totalApplications === 1
            ? `${totalApplications} application found`
            : "No application found"}
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
          count={totalApplications ? totalApplications : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, p: "1rem" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Candidate</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationList?.map((application) => (
              <TableRow
                key={application._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <ApplicationRow application={application} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApplicationsPage;
