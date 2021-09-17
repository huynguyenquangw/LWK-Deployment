import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import certificate from '../../assets/images/certificate.svg'
import photoEdit from '../../assets/icons/profile-picture-edit.svg'
import { toast } from 'react-toastify';
import axios from 'axios';

const Container = styled.div`
    input{
        visibility: hidden;
    }
`

const PhotoContainer = styled.div`
    position: relative;
    max-width: 35rem;
`

const Photo = styled.img`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
`

const ActionContainer = styled.label`
`

const PhotoAction = styled.img`
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 2.5rem;
    cursor: pointer;
    transition: width 0.2s;

    :hover{
        width: 3rem;
    }
`

function Certificate({ doctorInfo, doctorToken, callbackDoctor, setCallbackDoctor, setLoading }) {

    const [cloudinaryCertificate, setCloudinaryCertificate] = useState({
        url: "",
        public_id: ""
    })

    const endPoint = "http://localhost:3000"

    const editCertificate = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (cloudinaryCertificate.url !== "") {
            //delete
            let dataDelete = new FormData()
            dataDelete.append("public_id", cloudinaryCertificate.public_id)

            axios.post(endPoint + "/api/destroy", dataDelete)
                .then(response => {
                    console.log(response.data)
                    toast("Old certificate has been removed")
                })
                .catch(error => toast(error.request));
        }

        //upload
        const file = e.target.files[0]
        let dataUpload = new FormData()
        dataUpload.append("file", file)

        try {
            const response = await axios.post(endPoint + "/api/upload", dataUpload)
            console.log(response.data)
            setCloudinaryCertificate(response.data)
            updateCertificate(response.data)
            toast("New certificate has been updated")
        } catch (error) {
            toast(error.response.data.msg)

        }
        setLoading(false)
    }

    const updateCertificate = async (cloudinaryCertificate) => {

        try {
            await fetch("http://localhost:3000/doctor/update/certificate", {
                method: 'PUT',
                headers: {
                    "Authorization": doctorToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "certificate": {
                        url: cloudinaryCertificate.url,
                        public_id: cloudinaryCertificate.public_id
                    },
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    toast(data.msg)
                })
                .then(setCallbackDoctor(!callbackDoctor))
        } catch (error) {
            toast(error.response)
        }
    }

    useEffect(() => {
        if (doctorInfo.certificate) {
            setCloudinaryCertificate(doctorInfo.certificate)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <PhotoContainer>
                <Photo src={doctorInfo.certificate?.url || certificate} />
                <ActionContainer htmlFor="certificate-upload">
                    <PhotoAction src={photoEdit} />
                </ActionContainer>
            </PhotoContainer>

            <input id="certificate-upload" type="file" onChange={editCertificate} />
        </Container>
    )
}

export default Certificate
