import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { useLocation } from 'react-router-dom';
import PatientSidebarItems from '../PatientSidebarItems';
import DoctorSidebarItems from '../DoctorSidebarItems'
import AdminSidebarItems from '../AdminSidebarItems'

const Container = styled.div`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    height: 50%;
    max-height: 23rem;
`

function Menu() {
    const location = useLocation();

    const SidebarItemsRender = [];

    if (location.pathname.startsWith("/patient")){
        for (let i = 0; i<PatientSidebarItems.length;i++) {

            if(PatientSidebarItems[i].link === location.pathname){
                SidebarItemsRender.push(
                    <MenuItem 
                    key={PatientSidebarItems[i].title}
                    title ={PatientSidebarItems[i].title} 
                    icon={PatientSidebarItems[i].icon_active} 
                    link={PatientSidebarItems[i].link} 
                    active/>
                )
            }else{
                SidebarItemsRender.push(
                    <MenuItem 
                    key={PatientSidebarItems[i].title}
                    title ={PatientSidebarItems[i].title} 
                    icon={PatientSidebarItems[i].icon} 
                    link={PatientSidebarItems[i].link}/>
                )
            }
        }
    }

    if (location.pathname.startsWith("/doctor")){
        for (let i = 0; i<DoctorSidebarItems.length;i++) {

            if(DoctorSidebarItems[i].link === location.pathname){
                SidebarItemsRender.push(
                    <MenuItem 
                    key={DoctorSidebarItems[i].title}
                    title ={DoctorSidebarItems[i].title} 
                    icon={DoctorSidebarItems[i].icon_active} 
                    link={DoctorSidebarItems[i].link} 
                    active/>
                )
            }else{
                SidebarItemsRender.push(
                    <MenuItem 
                    key={DoctorSidebarItems[i].title}
                    title ={DoctorSidebarItems[i].title} 
                    icon={DoctorSidebarItems[i].icon} 
                    link={DoctorSidebarItems[i].link}/>
                )
            }
        }
    }

    if (location.pathname.startsWith("/admin")){
        for (let i = 0; i<AdminSidebarItems.length;i++) {

            if(AdminSidebarItems[i].link === location.pathname){
                SidebarItemsRender.push(
                    <MenuItem 
                    key={AdminSidebarItems[i].title}
                    title ={AdminSidebarItems[i].title} 
                    icon={AdminSidebarItems[i].icon_active} 
                    link={AdminSidebarItems[i].link} 
                    active/>
                )
            }else{
                SidebarItemsRender.push(
                    <MenuItem 
                    key={AdminSidebarItems[i].title}
                    title ={AdminSidebarItems[i].title} 
                    icon={AdminSidebarItems[i].icon} 
                    link={AdminSidebarItems[i].link}/>
                )
            }
        }
    }
    


    return ( 
        <Container>
            {SidebarItemsRender}
        </Container>
    )
}

export default Menu