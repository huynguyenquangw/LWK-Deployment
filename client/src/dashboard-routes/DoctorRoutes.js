import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../Layout'
import { GlobalState } from '../GlobalState'
import DoctorSidebarItems from '../sidebar/DoctorSidebarItems'
import Chat from '../chat/Chat'

function PatientRoutes() {
    const state = useContext(GlobalState)
    const [doctorInfo] = state.doctorAPI.doctorInfo
    const [isDoctor] = state.doctorAPI.doctor

    const AllRoute = []

    if (DoctorSidebarItems && DoctorSidebarItems.length > 0) {
        for (let i = 0; i < DoctorSidebarItems.length; i++) {
            AllRoute.push(<Route key={DoctorSidebarItems[i].icon} path={DoctorSidebarItems[i].link} exact component={DoctorSidebarItems[i].component} />)
        }
    }


    return (

        <Route render={(props) => (
            <Layout {...props}>
                <Chat isDoctor={isDoctor} doctorInfo={doctorInfo} />
                <Switch>
                    {AllRoute}
                </Switch>
            </Layout>
        )} />
    )
}

export default PatientRoutes
