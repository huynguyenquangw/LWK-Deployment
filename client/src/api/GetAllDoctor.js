import axios from 'axios'
import { useEffect, useState } from 'react'

export default function GetAllDoctor(props) {
    const [doctors, setDoctors] = useState([])

    //Features
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [limit, setLimit] = useState(1)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState('')

    const getAll = async () => {
        const response = await axios.get(`http://localhost:3000/doctor?limit=${limit * 5}&name[regex]=${search}&${sort}&page=${page}&${filter}`)
        setDoctors(response.data.data)
    }

    useEffect(() => {
        getAll()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, sort, limit, page, filter])

    return {
        doctors: [doctors, setDoctors],
        search: [search, setSearch],
        sort: [sort, setSort],
        limit: [limit, setLimit],
        page: [page, setPage],
        filter: [filter, setFilter]
    }
}
