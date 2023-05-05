import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
} from "@mui/material";

import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {setLogin} from "../../state"

const loginSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (values, onSubmitProps) => {
    axios
      .post("http://localhost:3001/login", {
        username: values.username,
        password: values.password,
      })
      .then((response) => {
        const loggedInResponse = response.data;
        const role = loggedInResponse.user.role;
        console.log(role);
        console.log(loggedInResponse.user.fullName);
        onSubmitProps.resetForm();
        if (loggedInResponse) {
          dispatch(
            setLogin({
              
              user: loggedInResponse.user,
              token: loggedInResponse.token,
            })

          );
        }
        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "user") {
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogin = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleLogin}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
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
            gridTemplateColumns="repeat(2, minxmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.username}
              name="username"
              error={Boolean(touched.username) && Boolean(errors.username)}
              helperText={touched.username && errors.username}
              sx={{ gridColumn: "span 4" }}
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
              Don't have an account ? <Link to="/register">Register here</Link>
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
