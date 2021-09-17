import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../Layout'
import PatientSidebarItems from '../sidebar/PatientSidebarItems'

function PatientRoutes() {
    const AllRoute = []

    for (let i = 0; i < PatientSidebarItems.length; i++) {
        AllRoute.push(<Route key={PatientSidebarItems[i].title} path={PatientSidebarItems[i].link} exact component={PatientSidebarItems[i].component} />)
    }

    return (
        <Route render={(props) => (
            <Layout {...props}>
                <Switch>
                    {AllRoute}
                </Switch>
            </Layout>
        )} />
    )
}

export default PatientRoutes
