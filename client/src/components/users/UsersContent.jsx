import Header from "../shared/Header";

import React, { useEffect, useState } from "react";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Fade,
  Backdrop,
  Tooltip,
} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import axios from "axios";
import UsersForm from "./UsersForm";
import { useDemoData } from "@mui/x-data-grid-generator";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 2,
  p: 4,
};

const UsersContent = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.token);
  const [openModal, setModalOpen] = useState(false);
  const { data } = useDemoData({
    dataSet: "Commodity",
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    getData();
  };
  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      type: "string",
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "role",
      headerName: "Role",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="50%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={role === "admin" ? "#3da58a" : "#2e7c67"}
            borderRadius="4px"
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography color="#e0e0e0" sx={{ ml: "5px" }}>
              {role}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "operations",
      headerName: "Operations",
      headerAlign: "center",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
          >
            <Box
              width="30%"
              m="0 auto"
              p="5px"
              display="flex"
              backgroundColor="white"
              borderRadius="4px"
            >
              <Typography color="primary" sx={{ ml: "15px" }}>
                Edit
              </Typography>
            </Box>
            <Box
              width="30%"
              m="0 auto"
              p="5px"
              display="flex"
              backgroundColor="red"
              borderRadius="4px"
            >
              <Typography color="white" sx={{ ml: "15px" }}>
                Delete
              </Typography>
            </Box>
          </Box>
        );
      },
    },
  ];

  const getData = async () => {
    axios({
      method: "get",
      url: "http://localhost:3001/users",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header title="Users" />

        <Tooltip
          title={
            <Typography sx={{ fontSize: "14px" }}>Add new user</Typography>
          }
        >
          <IconButton onClick={handleModalOpen}>
            <PersonAddAltIcon sx={{ width: "40px", height: "40px" }} />
          </IconButton>
        </Tooltip>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h4"
                component="h2"
                sx={{ marginBottom: "20px" }}
              >
                Create a new user
              </Typography>
              <UsersForm
                id="transition-modal-description"
                sx={{ mt: 3, marginTop: "10px" }}
                openModal={openModal}
                setModalOpen={setModalOpen}
                handleModalClose={handleModalClose}
              />
            </Box>
          </Fade>
        </Modal>
      </Box>
      <Box
        m="40px 0 0 0"
        height="66vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            backgroundColor: "#1A1A1A",
            width: "100px",
          },
          "& .name-column--cell": {
            color: "#94e2cd",
            fontSize: "18px",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#3e4396",
            borderBottom: "none",

            color: "white",
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: "#b7ebde !important",
          },
        }}
      >
        <DataGrid
          checkboxSelection
          {...data}
          initialState={{
            ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          rows={users?.map((user) => ({ id: user._id, ...user }))}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default UsersContent;
