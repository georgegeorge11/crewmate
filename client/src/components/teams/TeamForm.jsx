
import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";

import axios from "axios";
import { useSelector } from "react-redux";

const projectSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
});

const initialValuesProject = {
  title: "",
  description: "",
};

const TeamForm = ({ children, openModal, setModalOpen }) => {

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const project = async (values, onSubmitProps) => {
    // this allows us to send form data with image
    axios
      .post(
        "http://localhost:3001/teams",
        {
          title: values.title,
          description: values.description,
          creator: user._id,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        const savedProject = response.data;
        onSubmitProps.resetForm();
        console.log(savedProject);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
     await project(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesProject}
      validationSchema={projectSchema}
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
                label="Project Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={Boolean(touched.title) && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Project Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </>
          </Box>

          {/* Submit Button */}
          <Box>
          <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "#00D5FA",
                color: "#1A1A1A",
                "&:hover": { color: "#00D5FA" },
              }}
              onClick={() => {
                setModalOpen(!openModal);
              }}
            >
              Create Team
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default TeamForm;
