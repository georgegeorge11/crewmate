import React, { useEffect, useState } from 'react';

import { Dimmer, Grid, Header, Loader, Transition } from 'semantic-ui-react'
import { useSelector } from 'react-redux';
import TasksList from '../tasks/TaskList';
import TeamList from '../teams/TeamsList';
import ProjectList from '../projects/ProjectsList';
import PieChartStatus from '../../components/stats/PieChartStatus';
import PieChartPriority from '../../components/stats/PieChartPriority';
import PieChartTasksPriority from '../../components/stats/adminStats/PieChartTasksPriority';
import PieChartTasksStatus from '../../components/stats/adminStats/PieChartTasksStatus';
import TeamCards from '../../components/cards/teamCards';
import ProjectCards from '../../components/cards/projectCards';
import UserCards from '../../components/cards/userCards';




const Dashboard = () => {
    const [visible, setVisible] = useState(true);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        setTimeout(() => setVisible(true), 0)
    })

    if (!user) {
        return <Dimmer active inverted>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
    }

    return (

        <Grid style={{ marginLeft: '9rem' }}>
            {user.role === "admin" ? (
                <Grid style={{ marginTop: '2rem' }}>
                    <Grid.Row columns={5}>
                        <Grid.Column>
                            <TeamCards />
                        </Grid.Column>
                        <Grid.Column>
                            <ProjectCards />
                        </Grid.Column>
                        <Grid.Column>
                            <UserCards />
                        </Grid.Column>
                    </Grid.Row>
                    <Header as="h1">Task Statistics</Header>
                    <Grid.Row >
                        <PieChartTasksStatus />
                        <PieChartTasksPriority />
                    </Grid.Row>
                </Grid>
            ) : (
                <Grid>
                    <Grid.Row>
                        <Transition visible={visible} animation='scale' duration={1}>
                            <TasksList />
                        </Transition>
                        <Transition visible={visible} animation='scale' duration={1}>
                            <TeamList />
                        </Transition>
                        <Transition visible={visible} transitionOnMount={true} animation='scale' duration={1}>
                            <ProjectList />
                        </Transition>
                    </Grid.Row>
                    <Header as="h1">Task Statistics</Header>
                    <Grid.Row>
                        <PieChartStatus />
                        <PieChartPriority />
                    </Grid.Row>
                </Grid>
            )}
        </Grid>

    )
}

export default Dashboard