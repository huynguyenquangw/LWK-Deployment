import React, { useContext } from 'react'
import "./doctor.css"
import { useHistory } from 'react-router'
import axios from 'axios';
import { toast } from 'react-toastify';

import { useState, useEffect } from "react";
import { GlobalState } from '../../GlobalState';
import FilterDoctor from '../../Feature/FilterDoctor';

function Doctors(props) {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [data] = state.getAllDoctorAPI.doctors
    const [sort, setSort] = state.getAllDoctorAPI.sort
    console.log(sort)
    console.log((token))
    const endPoint = "http://localhost:3000"
    const history = useHistory()
    const [doctor, setDoctor] = useState({
        name: '',
        email: '',
        password: '',
    })

    //Register check
    const registerSubmit = async e => {
        console.log(typeof doctor.email)
        e.preventDefault()

        if (doctor.password.length < 6) {
            toast(("Password must be at least 6 characters ! "))
            return false;
        }
        if (doctor.name.length < 1) {
            toast(("Please insert the Doctor name "))
            return false;
        } else {
            try {
                await axios.post(endPoint + "/doctor/register", { ...doctor }, {
                    headers: {
                        "Authorization": token
                    }
                })
                load()
                toast(`Doctor ${doctor.email} has been successfully registered !`)
                history.push('/admin/doctors')
            } catch (error) {
                toast(error.response.data.msg)
                toast(error.response.data.msg)

            }
        }

    }
    //On change for user
    const onChangeValue = e => {
        const { name, value } = e.target
        setDoctor({ ...doctor, [name]: value })
    }

    const load = () => {

    }

    //load data automatically
    useEffect(() => {
        load()
    }, [])
    console.log(data)
    return (
        <div>
            {/* <h1 style={{ fontSize: "10em" }}>Doctors</h1> */}

            <div>
                <h2 class="list"> Doctor Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" className="no3" id="name" name="name" placeholder="Name.." value={doctor.name} onChange={onChangeValue} />
                    <br />
                    <input type="email" className="no3" id="email" name="email" placeholder="Email.." value={doctor.email} onChange={onChangeValue} />
                    <br />
                    <input type="text" className="no3" id="password" name="password" placeholder="Password.." value={doctor.password} onChange={onChangeValue} />
                    <br />
                    <input type="submit" value="Register" className="button green" />
                </form>
            </div>
       
            <h2 class="list" style={{paddingTop:"1rem"}}> Doctor List</h2>
            <FilterDoctor />
            <div >
                <table style={{ width: "100%" }}>
                    <tr>
                        <th>
                            {sort === '' || sort === 'sort=+name' || sort === undefined
                                ? <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=-name" onClick={e => setSort(e.target.value)}>
                                    Name <i className="fas fa-arrow-down"></i>
                                </button>
                                : <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=+name" onClick={e => setSort(e.target.value)}>
                                    Name <i className="fas fa-arrow-up"></i>
                                </button>
                            }
                        </th>
                        <th>
                            {sort === '' || sort === 'sort=+email' || sort === undefined
                                ? <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=-email" onClick={e => setSort(e.target.value)}>
                                    Email <i className="fas fa-arrow-down"></i>
                                </button>
                                : <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=+email" onClick={e => setSort(e.target.value)}>
                                    Email <i className="fas fa-arrow-up"></i>
                                </button>
                            }
                        </th>
                        <th>
                            {sort === '' || sort === 'sort=+phone' || sort === undefined
                                ? <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=-phone" onClick={e => setSort(e.target.value)}>
                                    Phone <i className="fas fa-arrow-down"></i>
                                </button>
                                : <button style={{ background: 'transparent', border: 'none', outline: 'none', color: '#88A7C1', fontWeight: 800, fontSize: '16px' }}
                                    value="sort=+phone" onClick={e => setSort(e.target.value)}>
                                    Phone <i className="fas fa-arrow-up"></i>
                                </button>
                            }
                        </th>
                        <th>District</th>
                    </tr>
                    {data.map(i => (
                        <tr>
                            <td>{i.name}</td>
                            <td>{i.email}</td>
                            <td>{i.phone}</td>
                            <td>{i.district?.name}</td>
                        </tr>
                    ))}

                </table>
            </div>


        </div>
    )
}

export default Doctors
