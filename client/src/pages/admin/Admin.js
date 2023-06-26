import React from 'react'
import ManageUsers from './ManageUsers'
import { Grid, Header } from 'semantic-ui-react'

const Admin = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header as='h1' textAlign='center' style={{ marginTop: '1em' }}>CREWMATE</Header>

            <Grid style={{ margin: '1rem' }}>
                <Grid.Row>
                    <ManageUsers />
                </Grid.Row>

            </Grid>

        </div>
    )
}

export default Admin

