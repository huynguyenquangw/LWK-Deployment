import React, { useContext } from 'react'
// import styled from 'styled-components'
import { Container, Field } from "../../css-template/Input"
import { useState, useEffect } from 'react'
import { GlobalState } from '../../GlobalState'

function Location({ doctorInfo }) {
    const state = useContext(GlobalState)
    const [district] = state.districtAPI.district
    const [selectedDistrict, setSelectedDistrict] = useState("")
    const [followingInfo, setFollowingInfo] = useState({
        name: "",
        postcode: ""
    })

    const handleChange = e => {
        setSelectedDistrict(e.target.value)
    }

    useEffect(() => {
        if (doctorInfo.district) {
            setSelectedDistrict(doctorInfo.district._id)
        }
    }, [doctorInfo])

    useEffect(() => {
        district.forEach(i => {
            if (selectedDistrict == i._id) {
                setFollowingInfo(i.city)
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDistrict])




    return (
        <Container>

            <Field>

                <label htmlFor="district">District</label>
                <select id="district" value={selectedDistrict} onChange={handleChange}>
                    {district.map(i =>
                        <option value={i._id}>{i.name}</option>
                    )}
                </select>
            </Field>

            <Field style={{ userSelect: "none" }}>
                <label htmlFor="city">City</label>
                <input className="uneditable" id="city" type="text" placeholder="City" value={followingInfo.name} readOnly />
            </Field>

            <Field style={{ userSelect: "none" }}>
                <label htmlFor="postcode">Postcode</label>
                <input className="uneditable" id="postcode" type="text" placeholder="Full Name" value={followingInfo.postcode} readOnly />
            </Field>


        </Container>
    )
}

export default Location
