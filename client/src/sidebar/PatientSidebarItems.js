import profile from '../assets/icons/profile.svg'
import profileActive from '../assets/icons/profile-active.svg'
import profileBlue from '../assets/icons/profile-blue.svg'
import health from '../assets/icons/health-status.svg'
import healthActive from '../assets/icons/health-status-active.svg'
import healthBlue from '../assets/icons/health-status-blue.svg'
import chat from '../assets/icons/chat.svg'
import chatActive from '../assets/icons/chat-active.svg'
import chatBlue from '../assets/icons/chat-blue.svg'
import viewHealth from '../assets/icons/view-health.svg'
import viewHealthActive from '../assets/icons/view-health-active.svg'
import viewHealthBlue from '../assets/icons/view-health-blue.svg'
import DoctorChat from '../patient-components/Doctor Chat/DoctorChat'
import HealthStatus from '../patient-components/Health Status/Health Status'
import AllHealth from '../patient-components/Prescriptions/AllHealth'
import Profile from '../patient-components/Profile/Profile'

const SourceUrl = "/patient"

const PatientSidebarItems = [

        // {title: 'Dashboard', 
        // component: Dashboard,
        // icon: dashboard, 
        // icon_active: dashboardActive, icon_blue: dashboardBlue,
        // link: '' },

        {title: 'Profile', 
        component: Profile,
        icon: profile , 
        icon_active: profileActive, icon_blue: profileBlue,
        link: '/profile'},

        {title: 'Add Health', 
        component: HealthStatus,
        icon: health , icon_active: healthActive , icon_blue: healthBlue,
        link:'/health'},

        {title: 'View Health', 
        component: AllHealth,
        icon: viewHealth , icon_active: viewHealthActive , icon_blue: viewHealthBlue,
        link: '/view-health'},
        
        {title: 'Doctor Chat', 
        component: DoctorChat,
        icon: chat , icon_active: chatActive , icon_blue: chatBlue,
        link:  '/chat'}        
    ];

    for (let i = 0; i<PatientSidebarItems.length;i++) {
        PatientSidebarItems[i].link = SourceUrl + PatientSidebarItems[i].link
    }
export default PatientSidebarItems;