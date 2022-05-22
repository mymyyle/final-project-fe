import React, { useCallback, useEffect, useState } from "react";
import {
  FormProvider,
  FRadioGroup,
  FTextField,
  FUploadImage,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  Alert,
  Autocomplete,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createJob } from "./jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dataLocation from "local.json";
import PostJobMap from "features/map/PostJobMap";
import { Box } from "@mui/system";

const NewJobSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("description is required"),
});

const defaultValues = {
  name: "",
  type: "Temporary",
  // location: "",
  description: "",
  imageUrl: "",
  detailedInformation: "",
  category: "Environment",
};

const PostJob = () => {
  const [location, setLocation] = useState("Hồ Chí Minh");
  const [districtOptions, setDistrictOptions] = useState(
    dataLocation
      .find((province) => province.name === "Hồ Chí Minh")
      .districts.map((location) => location.name) || []
  );
  const [district, setDistrict] = useState("Quận 1");
  const [address, setAddress] = useState("Quận 1, Hồ Chí Minh, VietNam");
  const [map, setMap] = useState({
    lng: 106.69656141901858,
    lat: 10.774984162802395,
  });

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    handleSubmit,

    setValue,

    formState: { errors, isSubmitting },
  } = methods;

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.job);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const jobData = await dispatch(
      createJob({ ...data, location, district, lng: map.lng, lat: map.lat })
    );
    navigate(`/job/${jobData._id}`);
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

  useEffect(() => {
    let districts = dataLocation.find((province) => province.name === location);
    if (districts !== undefined) {
      districts = districts?.districts.map((location) => location.name);
      setDistrictOptions(districts);
    }
  }, [location]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: { lg: "1rem auto", sm: "1rem 0rem" },
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ marginBottom: 3 }}>
          <Typography variant="h6"> POST NEW JOB</Typography>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message} </Alert>
          )}

          <FTextField name="name" label="Job Title" />

          {dataLocation && (
            <>
              <Autocomplete
                id="location"
                onInputChange={(event, newInputValue) => {
                  setLocation(newInputValue);
                }}
                defaultValue="Hồ Chí Minh"
                name="location"
                size={"small"}
                style={{ width: 210, marginRight: 25, height: 55 }}
                options={dataLocation.map((location) => location.name)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    InputProps={{
                      ...params.InputProps,
                      style: { height: 55 },
                    }}
                  />
                )}
              />
              <Autocomplete
                id="location-district"
                onInputChange={(event, newInputValue) => {
                  setDistrict(newInputValue);
                  setAddress(newInputValue + ", " + location + ", Vietnam");
                }}
                defaultValue="Quận 1"
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

          <PostJobMap address={address} setMap={setMap} />

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
          {/* <FTextField name="imageUrl" label="Image Link" />
           */}
          {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}
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
          Post
        </LoadingButton>
      </FormProvider>
    </Container>
  );
};

export default PostJob;
