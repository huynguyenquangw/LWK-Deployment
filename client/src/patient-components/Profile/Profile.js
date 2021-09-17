import React, { useContext } from 'react'
import ProfilePicture from './ProfilePicture'
import PersonalInfo from './PersonalInfo'
import HomeAddress from './HomeAddress'
import { Container, Row, Header } from '../../css-template/DashboardMain'
import { GlobalState } from '../../GlobalState';
import { toast } from 'react-toastify';

function Profile(props) {
    const state = useContext(GlobalState)
    const [info] = state.patientAPI.info
    const [token] = state.token
    const [callback, setCallback] = state.patientAPI.callback
    const [loading, setLoading] = state.loading

    const updateInfo = async (e) => {
        e.preventDefault()
        try {
            setLoading(!loading)
            await fetch("http://localhost:3000/user/update", {
                method: 'PUT',
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": document.getElementById("name").value,
                    "district": {
                        "_id": document.getElementById("district").value,
                    },
                    "phone": document.getElementById("phone").value,
                    img: info.img
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    toast(data.msg)
                    setLoading(false)
                })
                .then(setCallback(!callback))
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    return (
        <Container>
            <Row>
                <Header>PROFILE PICTURE</Header>
                <ProfilePicture setLoading={setLoading} info={info} token={token} callback={callback} setCallback={setCallback} />
            </Row>
            <Row>
                <Header>PERSONAL INFORMATION</Header>
                <PersonalInfo setLoading={setLoading} info={info} />
            </Row>
            <Row>
                <Header>HOME ADDRESS</Header>
                <HomeAddress setLoading={setLoading} info={info} />
            </Row>
            <Row>
                <button className="button green" onClick={updateInfo}>Save</button>
            </Row>
        </Container>
    )
}

export default Profile
