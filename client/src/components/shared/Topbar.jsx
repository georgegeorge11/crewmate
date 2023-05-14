import React, { useState } from "react";
import {
  AppBar,
  Button,
  Toolbar,
  Menu,
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useMediaQuery,
} from "@mui/material";
import "./style.css";
import {
  Search,
  NotificationsOutlined,
  Menu as MenuIcon,
  Close,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {  setLogout } from "../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Topbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const neutralLight = "#333333";
  const dark = "#E0E0E0";
  
  const username = `${user.fullName}`;
  const role = `${user.role}`;
  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE of the NavBar  */}
        <FlexBetween padding="1rem 15%">
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={dark}
              borderRadius="9px"
              gap="3rem"
              padding="0.1rem 1.5rem"
            >
              <InputBase placeholder="What are you looking for?" />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* DESKTOP NAV */}
        <FlexBetween>
          {isNonMobileScreens ? (
            <FlexBetween gap="2rem">
            <IconButton>
              <NotificationsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
              
              
              <FlexBetween>
                <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "1rem",
                  }}
                >
                  <Box
                    component="img"
                    alt="profile"
                    // src={profileImage}
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="1rem"
                      // sx={{ color: dark }}
                    >
                      {username}
                    </Typography>
                    <Typography fontSize="0.75rem" sx={{ color: "grey" }}>
                      {role}
                    </Typography>
                  </Box>
                  <ArrowDropDownOutlined
                    sx={{
                       color: "#66E6FC",
                      fontSize: "25px",
                    }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                  <MenuItem
                    onClick={() => {
                      dispatch(setLogout);
                      navigate("/");
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Menu>
              </FlexBetween>
            </FlexBetween>
          ) : (
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <MenuIcon />
            </IconButton>
          )}
        </FlexBetween>

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
             backgroundColor={neutralLight}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
            
            <IconButton>
              <NotificationsOutlined sx={{ fontSize: "25px" }} />
              </IconButton>
              <IconButton>
                <SettingsOutlined sx={{ fontSize: "25px" }} color="white" />
              </IconButton>
              <FormControl variant="standard" value={username}>
                <Select
                  value={username}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={username}>
                    <Typography>{username}</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      dispatch(setLogout());
                      navigate("/");
                    }}
                  >
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
