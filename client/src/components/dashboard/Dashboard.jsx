import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import "./Dashboard.css";


const Dashboard = () => {
  const isNonMobile = useMediaQuery("(min-width: 6s00px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className="app">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="180px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="content">
        <Topbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* <Users/> */}
      </main>
    </div>
  );
};

export default Dashboard;
