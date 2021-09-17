import React from 'react'
import { useContext } from 'react/cjs/react.development'
import Chat from '../../chat/Chat'
import { GlobalState } from '../../GlobalState'


function DoctorChat(props) {
    const state = useContext(GlobalState)
    const [patientInfo] = state.patientAPI.info
    const [isPatient] = state.patientAPI.patient

    return (
        <div>
            <Chat isPatient={isPatient} patientInfo={patientInfo} />
        </div>
    )
}

export default DoctorChat
