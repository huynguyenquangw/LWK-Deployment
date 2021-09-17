import React, { useEffect } from 'react'
import { token, Logout, Login,  UpdatePatientInfo, GetPatientInfo } from './api/PatientAPI'
import { getDistrict } from './api/API'

export default function Test(props) {
    const getrf = async () => {
        console.log(token)

        // fetch("http://localhost:3000/user/refresh_token", {
        //     credentials: 'include'
        // })
        //     .then(resp => resp.json())
        //     .then(data => {
        //         console.log(data)
        //         token = data.accesstoken
        //         console.log(token)
        //     })

    }

    const login = async () => {
        await Login("entaimagi@gmail.com","Huy860.Q")

        // await fetch('http://localhost:3000/user/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: 'entaimagi@gmail.com',
        //         password: 'Huy860.Q'
        //     }),
        //     credentials: 'include'
        // })
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data)
        // })
        //     .catch(console.error)
        // // localStorage.setItem('login', true)
        // // window.location.reload()

    }

    const info = async () => {

        await GetPatientInfo()

        // await fetch("http://localhost:3000/user/info", {
        //     method: 'GET',
        //     headers: {
        //         'Authorization': token,
        //         'Content-Type': 'application/json'
        //     }
        // }).then(resp => resp.json())
        //     .then(data => {
        //         console.log(data)
        //     })

    }

    const logout = async () => {

        await Logout()

    //     try {
    //         await fetch('http://localhost:3000/user/logout')
    //         localStorage.clear()
    //         // window.location.reload()
    //     } catch (error) {
    //         alert(error.response.data.msg)
    //     }
    // }
    // useEffect(() => {
    //     if (localStorage.getItem('login')) getrf()
    // }, [])
    }

    const update = async () => {
        await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'entaimagi@gmail.com',
                password: 'Huy860.Q'
            }),
            credentials: 'include'
        })
            .then(getrf)
            .then(console.log)
            .catch(console.error)
    }

    

    const updateInfo = async e => {

        const data={
            name: "Yo",
            district: "6125505e73f4275ea38c9b8d"
        }

        await UpdatePatientInfo(data)
    }                                       
    
    return (
        <>
            <button onClick={login}>login</button>
            <button onClick={getrf}>Token</button>
            <button onClick={logout}>out</button>
            <button onClick={info}>Info</button>
            <button onClick={updateInfo}>Update Info</button>
            <button onClick={getDistrict}>District</button>

        </>
    )
}
