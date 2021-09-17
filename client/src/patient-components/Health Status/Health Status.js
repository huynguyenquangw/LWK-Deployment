
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Container, Row, Header } from '../../css-template/DashboardMain'
import { Container as Form, CheckboxField, TextAreaField, FieldBig } from "../../css-template/Input"
import { GlobalState } from '../../GlobalState';
import { toast } from 'react-toastify';

function HealthStatus(props) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [loading, setLoading] = state.loading
    const [info] = state.patientAPI.info
    const [data] = state.getAllDoctorAPI.doctors
    const [limit, setLimit] = state.getAllDoctorAPI.limit
    const [callback, setCallBack] = state.getHealthDeclareForPatient.callback

    const [selectedDoctor, setSelectedDoctor] = useState("")

    useEffect(() => {
        setLimit(limit * 9999999)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [health, setHealth] = useState({
        covid: false,
        vaccinated: false,
        fever: false,
        cough: false,
        breathing: false,
        sorethroat: false,
        phlegm: false,
        runnynose: false,
        tiredness: false,
        blocknose: false,
        losssmell: false,
        musclepain: false,
        othersymptoms: ''
    })
    const headings = [
        "Tested positive",
        "Vaccinated",
        "Fever",
        "Cough",
        "Breathing difficulties",
        "Sorethroat",
        "Phlegm",
        "Runny nose",
        "Tiredness",
        "Blocked nose",
        "Smell loss",
        "Muscle Pain"
    ]

    const render = []

    const onChangeCheck = e => {
        const { name, checked } = e.target
        setHealth({ ...health, [name]: checked })
    }

    const onChange = e => {
        setHealth({ ...health, othersymptoms: e.target.value })
    }

    const onChangeDoctor = e => {
        setSelectedDoctor(e.target.value)
        console.log(selectedDoctor)
    }

    const keys = Object.keys(health)
    var i = 0
    for (var e = 0; e < keys.length - 1; e++) {
        render.push(
            <CheckboxField>
                <h2>{headings[i]}</h2>
                <input name={[keys[e]]} id={[keys[e]]} type="checkbox"
                    checked={health[keys[e]]} onChange={onChangeCheck}></input>
            </CheckboxField>
        )
        i += 1
    }

    const updateHealthDeclaration = async (e) => {
        e.preventDefault()
        try {
            setLoading(!loading)
            await axios.post("http://localhost:3000/health/add", {
                ...health,
                user_id: info._id,
                doctor_id: selectedDoctor
            }, {
                headers: {
                    Authorization: token
                },
            })
            toast('Health Declaration has been created.')
            setCallBack(!callback)
            setLoading(false)
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Header>Your Health Status</Header>
                    <Form>
                        <FieldBig style={{ flexBasis: "100%" }}>
                            <label htmlFor="doctor">Doctor in {info.district.name}</label>
                            <select id="doctor" value={selectedDoctor} onChange={onChangeDoctor}>
                                <option value="">Please select doctor</option>
                                {data.map(i =>
                                    i.district?._id == info.district?._id ?
                                        <option className="doctor-option" value={i._id}>
                                            {i.name}
                                        </option> : ""
                                )}
                            </select>
                        </FieldBig>
                        {render}
                        <TextAreaField>
                            <h2>Other Symptoms</h2>
                            <textarea name="other" id="other" onChange={onChange}>

                            </textarea>
                        </TextAreaField>
                    </Form>
                    <button className="button green " onClick={updateHealthDeclaration}>Save</button>
                </Row>
            </Container>
        </div>
    )
}
export default HealthStatus
