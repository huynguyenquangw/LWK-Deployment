import { useState, useEffect } from "react"
export default function Practice(props) {

    const [time, setTime] = useState(0)

    const [timer, setTimer] = useState(false)

    useEffect(() => {
        let interval = null;

        if (timer) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
              }, 10);
        } else {
            clearInterval(interval)
        }
        return clearInterval(interval)
    }, [timer])


    return (
        <div style={{ width: "80%", margin: "100px auto" }}>
            <div style={{ backgroundColor: "#e5e9ff", padding: "20px 30px", width: "200px", margin: "auto", borderRadius: "10px", border: "solid black 5px" }}>
                <h1 style={{ textAlign: "center" }}>
                    <span>{ }</span>:
                    <span>{ }</span>:
                    <span>{ }</span>
                </h1>
                <p style={{ textAlign: "right" }}>
                    <span>{time}</span>
                </p>
            </div>
            <div style={{ width: "300px", margin: "10px auto" }}>
                <button
                    style={{ cursor: "pointer", display: "inline-block", backgroundColor: "#00ff00", padding: "20px 30px", borderRadius: "10px", border: "solid black 5px" }}
                    onClick={() => { setTimer(true) }}
                >Start</button>

                <button
                    style={{ cursor: "pointer", display: "inline-block", backgroundColor: "#ff7676", padding: "20px 30px", float: "right", borderRadius: "10px", border: "solid black 5px" }}
                    onClick={() => { setTimer(false) }}
                >Clear</button>
            </div>
        </div>
    )
}