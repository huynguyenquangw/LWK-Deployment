import profile from '../assets/icons/profile.svg'
import profileActive from '../assets/icons/profile-active.svg'
import profileBlue from '../assets/icons/profile-blue.svg'
import patients from '../assets/icons/patients.svg'
import patientsActive from '../assets/icons/patients-active.svg'
import patientsBlue from '../assets/icons/patients-blue.svg'
import prescriptions from '../assets/icons/prescriptions.svg'
import prescriptionsActive from '../assets/icons/prescriptions-active.svg'
import prescriptionsBlue from '../assets/icons/prescriptions-blue.svg'
import health from '../assets/icons/health-status.svg'
import healthActive from '../assets/icons/health-status-active.svg'
import healthBlue from '../assets/icons/health-status-blue.svg'
import Profile from '../doctor-components/Profile/Profile'
import Patients from '../doctor-components/Patients/Patients'
import PatientChat from '../doctor-components/Patient Chat/PatientsChat'
import Prescriptioning from '../doctor-components/Prescriptions/Prescriptioning'

const SourceUrl = "/doctor"

const PatientSidebarItems = [

    // {
    //     title: 'Dashboard',
    //     component: Dashboard,
    //     icon: dashboard,
    //     icon_active: dashboardActive, icon_blue: dashboardBlue,
    //     link: ''
    // },

    {
        title: 'Profile',
        component: Profile,
        icon: profile,
        icon_active: profileActive, icon_blue: profileBlue,
        link: '/profile'
    },

    {
        title: 'Patients',
        component: Patients,
        icon: patients,
        icon_active: patientsActive, icon_blue: patientsBlue,
        link: '/patients'
    },

    {
        title: 'Health Declaration',
        component: PatientChat,
        icon: health, icon_active: healthActive, icon_blue: healthBlue,
        link: '/health'
    },

    {
        title: 'Add Prescriptions',
        component: Prescriptioning,
        icon: prescriptions, icon_active: prescriptionsActive, icon_blue: prescriptionsBlue,
        link: '/prescriptions'
    },

    {   title: ' ',
        component: Prescriptioning,
        link: '/prescriptions/medicine/:id'
    },
];

for (let i = 0; i < PatientSidebarItems.length; i++) {
    PatientSidebarItems[i].link = SourceUrl + PatientSidebarItems[i].link
}
export default PatientSidebarItems;