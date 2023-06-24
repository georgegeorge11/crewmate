import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Grid, Header, List } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './calendar.css';

const localizer = momentLocalizer(moment);

const CalendarProject = () => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const getProjects = async () => {
    axios({
      method: 'GET',
      url: `http://localhost:5000/projects/userProject/${user._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((err) => console.log(err));
  };

  const getTasks = async () => {
    axios({
      method: 'GET',
      url: `http://localhost:5000/tasks/userTask/${user._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProjects();
    getTasks();
    // eslint-disable-next-line
  }, []);

  const handleProjectClick = (projectId) => {
    const selected = projects.find((project) => project._id === projectId);
    setSelectedProject(selected);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '';
    if (event.task) {
      backgroundColor = '#FFD700'; // Set a different color for tasks
    } else {
      backgroundColor = '#1976D2'; // Set the default color for projects
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };

  const events = [
    ...projects.map((project) => ({
      id: project._id,
      title: project.name,
      start: new Date(project.startDate),
      end: project.endDate ? new Date(project.endDate) : null,
      task: false, // Flag to distinguish projects from tasks
    })),
    ...tasks.map((task) => ({
      id: task._id,
      title: task.title,
      start: Date.now(),
      end: task.dueDate ? new Date(task.dueDate) : null,
      task: true, // Flag to distinguish tasks from projects
    })),
  ];

  return (
    <Grid style={{ marginLeft: '9rem' }}>
      <Grid.Row style={{ display: 'flex', gap: '40px', marginLeft: '1em', marginTop: '3em' }}>
        <List divided relaxed>
          <Header as="h1">Your projects</Header>
          {projects.map((project) => (
            <List.Item key={project._id} onClick={() => handleProjectClick(project._id)}>
              <List.Icon name="folder" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{project.name}</List.Header>
              </List.Content>
            </List.Item>
          ))}
          <Header as="h1">Your Tasks</Header>
          {tasks.map((task) => (
            <List.Item key={task._id}>
              <List.Icon name="tasks" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>{task.title}</List.Header>
              </List.Content>
            </List.Item>
          ))}
        </List>

        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          style={{
            height: '850px',
            width: '85%',
            margin: '0 auto',
            boxShadow: '0 10px 4px rgba(2, 2, 2, 0.5)',
            borderRadius: '10px',
            padding: '30px',
          }}
          eventPropGetter={eventStyleGetter} // Apply different colors to events
        />
      </Grid.Row>
    </Grid>
  );
};

export default CalendarProject;
