import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { LoadingButton } from "@mui/lab";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("password is required"),
  passwordConfirmation: Yup.string()
    .required("please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValues = {
  email: "",
  password: "",
  name: "",
  passwordConfirmation: "",
};

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => navigate("/"));
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };
  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ marginBottom: 3 }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message} </Alert>
          )}
          <Alert severity="info">
            Already have an account?{" "}
            <Link variant="subtitle2" to="/login">
              Sign in
            </Link>
          </Alert>
          <FTextField name="name" label="Name" />
          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            autoComplete="on"
            type={showPassword ? "string" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirmation"
            label="Password Confirmation"
            autoComplete="on"
            type={showPasswordConfirmation ? "string" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </FormProvider>
    </Container>
  );
};

export default RegisterPage;
