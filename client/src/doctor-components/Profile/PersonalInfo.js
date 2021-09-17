import React from 'react'
import { Container, Field, TextAreaField } from "../../css-template/Input"
import { useState, useEffect } from 'react'

function PersonalInfo({ doctorInfo }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        experience: ""
    })

    const onChangeValue = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    useEffect(() => {
        setUser(doctorInfo)
    }, [doctorInfo])

    return (
        <Container>
            <Field>
                <label htmlFor="name">Name</label>
                <input className="editable" name="name" id="name" type="text" placeholder="Full Name" value={user.name} onChange={onChangeValue}></input>
            </Field>
            <Field>
                <label htmlFor="email">Email</label>
                <input className="uneditable" name="email" id="email" type="text" placeholder="Email Address" value={user.email} onChange={onChangeValue} readOnly></input>
            </Field>
            <Field>
                <label htmlFor="name">Phone</label>
                <input className="editable" name="phone" id="phone" type="text" placeholder="Full Name" value={user.phone} onChange={onChangeValue}></input>
            </Field>
            <TextAreaField>
                <h2>Experiences</h2>
                <textarea name="experience" id="experience" value={user.experience} onChange={onChangeValue}></textarea>
            </TextAreaField>
        </Container>
    )
}

export default PersonalInfo
