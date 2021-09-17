import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import profile from '../../assets/images/profile.svg'
import photoEdit from '../../assets/icons/profile-picture-edit.svg'
import axios from 'axios';
import { toast } from 'react-toastify';

const Container = styled.div`
    input{
        visibility: hidden;
    }
`

const PhotoContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    max-width: 15rem;
    max-height: 15rem;
    height: 40vw;
    width: 40vw;
    border-radius: 15%;

    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 101% auto;
`

const ActionContainer = styled.label`
`

const PhotoAction = styled.img`
    display: inline-block;
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
function ProfilePicture({ info, token, callback, setCallback, setLoading }) {

    const [cloudinary, setCloudinary] = useState({
        url: "",
        public_id: ""
    })

    const endPoint = "http://localhost:3000"

    const editImage = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (cloudinary.url !== "") {
            //delete
            let dataDelete = new FormData()
            dataDelete.append("public_id", cloudinary.public_id)

            axios.post(endPoint + "/api/destroy", dataDelete)
                .then(response => {
                    console.log(response.data)
                    toast("Old profile picture has been removed")
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
            setCloudinary(response.data)
            updateImage(response.data)
            toast("New profile picture has been updated")
        } catch (error) {
            toast(error.response.data.msg)

        }
        setLoading(false)
    }

    const updateImage = async (cloudinary) => {

        try {
            await fetch("http://localhost:3000/user/update", {
                method: 'PUT',
                headers: {
                    "Authorization": token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "img": {
                        url: cloudinary.url,
                        public_id: cloudinary.public_id
                    },
                    "name": document.getElementById("name").value,
                    "district": {
                        "_id": document.getElementById("district").value,
                    },
                    "phone": document.getElementById("phone").value,
                })
            })
                .then(resp => resp.json())
                .then(data => {
                    toast(data.msg)
                })
                .then(setCallback(!callback))
        } catch (error) {
            toast(error.response)
        }
    }

    useEffect(() => {
        if (info.img) {
            setCloudinary(info.img)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <PhotoContainer style={{ backgroundImage: `url(${info.img?.url || profile})` }}>
                <ActionContainer htmlFor="photo-upload">
                    <PhotoAction src={photoEdit} />
                </ActionContainer>
            </PhotoContainer>

            <input id="photo-upload" type="file" onChange={editImage} />
        </Container>
    )
}

export default ProfilePicture
