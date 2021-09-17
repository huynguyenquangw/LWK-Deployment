import { useState, useEffect } from 'react'
import axios from 'axios'

function PatientAPI(token) {
    const [admin, setAdmin] = useState(false)
    const [patient, setPatient] = useState(false)
    const [callback, setCallback] = useState(false)
    const [info, setInfo] = useState([])

    const getInfo = async () => {
        // try {
        const response = await axios.get(`http://localhost:3000/user/info`, {
            headers: {
                Authorization: token
            }
        })
        setInfo(response.data)
        if (response.data.role === 1) {
            setAdmin(true)
        }
        if (response.data.role === 0) {
            setPatient(true)
        }
        // } catch (error) {
        //     console.log(error.response.data.msg)
        // }
    }

    useEffect(() => {
        if (token) {
            getInfo()
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, callback])

    return {
        info: [info, setInfo],
        callback: [callback, setCallback],
        admin: [admin, setAdmin],
        patient: [patient, setPatient]
    }
}

export default PatientAPI


