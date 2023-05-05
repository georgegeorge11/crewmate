import { useState, useEffect } from "react";
import * as React from "react";
import {
  Box,
  useTheme,
  Grid,
  Paper,
  styled,
  Typography,
  IconButton,
  Popover,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";
import FlexBetween from "../shared/FlexBetween";
import axios from "axios";
import { useSelector } from "react-redux";
import { AddCircleOutlineOutlined, MoreHoriz, ArticleOutlined } from '@mui/icons-material';
import Header from "../shared/Header";
import TeamForm from "./TeamForm";

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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#1A2027',
    padding: theme.spacing(1),
    textAlign: 'center',
    height: '230px',
    width: '230px',
    borderRadius: '15px'
}));

const TeamsContent = () => {
  const [teams, setTeams] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setModalOpen] = React.useState(false);
  const theme = useTheme();
  const token = useSelector((state) => state.token);
 // const user = useSelector((state) => state.user);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const getData = async () => {
    axios({
      method: 'get',
      url: `http://localhost:3001/teams`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setTeams(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Header title="Teams" />
      <FlexBetween >
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Item sx={{ textAlign: "center" }}>
              <IconButton sx={{ marginTop: "45px" }} onClick={handleModalOpen}>
                <AddCircleOutlineOutlined
                  sx={{
                    fontSize: "36px",
                    color: theme.palette.primary.main,
                  }}
                />
              </IconButton>
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
                      Create a new team
                    </Typography>
                    <TeamForm
                      id="transition-modal-description"
                      sx={{ mt: 3, marginTop: "10px" }}
                      openModal={openModal}
                      setModalOpen={setModalOpen}
                    />
                  </Box>
                </Fade>
              </Modal>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={theme.palette.primary.main}
              >
                Add New Team
              </Typography>
            </Item>
          </Grid>
          {teams &&
            teams.map((project) => (
              <Grid item xs={2} key={project._id}>
                <Item>
                  <FlexBetween>
                    <div color="green" borderradius="50%">
                      <IconButton sx={{ color: "green" }}>
                        <ArticleOutlined fontSize="15px" />
                      </IconButton>
                    </div>
                    <div>
                      <IconButton
                        sx={{ top: "0px" }}
                        onClick={handlePopoverClick}
                      >
                        <MoreHoriz sx={{ fontSize: "25px" }} />
                      </IconButton>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          The content of the Popover.
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          The content of the Popover.
                        </Typography>
                        <Typography sx={{ p: 2 }}>
                          The content of the Popover.
                        </Typography>
                      </Popover>
                    </div>
                  </FlexBetween>
                  <Box
                    sx={{
                      color: theme.palette.mode === "dark" ? "#fff" : "black",
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {project.title}
                    </Typography>
                  </Box>
                  <Box>{project.description}</Box>
                  <Box
                    sx={{
                      color: theme.palette.mode === "dark" ? "#fff" : "black",
                      marginTop: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Task Done: 2/5
                  </Box>
                </Item>
              </Grid>
            ))}
        </Grid>
      </FlexBetween>
    </>
  );
};

export default TeamsContent;
