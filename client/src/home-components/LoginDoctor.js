import Navbar from "./Navbar"
import { useContext, useState } from 'react';
// import { useHistory } from 'react-router'
import { toast } from 'react-toastify';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from "../GlobalState";

toast.configure()
export default function LoginDoctor() {
    const endPoint = "http://localhost:3000"

    const state = useContext(GlobalState)
    const [loading, setLoading] = state.loading
    const [doctor, setDoctor] = useState({
        email: '',
        password: '',
    })

    //On change for doctor
    const onChangeValue = e => {
        const { name, value } = e.target
        setDoctor({ ...doctor, [name]: value })
    }

    //Register check
    const loginSubmit = async e => {
        e.preventDefault()
        try {
            setLoading(!loading)
            await axios.post(endPoint + "/doctor/login", { ...doctor },
                { withCredentials: 'include' })

            localStorage.setItem('isDoctorLogin', true)
            toast(`Doctor ${doctor.email} has been successfully login !`)
            setLoading(false)
            window.location.replace('/doctor/profile')

        } catch (error) {
            setLoading(false)
            toast(error.response.data.msg)
        }
    }

    return (
        <div>
            <Navbar />

            <div className="grid-container2">
                <div className="item1"></div>
                <div className="item2">   <div className='reg1'>
                    Login as a doctor account
                </div>
                    <div className='reg2'>
                    </div>
                    <br />
                    <div style={{ width: "70%", margin: "auto" }}>
                        <form onSubmit={loginSubmit}>
                            <input type="email" className="no3" id="email" name="email" value={doctor.email} onChange={onChangeValue} placeholder="Email.." />
                            <br />
                            <input type="text" className="no3" id="password" name="password" value={doctor.password} onChange={onChangeValue} placeholder="Password.." />
                            <br />
                            <input type="submit" value="Log In" className="button blue" />
                        </form>
                    </div></div>
                <div className="item3"></div>
            </div>
        </div>

    )
}