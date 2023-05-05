import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupsIcon from "@mui/icons-material/Groups";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskIcon from '@mui/icons-material/Task';
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useLocation,useNavigate } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const Items = [
  {
    text: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    text: "Projects",
    icon: <AssignmentIcon />,
  },
  {
    text: "Tasks",
    icon: <TaskIcon />,
  },
  {
    text: "Teams",
    icon: <GroupsIcon />,
  },
  {
    text: "Users",
    icon: <PeopleIcon />,
  },
  {
    text: "Inbox",
    icon: <InboxIcon />,
  },
  {
    text: "Calendar",
    icon: <CalendarMonthIcon />,
  },
  {
    text: "Reports",
    icon: <AssessmentIcon />,
  },
  
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: "#3DA58A",
              backgroundColor: "#3E4396",
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 1rem">
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h5" fontSize="30px" fontWeight="bold">
                  CrewMate
                </Typography>
              </Box>
            </Box>
            <List>
              {Items.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{
                        m: "2.25rem 1rem 1rem 4rem",
                      }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        //
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText ? "#1F2A40" : "transparent",
                        color: active === lcText ? "white" : "white",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "0",
                          color: active === lcText ? "white" : "white",
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
