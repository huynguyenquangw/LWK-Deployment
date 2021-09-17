import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router'

import 'react-toastify/dist/ReactToastify.css';

toast.configure()

function Pharmacies(props) {
    const endPoint = "http://localhost:3000"
    const [data, setData] = useState([]);
    const history = useHistory()
    const [pharmacy, setPharmacy] = useState({
        brand: '',
        district: '',
        availability: '',
        image: ''
    })

    const [district, setDistrict] = useState([])

    //On change for user
    const onChangeValue = e => {
        const { name, value } = e.target
        setPharmacy({ ...pharmacy, [name]: value })
    }

    const getDistrict = async e => {
        try {
            const resp = await axios.get(`${endPoint}/district`)
            setDistrict(resp.data)
        } catch (error) {
            toast(error.response.data.msg)
        }

    }

    const deletePharmacy = (id) => {
        fetch(endPoint + "/pharmacy/delete/"+id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({ id: id})
      }).then(data => {
        alert("Deleted successfully") 
        load()  

      })
   }

    const registerPharmacy = async e => {
        try {
            await axios.post(`${endPoint}/pharmacy`, { ...pharmacy }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            alert("Pharmacy added successfully !")
            history.push('/admin/pharmacies')
        } catch (error) {
            toast(error.response.data.msg)
        }
    }

    const load = () => {
        fetch(endPoint + "/pharmacy?limit=999999999")
            .then(response => response.json())
            .then(item => setData(item.data));
    }
    

    //load data automatically
    useEffect(() => {
        load()
         getDistrict()
    }, [])


    return (
        <div>
            <div>
            <h2 class="list"> Pharmacy Register</h2>
            <form onSubmit={registerPharmacy}>
                            <input type="text" className="no3" id="brand" name="brand" placeholder="Brand.." value={pharmacy.brand} onChange={onChangeValue} />
                            <br />
                            <select name="district" id="district" className="no3" value={pharmacy.district} onChange={onChangeValue} >
                                    <option > Options </option>
                                {district.map(i =>
                                    <option value={i._id}>{i.name}</option>
                                )}
                            </select>
                            <br />
                            <input type="submit" value="Register" className="button green" />
                        </form>
            </div>
         <h2 class="list"> Pharmacy List</h2>
            <div >
                <table style={{ width: "100%" }}>
                    <tr>
                        <th>Brand</th>
                        <th>District</th>
                        <th>Availabilty</th>
                        <th>Image</th>
                        <th></th>


                    </tr>
                    {data.map(i => (
                        <tr>
                            <td>{i.brand}</td>
                            <td>{i.district?.name}</td>
                            <td>{i.availability?"Yes":"No"}</td>
                            <td>{i.image}</td>
                            <td><button class="del" onClick={()=> deletePharmacy(i._id)}>Delete</button></td>
                        </tr>
                    ))}

                </table>
            </div>
        </div>
    )
}

export default Pharmacies
