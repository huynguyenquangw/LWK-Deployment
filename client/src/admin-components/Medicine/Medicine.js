import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { GlobalState } from '../../GlobalState'
import { ToastContainer, toast } from 'react-toastify';


export default function Medicine(props) {

    const state = useContext(GlobalState)
    const [token, setToken] = state.token
    const endPoint = "http://localhost:3000"
    const history = useHistory()
    const [medicine, setMedicine] = useState({
        name: '',
        type: '',
        link: '',
    })
    
    const onChangeValue = e => {
        const { name, value } = e.target
        setMedicine({ ...medicine, [name]: value })
    }
    const registerSubmit = async e =>{
        e.preventDefault()
        if (medicine.name.length < 1) {
            alert(("Please insert name"))
            return false;
        }else{
             try {
                const response = await axios.post(endPoint + "/medicine", { ...medicine }, {
                    headers: {
                        "Authorization": token
                    }
                })
                toast(`Medicine name: ${medicine.name} has been successfully registered !`)
                history.push('/admin/medicine')
        } catch (error) {
            
        } 
        }
      
    }

    return (
        <div>
        <h2 class="list"> Add medicine</h2>
        <form onSubmit={registerSubmit}>
            <input type="text" className="no3" id="name" name="name" placeholder="Name.." value={medicine.name} onChange={onChangeValue} />
            <br />
            <input type="text" className="no3" id="type" name="type" placeholder="Type.." value={medicine.type} onChange={onChangeValue} />
            <br />
            <input type="text" className="no3" id="link" name="link" placeholder="Link.." value={medicine.link} onChange={onChangeValue} />
            <br />
            <input type="submit" value="Register" className="button green" />
        </form>
    </div>
    )
}
