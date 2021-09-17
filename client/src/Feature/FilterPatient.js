import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState'
import './FilterPatient.css'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function FilterPatient() {
    const state = useContext(GlobalState)
    const [realPatientDataLength, setRealPatientDataLength] = useState(0)
    const [districts] = state.districtAPI.district
    const [search, setSearch] = state.getAllPatientAPI.search
    const [page, setPage] = state.getAllPatientAPI.page
    const [filter, setFilter] = state.getAllPatientAPI.filter
    const [limit, setLimit] = state.getAllPatientAPI.limit

    const totalPages = Math.ceil(realPatientDataLength / (limit * 5))

    const getAll = async () => {
        const response = await axios.get(`http://localhost:3000/user?limit=999999999`)
        setRealPatientDataLength(response.data.data.length)
    }

    const pageIncrease = () => {
        if (page > 0 && page !== totalPages) {
            setPage(i => i + 1)
        } else {
            toast("No more data available, please go back ")
        }
    }

    const pageDecrease = () => {
        if (page > 1) setPage(i => i - 1)
    }

    useEffect(() => {
        setLimit(1)
        getAll()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='filter'>
            <div className="search">
                <label htmlFor="" onClick={() => setSearch('')}>Search: </label>
                <input type="text"
                    value={search} placeholder='by Name'
                    onChange={e => {
                        setSearch(e.target.value)
                        setPage(1)
                        setFilter('')
                    }} />
            </div>

            <div className="filterring">
                <label htmlFor="" onClick={() => setFilter('')}>Filter: </label>
                <select className='filterByDistrict' name="district" id="district" value={filter} onChange={e => {
                    setFilter(e.target.value)
                    setPage(1)
                    setSearch('')
                }}>
                    <option value="">by District</option>
                    {districts.map(p =>
                        <option value={`district=${p._id}`}>{p.name}</option>
                    )}
                </select>
            </div>


            <div className="paginate">
                <button className='btn-prev' onClick={pageDecrease}> <i className="fas fa-chevron-left"></i> Prev page </button>
                <input className='inputPage' min='1' max={totalPages} type="number" value={page} onChange={e => setPage(e.target.value)} />
                <button className='btn-next' onClick={pageIncrease}> Next page <i className="fas fa-chevron-right"></i> </button>
            </div>
        </div>
    )
}
