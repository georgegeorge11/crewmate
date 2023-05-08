import Header from "../shared/Header";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Row, Col, Tooltip, Button } from "@nextui-org/react";

import { IconButton } from "./IconButton";

import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import UsersForm from "./UsersForm";


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
    
  });

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    getData();
  };

 
  const deleteUser = (e) =>{
   
    axios({
      method: "delete",
      url: `http://localhost:3001/users/${e}`,
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
        getData();
       console.log(response);
      })
    .catch((err) => console.log(err));
  }

 

  const columns = [
    { name: "Name", uid: "fullName" },
    { name: "Username", uid: "username" },
    { name: "Email", uid: "email" },
    { name: "Phone Number", uid: "phoneNumber" },
    { name: "Role", uid: "role" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}></Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit user">
                <IconButton onClick={() => console.log(user._id)}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete user"
                color="error"
                onClick={() => deleteUser(user._id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };

  return (
    <div>
      <Header title="Users" />
      <Button auto shadow onPress={handleModalOpen} >
        Add user
      </Button>
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
      <Table
        bordered
        shadow={false}
        color="secondary"
        aria-label="Users table"
        css={{
         
          height: "auto",
          minWidth: "100%",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column
              key={column.uid}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </Table.Column>
          )}
        </Table.Header>
        <Table.Body items={users}>
          {users.map((user) => (
            <Table.Row key={user._id}>
              {(columnKey) => (
                <Table.Cell>{renderCell(user, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Pagination shadow noMargin align="center" rowsPerPage={10} />
      </Table>
    </div>
  );
};

export default UsersContent;
