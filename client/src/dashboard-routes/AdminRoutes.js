import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../Layout'
import AdminSidebarItems from '../sidebar/AdminSidebarItems'

function PatientRoutes() {
    const AllRoute = []

    for (let i = 0; i < AdminSidebarItems.length; i++) {
        AllRoute.push(<Route key={AdminSidebarItems[i].icon} path={AdminSidebarItems[i].link} exact component={AdminSidebarItems[i].component} />)
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
