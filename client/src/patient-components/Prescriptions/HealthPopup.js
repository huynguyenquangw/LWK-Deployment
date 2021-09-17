import React from 'react'

const getDate = date => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    if (date.getDay() === 0) {
        return 'Sunday'
    }
    let day = days[date.getDay() - 1]
    return day;
}

const getMonth = date => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let month = months[date.getMonth()];
    return month;
}

const fullDate = (date) => {
    return `${getDate(date)}, ${getMonth(date)} ${date.getDate()}, ${date.getFullYear()}`;
}

function HealthPopup({ modalDisplayHealth, setModalDisplayHealth, healthData}) {

    const { _id, createdAt, fever, cough, breathing, sorethroat, phlegm, runnynose, tiredness,
        blocknose, losssmell, musclepain, vaccinated, covid, othersymptoms } = healthData

    return (
        <div className={modalDisplayHealth === _id ? "modal active" : "modal"}>
            <div className={modalDisplayHealth === _id ? "modal-content active" : "modal-content"}>
                <span className="close" onClick={() => setModalDisplayHealth(false)}>&times;</span>
                <div className="header">
                    <h1>Health Declaration</h1>
                    <h2>created on {fullDate(new Date(createdAt))}</h2>
                    <h3>
                        {healthData.doctor_id?.name && "With Dr." + healthData.doctor_id.name}
                        {healthData.user_id?.name && "From Pt." + healthData.user_id.name}
                    </h3>
                    <h3>ID: {_id}</h3>
                </div>
                {covid && vaccinated &&
                    <div className="info">
                        <h1>Status</h1>
                        <div className="symptoms">
                            {covid ? <p><i className="fas fa-virus"></i>Covid Positived</p> : ""}
                            {vaccinated ? <p><i className="fas fa-syringe"></i>Vaccinated</p> : ""}
                        </div>
                    </div>
                }
                <div className="info">
                    <h1>Symptoms</h1>
                    <div className="symptoms">
                        {fever ? <p>Fever</p> : ""}
                        {cough ? <p>Cough</p> : ""}
                        {breathing ? <p>Breathing difficulties</p> : ""}
                        {sorethroat ? <p>Sorethroat</p> : ""}
                        {phlegm ? <p>Phlegm</p> : ""}
                        {runnynose ? <p>Runny nose</p> : ""}
                        {tiredness ? <p>Tiredness</p> : ""}
                        {blocknose ? <p>Blocked nose</p> : ""}
                        {losssmell ? <p>Smell loss</p> : ""}
                        {musclepain ? <p>Muscle Pain</p> : ""}
                    </div>
                </div>
                {othersymptoms &&
                    <div className="info">
                        <h1>Other Symptoms</h1>
                        {othersymptoms && othersymptoms}
                    </div>
                }
            </div>
        </div>
    )
}

export default HealthPopup
