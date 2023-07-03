import React from 'react'
import ManageUsers from './ManageUsers'
import { Grid } from 'semantic-ui-react'

const Admin = () => {
    return (
        <Grid style={{ marginLeft: '9rem' }}>
            <Grid.Row style={{ marginTop: '2rem' }}>
                <ManageUsers />
            </Grid.Row>
        </Grid>
    )
}

export default Admin

