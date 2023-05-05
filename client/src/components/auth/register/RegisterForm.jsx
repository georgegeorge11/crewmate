import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import axios from "axios";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  phoneNumber: yup.number().required("required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "passwords must match")
    .required("required"),
});

const initialeValuesRegister = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  phoneNumber: "",
  confirmPassword: "",
};

const RegisterFrom = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const register = async (values, onSubmitProps) => {
    axios
      .post("http://localhost:3001/register", {
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      })
      .then((response) => {
        const savedUser = response.data;
        onSubmitProps.resetForm();
        console.log(savedUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = async (values, onSubmitProps) => {
    await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleRegister}
      initialValues={initialeValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minxmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <>
              <TextField
                label="Fullname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fullName}
                name="fullName"
                error={Boolean(touched.fullName) && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={Boolean(touched.username) && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Phone number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNumber}
                name="phoneNumber"
                error={
                  Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                }
                helperText={touched.phoneNumber && errors.phoneNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                type="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                type="password"
                error={
                  Boolean(touched.confirmPassword) &&
                  Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />
            </>
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#00D5FA",
                color: "#1A1A1A",
                "&:hover": "#00D5FA",
              }}
            >
             
              Login
            </Button>
            <Typography
              sx={{
                color: "",
                "&:hover": {
                  cursor: "pointer",
                  color: "",
                },
              }}
               variant="h6"
            >
              Already have an account ? <Link to="/login">Login here</Link>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegisterFrom;
