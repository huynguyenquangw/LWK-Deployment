import { useState, useEffect } from 'react'
import axios from 'axios'

export default function DistrictAPI() {
    const [district, setDistrict] = useState([])

    const getDistrict = async () => {
        try {
            const response = await axios.get("http://localhost:3000/district")
            setDistrict(response.data)

        } catch (error) {
            console.log(error.response.data.msg)
        }

    }

    useEffect(
        () => {
            getDistrict()
        }, []
    )

    return {
        district: [district, setDistrict]
    }
}


// export function getDistrict() {
//     return fetch(endPoint + '/district')
//         .then(resp => resp.json())
//         .then(data => {
//             console.log(data)
//             district = data
//             console.log(district)
//         }).catch(console.error)
// }