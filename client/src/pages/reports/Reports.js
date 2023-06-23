import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PieChartStatus from '../../components/stats/PieChartStatus';
import PieChartPriority from '../../components/stats/PieChartPriority';



const Reports = () => {


    return (
        <Grid style={{ marginLeft: '9rem' }}>
            <Grid.Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3em', marginLeft: '1em', marginRight: '5em' }}>
                <Header as="h1">Task Statistics</Header>

            </Grid.Row>
            <Grid.Row>
                <PieChartStatus />
                <PieChartPriority />
            </Grid.Row>
        </Grid>
    );
};

export default Reports;
