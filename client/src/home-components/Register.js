import Navbar from './Navbar';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router'
import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { GlobalState } from '../GlobalState';

toast.configure()
export default function Register() {
    const endPoint = "http://localhost:3000"

    const state = useContext(GlobalState)
    const [loading, setLoading] = state.loading
    const [confirmPass, setConfirmPass] = useState('');

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        district: '',
        phone: ''
    })
    const history = useHistory()

    const [district, setDistrict] = useState([])

    //On change for user
    const onChangeValue = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const getDistrict = async e => {
        try {
            const resp = await axios.get(`${endPoint}/district`)
            setDistrict(resp.data)
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    useEffect(() => {
        getDistrict()
    }, [])

    //Register check
    const registerSubmit = async e => {
        // console.log(typeof user.email)
        e.preventDefault()
        if (user.district === '' || user.district === 'Districts') {
            toast(("Please choose a district "))
            return false;
        }
        if (user.password.length < 6) {
            toast(("Password must be at least 6 characters ! "))
            return false;
        }
        if (user.phone.length < 10 || user.phone.length > 10) {
            toast(("Phone must have 10 characters ! "))
            return false;
        }
        if (user.name.length < 1) {
            toast(("Please insert the username "))
            return false;
        }

        if (user.password !== confirmPass) {
            toast('Password does not match !')
        } else {
            try {
                setLoading(!loading)
                await axios.post(endPoint + "/user/register", { ...user })
                toast(`User ${user.email} has been successfully registered !`)
                setLoading(false)
                history.push('/login-patient')
            } catch (error) {
                toast(error.response.data.msg)
                setLoading(false)
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className="grid-container2">
                <div className="item1"></div>
                <div className="item2">
                    <div className='reg1'>
                        Register a patient account
                    </div>
                    <div className='reg2 green'>
                    </div>
                    <br />
                    <div>
                        <form onSubmit={registerSubmit}>
                            <input type="text" className="no3" id="name" name="name" placeholder="Name.." value={user.name} onChange={onChangeValue} />
                            {/* <input type="text"  className="no2" id="lname" name="lastname" placeholder="Last name.." /> */}
                            <br />
                            <input type="text" className="no1" id="phone" name="phone" placeholder="Phone.." value={user.phone} onChange={onChangeValue} />
                            <input type="email" className="no2" id="email" name="email" placeholder="Email.." value={user.email} onChange={onChangeValue} />
                            <br />
                            {/* <input type="text"  className="no3" id="district" name="district"  placeholder="District.."value = {user.district} onChange = {onChangeValue} /> */}
                            <select name="district" id="district" className="no3" value={user.district} onChange={onChangeValue} >
                                <option > Districts </option>
                                {district.map(i =>
                                    <option value={i._id}>{i.name}</option>
                                )}
                            </select>
                            <br />
                            <input type="text" className="no3" id="password" name="password" placeholder="Password.." value={user.password} onChange={onChangeValue} />
                            <br />
                            <input type="text" className="no3" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password.." value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                            <br />
                            <input type="submit" value="Register" className="button green" />
                        </form>
                    </div>
                </div>
                <div className="item3"></div>
            </div>
        </div>
    )
}
