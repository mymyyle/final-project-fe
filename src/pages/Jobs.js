import { Box } from "@mui/system";
import { getJob } from "features/job/jobSlice";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchInput from "components/SearchInput";
import Autocomplete from "@mui/material/Autocomplete";
import JobItem from "features/job/JobItem";
import dataLocation from "local.json";
import AllJobMap from "features/map/AllJobMap";
const LIMIT = 5;

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobIds, jobs, totalPages, totalJobs } = useSelector(
    (state) => state.job
  );
  //maps
  const mapRef = useRef();
  const panTo = useCallback(({ lat, lng }) => {
    console.log(`panTo`, lat, lng);
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  //search+filter
  const [filterName, setFilterName] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getJob({
        name: filterName,
        category: filterCategory,
        location: filterLocation,
        type: filterType,
        page,
        limit: LIMIT,
      })
    );
  }, [filterName, filterCategory, filterLocation, filterType, page, dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSubmit = (searchQuery) => {
    setFilterName(searchQuery);
    setPage(1);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: { xs: "center", md: "start" },
        margin: { xs: "auto", md: "0" },
        minHeight: "80vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: { md: "50vw" },
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: { md: "none" } }}>
            <AllJobMap mapRef={mapRef} panTo={panTo} />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: { xs: "column", md: "column" },
              // justifyContent: "space-between",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SearchInput
              placeholder={`Search by Job's Name`}
              handleSubmit={handleSubmit}
            />

            <Stack
              spacing={0.5}
              sx={{
                mt: "0.5rem",
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "flex-ends",
              }}
            >
              <Autocomplete
                id="search-type"
                onInputChange={(event, newInputValue) => {
                  setFilterType(newInputValue);
                  setPage(1);
                }}
                options={["Full time", "Part time", "Temporary"]}
                size={"small"}
                style={{ width: 200, marginRight: 25 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Type"
                    InputProps={{
                      ...params.InputProps,
                      style: { height: 40 },
                    }}
                  />
                )}
              />
              <Autocomplete
                id="search-category"
                size={"small"}
                style={{ width: 200, marginRight: 25 }}
                onInputChange={(event, newInputValue) => {
                  setFilterCategory(newInputValue);
                  setPage(1);
                }}
                options={["Community", "Environment", "Healthcare"]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search by Category"
                    InputProps={{
                      ...params.InputProps,
                      style: { height: 40 },
                    }}
                  />
                )}
              />

              {dataLocation && (
                <Autocomplete
                  id="search-location"
                  onInputChange={(event, newInputValue) => {
                    setFilterLocation(newInputValue);
                    setPage(1);
                  }}
                  size={"small"}
                  style={{ width: 200, marginRight: 25 }}
                  options={dataLocation.map((location) => location.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search by Location"
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 40 },
                      }}
                    />
                  )}
                />
              )}
            </Stack>
          </Box>
          <Typography
            variant="subtitle"
            sx={{
              color: "text.secondary",
              m: "1rem 0 0 1.7rem",
              alignSelf: "start",
            }}
          >
            {totalJobs > 1
              ? `${totalJobs}  opportunities found`
              : totalJobs === 1
              ? `${totalJobs} opportunity found`
              : "No opportunity found"}
          </Typography>

          <Grid container sx={{ margin: "auto" }}>
            {jobIds.map((jobId) => (
              <Grid
                key={jobId}
                item
                md={12}
                xs={12}
                sx={{ padding: 0, mb: "2rem" }}
              >
                <JobItem job={jobs[jobId]} panTo={panTo} mapRef={mapRef} />
              </Grid>
            ))}
          </Grid>

          <Pagination
            sx={{ alignSelf: "center" }}
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Stack>
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "fixed",
            right: "0vw",
            top: "7.3rem",
          }}
        >
          <AllJobMap mapRef={mapRef} panTo={panTo} width="48vw" height="83vh" />
        </Box>
      </Box>
    </Container>
  );
};

export default Jobs;
