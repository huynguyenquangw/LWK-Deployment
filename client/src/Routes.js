import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './home-components/HomePage';
import Register from './home-components/Register';
import PatientRoutes from './dashboard-routes/PatientRoutes';
import DoctorRoutes from './dashboard-routes/DoctorRoutes';
import AdminRoutes from './dashboard-routes/AdminRoutes'
import LoginPortal from './home-components/LoginPortal';
import LoginPatient from './home-components/LoginPatient';
import LoginDoctor from './home-components/LoginDoctor';
// import LoginAdmin from './home-components/LoginAdmin'

import { useContext } from 'react';
import { GlobalState } from './GlobalState'
import NotFound from './NotFound'
import Loading from './Loading';

function Routes() {
  const state = useContext(GlobalState)
  const [loading] = state.loading
  const [admin] = state.patientAPI.admin
  const [patient] = state.patientAPI.patient
  const [doctor] = state.doctorAPI.doctor

  return (
    <Router>
      <div>
        {loading && <Loading />}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login-portal">
            <LoginPortal />
          </Route>
          <Route path="/login-patient">
            <LoginPatient />
          </Route>
          <Route path="/login-doctor">
            <LoginDoctor />
          </Route>
          {/* <Route path="/admin-login">
            <LoginAdmin />
          </Route> */}
          <Route path="/patient">
            {patient ? <PatientRoutes /> : <NotFound />}
          </Route>
          <Route path="/doctor">
            {doctor ? <DoctorRoutes /> : <NotFound />}
          </Route>
          <Route path="/admin">
            {admin ? <AdminRoutes /> : <NotFound />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default Routes
