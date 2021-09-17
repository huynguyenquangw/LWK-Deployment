import React, { useContext } from 'react'
import ProfilePicture from './ProfilePicture'
import Certificate from './Certificate'
import PersonalInfo from './PersonalInfo'
import Location from './Location'
import { Container, Row, Header } from '../../css-template/DashboardMain'
import { GlobalState } from '../../GlobalState'
import { toast } from 'react-toastify';


function Profile(props) {
    const state = useContext(GlobalState)
    const [doctorInfo] = state.doctorAPI.doctorInfo
    const [doctorToken] = state.doctorToken
    const [callbackDoctor, setCallbackDoctor] = state.doctorAPI.callbackDoctor
    const [loading, setLoading] = state.loading

    const updateInfo = async (e) => {
        e.preventDefault()
        setLoading(!loading)
        await fetch("http://localhost:3000/doctor/update", {
            method: 'PUT',
            headers: {
                "Authorization": doctorToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": document.getElementById("name").value,
                "district": {
                    "_id": document.getElementById("district").value,
                },
                "phone": document.getElementById("phone").value,
                "experience": document.getElementById("experience").value
            })
        })
            .then(resp => resp.json())
            .then(data => {
                toast(data.msg)
            })
            .then(setCallbackDoctor(!callbackDoctor))
        setLoading(false)
    }

    return (
        <Container>
            <Row>
                <Header>PROFILE PICTURE</Header>
                <ProfilePicture setLoading={setLoading} doctorInfo={doctorInfo} doctorToken={doctorToken} callbackDoctor={callbackDoctor} setCallbackDoctor={setCallbackDoctor} />
            </Row>
            <Row>
                <Header>PERSONAL INFORMATION</Header>
                <PersonalInfo doctorInfo={doctorInfo} />
            </Row>
            <Row>
                <Header>CERTIFICATE</Header>
                <Certificate setLoading={setLoading} doctorInfo={doctorInfo} doctorToken={doctorToken} callbackDoctor={callbackDoctor} setCallbackDoctor={setCallbackDoctor} />
            </Row>
            <Row>
                <Header>ASSIGNED LOCATION</Header>
                <Location doctorInfo={doctorInfo} />
            </Row>
            <Row>
                <button className="button green " onClick={updateInfo}>Save</button>
            </Row>
        </Container>
    )
}

export default Profile
