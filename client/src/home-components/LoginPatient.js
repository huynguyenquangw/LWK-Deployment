import Navbar from "./Navbar"
import { useContext, useState } from 'react';
// import { useHistory } from 'react-router'
import axios from "axios";
import { toast } from 'react-toastify';
import { GlobalState } from "../GlobalState";

export default function LoginPatient() {
    const endPoint = "http://localhost:3000"

    const state = useContext(GlobalState)
    const [loading, setLoading] = state.loading
    const [user, setUser] = useState({
        email: '',
        password: '',
    })


    //On change for user
    const onChangeValue = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const getRole = async (token) => {
        const response = await axios.get("http://localhost:3000/user/info", {
            headers: {
                Authorization: token
            }
        })
        return response.data.role === 1 ? window.location.replace('/admin/patients') : window.location.replace('/patient/profile')
    }

    //Register check
    const loginSubmit = async e => {
        e.preventDefault()
        try {
            setLoading(!loading)
            const response = await axios.post(endPoint + "/user/login", { ...user },
                { withCredentials: 'include' })
            getRole(response.data.accessToken)

            localStorage.setItem('isLogin', true)
            toast(`User ${user.email} has been successfully login !`)
            // getRole(response.data.accessToken)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error.response.data.msg);
            toast(error.response.data.msg)
        }
    }

    return (
        <div>
            <Navbar />

            <div className="grid-container2">
                <div className="item1"></div>
                <div className="item2">   <div className='reg1'>
                    Login as a patient account
                </div>
                    <div className='reg2'>
                    </div>
                    <br />
                    <div style={{ width: "70%", margin: "auto" }}>
                        <form onSubmit={loginSubmit}>
                            <input type="email" className="no3" id="email" name="email" value={user.email} onChange={onChangeValue} placeholder="Email.." />
                            <br />
                            <input type="text" className="no3" id="password" name="password" value={user.password} onChange={onChangeValue} placeholder="Password.." />
                            <br />
                            <input type="submit" value="Log In" className="button blue" />
                        </form>
                    </div></div>
                <div className="item3"></div>

            </div>

        </div>

    )
}