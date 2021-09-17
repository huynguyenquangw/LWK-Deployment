import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import { Container, Row, Header } from '../../css-template/DashboardMain'
import { Container as Form, TextAreaField, FieldBig } from "../../css-template/Input"
import { GlobalState } from '../../GlobalState'

const medicineState = {
    medicine: "",
    quantity: 0,
    frequency: ""
}

const initialState = {
    user_id: "",
    doctor_id: "",
    diagnostic: "",
    prescriptions: [],
    note: ""
}

function Prescriptioning() {
    const state = useContext(GlobalState)
    const [doctorToken] = state.doctorToken
    const [doctorInfo] = state.doctorAPI.doctorInfo
    const [patients] = state.getAllPatientAPI.patients
    const [limit, setLimit] = state.getAllPatientAPI.limit
    const [healthDeclares] = state.getHealthDeclareForDoctor.healths
    const [callback, setCallBack] = state.getHealthDeclareForDoctor.callback

    const [medicines, setMedicines] = useState([])

    const [prescriptionForm, setPrescriptionForm] = useState(initialState)
    const [prescriptionMedicine, setPrescriptionMedicine] = useState(medicineState)

    const param = useParams()

    const handleChange = e => {
        const { name, value } = e.target
        setPrescriptionForm({ ...prescriptionForm, [name]: value })
    }

    const handleChangeMedicine = e => {
        const { name, value } = e.target
        setPrescriptionMedicine({ ...prescriptionMedicine, [name]: value })
    }

    const handleKeyUp = e => {
        e.preventDefault()
        if (e.key === "Enter") {
            const { medicine, frequency, quantity } = prescriptionMedicine
            if (medicine !== "" && frequency !== "" && quantity > 0) {
                addNewMedicine()
            }
        }
    }

    //get all medicines
    const getMedicine = async (e) => {
        try {
            const response = await axios.get("http://localhost:3000/medicine")
            setMedicines(response.data)
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    //add new medicine
    const addNewMedicine = () => {
        setPrescriptionForm({ ...prescriptionForm, prescriptions: [...prescriptionForm.prescriptions, prescriptionMedicine] })
        setPrescriptionMedicine(medicineState);
    }

    const updateMedicine = async (data) => {
        try {
            if (param.id) {
                await axios.put(`http://localhost:3000/health/update/medicine/${param.id}`, {
                    medicineform_id: data,
                    status: true
                }, {
                    headers: { Authorization: doctorToken }
                })
                setCallBack(!callback)
                toast(`Prescriptions ID: ${data} has been transferred to Health Declaration ID: ${param.id}`)
            }
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    //save medicine form
    const saveMedicineForm = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3000/form', { ...prescriptionForm }, {
                headers: { Authorization: doctorToken }
            })
            updateMedicine(res.data.data._id)
            toast("New prescriptions created")

        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    useEffect(() => {
        setLimit(limit * 9999999)
        getMedicine()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (param.id) {
            healthDeclares.forEach(data => {
                if (data._id == param.id) {
                    setPrescriptionForm({ ...prescriptionForm, user_id: data.user_id._id, doctor_id: doctorInfo._id })
                }
            })
        }
        else setPrescriptionForm({ ...prescriptionForm, doctor_id: doctorInfo._id })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param.id])

    // console.log(prescriptionForm)

    return (
        <Container>
            <Row>
                <Header>New Prescription</Header>
                <Form>
                    <FieldBig>
                        <label htmlFor="user_id">Patient in {doctorInfo.district?.name}</label>
                        <select id="user_id" name="user_id" value={prescriptionForm.user_id} onChange={handleChange}>
                            <option>Select Patient</option>
                            {patients.filter(s => s.district?._id === doctorInfo.district?._id).map(i =>
                                <option key={i._id} value={i._id}>{i.name}</option>
                            )}
                        </select>
                    </FieldBig>

                    <TextAreaField>
                        <label htmlFor="diagnostic">Diagnostic</label>
                        <textarea name="diagnostic" id="diagnostic" onChange={handleChange}></textarea>
                    </TextAreaField>

                    <div className='medicine-container'>
                        <div className="medicine-controller">
                            <div style={{ flexBasis: "30%" }}>
                                <select name="medicine" value={prescriptionMedicine.medicine} onChange={handleChangeMedicine}>
                                    <option>Select Medicine</option>
                                    {medicines.map(i =>
                                        <option key={i._id} value={i._id}>{i.name}</option>
                                    )}
                                </select>
                            </div>
                            <div style={{ flexBasis: "10%" }}>
                                <label htmlFor="quantity">Quantity</label>
                                <input type="number" name="quantity"
                                    value={prescriptionMedicine.quantity}
                                    onChange={handleChangeMedicine}
                                    onKeyUp={handleKeyUp}
                                />
                            </div>
                            <div style={{ flexBasis: "40%" }}>
                                <label htmlFor="frequency">Dosage</label>
                                <input type="text" name="frequency"
                                    value={prescriptionMedicine.frequency}
                                    onChange={handleChangeMedicine}
                                    onKeyUp={handleKeyUp}
                                />
                            </div>
                            <div style={{ flexBasis: "10%" }}>
                                <button className="button blue" onClick={addNewMedicine}>Add Medicine</button>
                            </div>
                        </div>


                    </div>
                    <div className="medicine-display">
                        {prescriptionForm.prescriptions.length > 0 && prescriptionForm.prescriptions.map(i => (
                            <h2>
                                {medicines.filter(f => f._id === i.medicine).map(m => (

                                    <span style={{ flexBasis: "30%" }}>
                                        {m.name} - {m.type}
                                    </span>

                                ))}
                                <span style={{ flexBasis: "8%" }}>
                                    {i.quantity}
                                </span>
                                <span style={{ flexBasis: "43%" }}>
                                    {i.frequency}
                                </span>
                                <span style={{ flexBasis: "10%" }}></span>
                            </h2>
                        ))}
                    </div>

                    {/* <div className="medicine-note">
                        medicine note
                        <textarea name="note" id="note" onChange={handleChange}></textarea>
                    </div> */}
                    <TextAreaField>
                        <label htmlFor="note">Notes for patient</label>
                        <textarea name="note" id="note" onChange={handleChange}></textarea>
                    </TextAreaField>
                </Form>
                <button className="button green " onClick={saveMedicineForm}>Save</button>
            </Row>
        </Container>
    )
}

export default Prescriptioning
