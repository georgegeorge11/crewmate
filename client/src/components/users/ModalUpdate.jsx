import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import * as yup from "yup";


const userSchema = yup.object().shape({
  fullName: yup.string().required("required"),
  username: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  phoneNumber: yup.number().required("required"),
});



const ModalUpdate = ({ children, updateModal, setModalOpen, id, userData }) => {
  const token = useSelector((state) => state.token);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const initialeValuesUpdate = {
    fullName: userData.fullName,
    username: userData.username,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  };


  const updateUserDetails = async (values, onSubmitProps) => {
    axios({
      method: "PUT",
      url: `http://localhost:3001/users/${id}`,
      data: values,
      headers: { Authorization: `Bearer ${token}` },

    }).then((response) => {
      const savedUser = response.data;
      console.log(savedUser);
      onSubmitProps.resetForm();
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleUpdateUser = async (values, onSubmitProps) => {
    await updateUserDetails(values, onSubmitProps);
  }




  return (
    <Formik
      onSubmit={handleUpdateUser}
      initialValues={initialeValuesUpdate}
      validationSchema={userSchema}
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

            </>
          </Box>
          <Box>
            <Button
              type="submit"
              onClick={handleModalClose}
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#00D5FA",
                color: "#1A1A1A",
                "&:hover": "#00D5FA",
                width: "100%",
              }}
            >
              Update user & close
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default ModalUpdate;
