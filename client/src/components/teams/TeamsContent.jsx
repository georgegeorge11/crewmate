import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../shared/Header";
import { Modal, Button, Text, Input, Card } from "@nextui-org/react";
import axios from "axios";
import './teams.css';

const TeamsContent = () => {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState([]);
  const [admin, setAdmin] = useState({});

  const createNewTeam = async () => {
    axios({
      method: "post",
      url: "http://localhost:3001/teams",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        name: title,
        description: description,
        admin: user._id,
        teamMembers: [user._id]
      }
    }
    ).then((response) => {
      const newTeam = response.data;
      console.log(newTeam);
    }).catch((error) => console.log(error))
  };

  const closeHandler = async () => {
    setVisible(false);
    await createNewTeam();
    getTeams();
  };

  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);


  const getUser = async (e) => {
    axios({
      method: "get",
      url: `http://localhost:3001/users/${e}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setAdmin(response.data);

      })
      .catch((err) => console.log(err));
  }

  const getTeams = async () => {
    axios({
      method: "GET",
      url: "http://localhost:3001/teams",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        const teamsData = response.data;

        setTeams(teamsData);
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    getTeams();


  });

  return (
    <>
      <Header title="Teams" />
      <Button auto shadow onPress={handler}>
        Create a new team
      </Button>
      <Modal
        closeButton
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}

      >
        <Modal.Header>
          <Text id="modal-title" size={22}>
            Create a new team
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            value={title}
            color="primary"
            size="lg"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}

          />
          <Input
            clearable
            bordered
            value={description}
            color="primary"
            size="lg"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={closeHandler}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="teams">
        {teams.map((team) => {



          return <Card key={team._id} css={{
            width: "250px",
            height: "auto",
            margin: "20px"
          }}>
            <Card.Body >
              <Text>Team name: {team.name}</Text>
              <Text>Description: {team.description}</Text>


              <Text>Admin: {team.admin}</Text>
              <Text>Members: {team.teamMembers}</Text>
              <Button
                shadow color="primary" auto
                css={{
                  width: "100px",
                  alignSelf: "center",
                  display: "flex",
                  justifyContent: "center",
                  
                }}>
                Join team
              </Button>
            </Card.Body>
          </Card>
        })}
      </div>

    </>
  );
};

export default TeamsContent;
