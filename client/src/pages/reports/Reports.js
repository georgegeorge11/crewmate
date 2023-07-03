import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PieChartStatus from '../../components/stats/PieChartStatus';
import PieChartPriority from '../../components/stats/PieChartPriority';
import { useSelector } from 'react-redux';
import PieChartTasksStatus from '../../components/stats/adminStats/PieChartTasksStatus';
import PieChartTasksPriority from '../../components/stats/adminStats/PieChartTasksPriority';



const Reports = () => {
    const user = useSelector((state) => state.user);

    return (
        <Grid style={{ marginLeft: '9rem' }}>
            <Grid.Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3em', marginLeft: '1em', marginRight: '5em' }}>
                <Header as="h1">Task Statistics</Header>

            </Grid.Row>
            {user.role === "admin" ?
                <Grid.Row >
                    <PieChartTasksStatus />
                    <PieChartTasksPriority />
                </Grid.Row>

                : <Grid.Row>
                    <PieChartStatus />
                    <PieChartPriority />
                </Grid.Row>
            }
        </Grid >
    );
};

export default Reports;
