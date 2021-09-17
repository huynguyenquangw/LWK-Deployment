import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import axios from 'axios'
import ChatRoom from "./ChatRoom";

const api = "http://localhost:3000"

const Chat = ({ isDoctor, doctorInfo, isPatient, patientInfo }) => {
    const [user, setUser] = useState([])
    const [roomId, setRoomId] = useState(false)
    const [pop, setPop] = useState(false)

    const getUser = async () => {
        const res = await axios.get(`${api}/doctor?limit=99`)
        setUser(res.data.data);
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            {isDoctor &&
                <ChatRoom roomId={doctorInfo._id} doctors={user} isWho={"isDoctor"} setRoomId={setRoomId} pop={pop} setPop={setPop} />
            }
            {isPatient && (
                <>
                    <div className="home-container">
                        {/* <select name="room" id="room" value={roomId} onChange={e => {
                            setRoomId(e.target.value)
                            setPop(true)
                        }}>
                            <option value="">please choose</option>
                            {user.filter(f => patientInfo.district?._id === f.district?._id).map(user => (
                                // <Link to={`/${user._id}`} key={user._id} className="user">
                                //     {user.name}
                                // </Link>
                                <option key={user._id} value={user._id}>{user.name}</option>
                            ))}
                        </select> */}
                        {user.filter(f => patientInfo.district?._id === f.district?._id).map(user => (
                            <>
                                <img src={user.img?.url} onClick={e => {
                                    setRoomId(user._id)
                                    setPop(true)
                                }} />
                                <h1>{user.name}</h1>
                            </>
                        )

                        )}
                    </div>
                    {roomId && <ChatRoom roomId={roomId} doctors={user} currentPatient={patientInfo} isWho={"isPatient"} setRoomId={setRoomId} pop={pop} setPop={setPop} />}
                </>
            )}
        </>

    );
};

export default Chat;