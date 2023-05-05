import { Box, Typography } from '@mui/material'
import React from 'react'

const Header = ({title, subtitle}) => {
  return (
    <Box >
        <Typography
         variant="h2"
          color="#1A1A1A"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}>
            {title}
          </Typography>
          <Typography variant="h5" color="#00A0BC">
          {subtitle}
        </Typography>
    </Box>
  )
}

export default Header;