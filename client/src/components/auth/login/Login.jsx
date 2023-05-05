import { Box, Typography, useMediaQuery} from "@mui/material";
import React from 'react'
import LoginForm from "./LoginForm";


const Login = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box  textAlign="center">
        <Typography fontWeight="bold" fontSize="48px" color="primary">
          CrewMate
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        textAlign="center"
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to CrewMate!
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login