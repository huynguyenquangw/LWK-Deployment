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

function MedicinePopup({ modalDisplay, setModalDisplay, medicineData, healthData }) {

    return (
        <>

            <div className={modalDisplay === healthData._id ? "modal active" : "modal"}>

                <div className={modalDisplay === healthData._id ? "modal-content active" : "modal-content"}>
                    <span className="close" onClick={() => setModalDisplay(false)}>&times;</span>
                    <div className="header">
                        <h1>
                            {healthData.doctor_id?.name && "Prescription from Dr." + healthData.doctor_id.name}
                            {healthData.user_id?.name && "Prescription for Pt." + healthData.user_id.name}
                        </h1>
                        <h2>{medicineData && fullDate(new Date(medicineData.createdAt))}</h2>
                    </div>
                    <div className="info">
                        <h1>Diagnostics</h1>
                        <p>{medicineData && medicineData.diagnostic}</p>
                    </div>
                    <div className="info">
                        <h1>Prescribed Medicine</h1>
                        <table>
                            <tr>
                                <th>Medicine</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Dosage</th>
                            </tr>
                            {medicineData && medicineData.prescriptions.map(pres => (
                                <tr>
                                    <td>{pres.medicine.name}</td>
                                    <td>{pres.medicine.type}</td>
                                    <td>{pres.quantity}</td>
                                    <td>{pres.frequency}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div className="info">
                        <h1>Doctor Notes</h1>
                        <p>{medicineData && medicineData.note}</p>
                    </div>

                </div>

            </div>

        </>
    )
}

export default MedicinePopup
