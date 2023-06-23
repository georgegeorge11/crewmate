import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Grid, Header, List } from 'semantic-ui-react'
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

    const getProjects = async () => {
        axios({
            method: 'GET',
            url: `http://localhost:5000/projects/userProject/${user._id}`,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            setProjects(response.data);
        })
            .catch((err) => console.log(err));
    }
    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, []);
    const handleProjectClick = (projectId) => {
        const selected = projects.find((project) => project._id === projectId);
        setSelectedProject(selected);
    };

    return (
        <Grid style={{ marginLeft: '9rem' }}>
            <Grid.Row style={{ display: 'flex', gap: '40px', marginLeft: '1em', marginTop: '3em' }}>
                <List divided relaxed>
                    <Header as='h1'>Your projects</Header>
                    {projects.map((project) => (
                        <List.Item key={project._id} onClick={() => handleProjectClick(project._id)}>
                            <List.Icon name="folder" size="large" verticalAlign="middle" />
                            <List.Content>
                                <List.Header>{project.name}</List.Header>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>


                <Calendar
                    localizer={localizer}
                    events={
                        selectedProject
                            ? [
                                {
                                    id: selectedProject._id,
                                    title: selectedProject.name,
                                    start: new Date(selectedProject.startDate),
                                    end: selectedProject.endDate ? new Date(selectedProject.endDate) : null,
                                },
                            ]
                            : projects.map((project) => ({
                                id: project._id,
                                title: project.name,
                                start: new Date(project.startDate),
                                end: project.endDate ? new Date(project.endDate) : null,
                            }))
                    }
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

                />


            </Grid.Row>
        </Grid>
    );

}

export default CalendarProject;