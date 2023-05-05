import React from "react";
import { Box, Typography, useMediaQuery} from "@mui/material";
import RegisterFrom from "./RegisterForm";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

 
  return (
    <Box>
      <Box  textAlign="center" backgroundColor="">
        <Typography fontWeight="bold" fontSize="48px" color="primary">
          CrewMate
        </Typography>
      </Box>
      <Box
        width={isNonMobile ? "50%" : "100%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }} textAlign="center" >
          Welcome to CrewMate register page!
        </Typography>
        <RegisterFrom/>
       
      </Box>
    </Box>
  );
};

export default Register;
