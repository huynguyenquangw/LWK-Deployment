import React, { createContext, useState, useEffect } from 'react'
import DistrictAPI from './api/API'
import PatientAPI from './api/PatientAPI'
import DoctorAPI from './api/DoctorAPI'
import GetAllPatient from './api/GetAllPatient'
import GetAllDoctor from './api/GetAllDoctor'
import GetHealthDeclareForDoctor from './api/GetHealthDeclareForDoctor'
import GetHealthDeclareForPatient from './api/GetHealthDeclareForPatient'


export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false)
    const [doctorToken, setDoctorToken] = useState(false)
    const [loading, setLoading] = useState(false)

    const getrf = async () => {
        await fetch("http://localhost:3000/user/refresh_token", {
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(data => {
                setToken(data.accesstoken)
            })
    }

    const getDoctorRf = async () => {
        await fetch("http://localhost:3000/doctor/refresh_token", {
            credentials: 'include'
        })
            .then(resp => resp.json())
            .then(data => {
                setDoctorToken(data.accessToken)
            })
    }

    useEffect(() => {
        if (localStorage.getItem('isLogin')) {
            getrf()
        }
        if (localStorage.getItem('isDoctorLogin')) {
            getDoctorRf()
        }
    }, [])


    const state = {
        token: [token, setToken],
        loading: [loading, setLoading],
        doctorToken: [doctorToken, setDoctorToken],
        districtAPI: DistrictAPI(),
        patientAPI: PatientAPI(token),
        doctorAPI: DoctorAPI(doctorToken),
        getAllPatientAPI: GetAllPatient(),
        getAllDoctorAPI: GetAllDoctor(),
        getHealthDeclareForDoctor: GetHealthDeclareForDoctor(doctorToken),
        getHealthDeclareForPatient: GetHealthDeclareForPatient(token)
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
