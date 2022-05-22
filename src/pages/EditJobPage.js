import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Autocomplete,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  FormProvider,
  FRadioGroup,
  FTextField,
  FUploadImage,
} from "components/form";
import { useNavigate, useParams } from "react-router-dom";
import { editJob, getJobById } from "features/job/jobSlice";
import { Box } from "@mui/system";
import dataLocation from "local.json";
import EditJobMap from "features/map/EditJobMap";

const EditJobPage = () => {
  const { jobId } = useParams();
  const defaultValues = {
    name: "",
    type: "",
    description: "",
    imageUrl: "",
    detailedInformation: "",
    category: "",
    status: "ongoing",
  };

  const { currentJob } = useSelector((state) => state.job);
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getJobById(jobId));
  }, []);

  const [location, setLocation] = useState();
  const [district, setDistrict] = useState();
  const [districtOptions, setDistrictOptions] = useState([]);
  const [address, setAddress] = useState("");
  const [map, setMap] = useState({});

  useEffect(() => {
    reset({
      name: currentJob.name,
      type: currentJob.type,
      description: currentJob.description,
      imageUrl: currentJob.imageUrl,
      detailedInformation: currentJob.detailedInformation,
      category: currentJob.category,
      status: "ongoing",
    });
    setLocation(currentJob.location);

    setDistrict(currentJob.district);
    let districts = dataLocation.find((province) => province.name === location);
    if (districts !== undefined) {
      districts = districts?.districts.map((location) => location.name);
      setDistrictOptions(districts);
    }

    setAddress(district + ", " + location + ", Vietnam");
    setMap({ lng: currentJob.lng, lat: currentJob.lat });
  }, [currentJob]);

  useEffect(() => {
    let districts = dataLocation.find((province) => province.name === location);
    if (districts !== undefined) {
      districts = districts?.districts.map((location) => location.name);
      setDistrictOptions(districts);
    }
  }, [location]);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("submit district", district);
    dispatch(
      editJob(jobId, {
        ...data,
        location,
        district,
        lng: map.lng,
        lat: map.lat,
      })
    );
    navigate("/account/opportunities");
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "imageUrl",
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );
      }
    },
    [setValue]
  );
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ marginBottom: 3 }}>
            <Typography> EDIT YOUR JOB</Typography>

            <Box component="span">
              Status
              <FRadioGroup
                name="status"
                label="Status"
                options={["ongoing", "closed"]}
              />
            </Box>
            <FTextField
              name="name"
              label="Job Title"
              sx={{ maxWidth: "80vw" }}
            />

            {dataLocation && (
              <>
                <Autocomplete
                  id="location"
                  onInputChange={(event, newInputValue) => {
                    setLocation(newInputValue);
                  }}
                  defaultValue={currentJob.location}
                  name="location"
                  size={"small"}
                  style={{ width: 200, marginRight: 25, height: 55 }}
                  options={dataLocation.map((location) => location.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Location"
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 55, textAlign: "center" },
                      }}
                    />
                  )}
                />
                <Autocomplete
                  id="location-district"
                  onInputChange={(event, newInputValue) => {
                    setDistrict(newInputValue);
                    setAddress(newInputValue + ", " + location + ", Vietnam");
                    console.log(`address`, address);
                  }}
                  defaultValue={currentJob.district}
                  name="district"
                  size={"small"}
                  style={{ width: 210, marginRight: 25, height: 55 }}
                  options={districtOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="District"
                      InputProps={{
                        ...params.InputProps,
                        style: { height: 55 },
                      }}
                    />
                  )}
                />
              </>
            )}
            <EditJobMap address={address} setMap={setMap} map={map} />

            <FTextField
              name="description"
              label="Job Description"
              multiline
              rows={4}
            />
            <Typography>Type</Typography>
            <FRadioGroup
              name="type"
              label="type"
              options={["Full time", "Part time", "Temporary"]}
            />

            <Typography component="span">Category</Typography>
            <FRadioGroup
              name="category"
              label="category"
              options={["Community", "Environment", "Healthcare"]}
            />
            {/* <FTextField name="imageUrl" label="Image Link" /> */}
            <FUploadImage
              name="imageUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />

            <FTextField
              multiline
              rows={4}
              name="detailedInformation"
              label="Secret message for participant"
              placeholder="This message will be sent to all participants who have been approved application"
            />
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Update
          </LoadingButton>
        </FormProvider>
      </Container>
    </>
  );
};

export default EditJobPage;
