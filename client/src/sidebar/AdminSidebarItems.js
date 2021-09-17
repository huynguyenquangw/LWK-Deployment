import patients from '../assets/icons/patients.svg'
import patientsActive from '../assets/icons/patients-active.svg'
import patientsBlue from '../assets/icons/patients-blue.svg'
import doctors from '../assets/icons/doctors.svg'
import doctorsActive from '../assets/icons/doctors-active.svg'
import doctorsBlue from '../assets/icons/doctors-blue.svg'
import Patients from '../admin-components/Patients/Patients'
import Doctors from '../admin-components/Doctors/Doctors'
import Medicine from '../admin-components/Medicine/Medicine'

const SourceUrl = "/admin"

const PatientSidebarItems = [

    // {title: 'Dashboard', 
    // component: Dashboard,
    // icon: dashboard, 
    // icon_active: dashboardActive, icon_blue: dashboardBlue,
    // link: '' },

    {
        title: 'Doctors',
        component: Doctors,
        icon: doctors,
        icon_active: doctorsActive, icon_blue: doctorsBlue,
        link: '/doctors'
    },

    {
        title: 'Patients',
        component: Patients,
        icon: patients,
        icon_active: patientsActive, icon_blue: patientsBlue,
        link: '/patients'
    },
    {
        title: 'Medicine',
        component: Medicine,
        icon: patients,
        icon_active: patientsActive, icon_blue: patientsBlue,
        link: '/medicine'
    },



    // {title: 'Pharmacies', 
    // component: Pharmacies,
    // icon: pharmacies , icon_active: pharmaciesActive , icon_blue: pharmaciesBlue,
    // link: '/pharmacies'},
];

for (let i = 0; i < PatientSidebarItems.length; i++) {
    PatientSidebarItems[i].link = SourceUrl + PatientSidebarItems[i].link
}
export default PatientSidebarItems;