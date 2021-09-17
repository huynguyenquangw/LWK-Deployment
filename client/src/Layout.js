import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'
import PatientSidebarItems from './sidebar/PatientSidebarItems'
import AdminSidebarItems from './sidebar/AdminSidebarItems'
import DoctorSidebarItems from './sidebar/DoctorSidebarItems'

const Container = styled.div`
    width: 100vw;
    max-width: 75rem ;
`

const MainContainer = styled.div`
    box-sizing: border-box;
    padding: 2rem 3rem;
    display: inline-block;
    width: 80%;
    max-width: 60rem;

   
`

const Spacer = styled.div`
    display: inline-block;
    width: 20%;
    max-width: 15rem;
`

const HeadingContainer = styled.div`
    color: #002341;
    height: 10%;
    max-height: 4.5rem;
    margin-bottom: 3rem;

    *{
        display: inline-block;
        vertical-align: middle;

    }

    img{
        height: 2.8rem;
    }

    h1{
    margin: 0.1rem 0 0 1rem;
    }
`

function Layout(props) {
    const location = useLocation();
    let HeadingTitle = ""
    let HeadingIcon = ""

    if (location.pathname.startsWith("/patient")) {
        for (let i = 0; i < PatientSidebarItems.length; i++) {
            if (PatientSidebarItems[i].link === location.pathname) {
                HeadingTitle = PatientSidebarItems[i].title;
                HeadingIcon = PatientSidebarItems[i].icon_blue;
            }
        }
    }

    if (location.pathname.startsWith("/doctor")) {
        for (let i = 0; i < DoctorSidebarItems.length; i++) {
            if (DoctorSidebarItems[i].link === location.pathname) {
                HeadingTitle = DoctorSidebarItems[i].title;
                HeadingIcon = DoctorSidebarItems[i].icon_blue;
            }
        }
    }

    if (location.pathname.startsWith("/admin")) {
        for (let i = 0; i < AdminSidebarItems.length; i++) {
            if (AdminSidebarItems[i].link === location.pathname) {
                HeadingTitle = AdminSidebarItems[i].title;
                HeadingIcon = AdminSidebarItems[i].icon_blue;
            }
        }
    }

    return (
        <Container>
            <Sidebar />

            <Spacer></Spacer>

            <MainContainer>

                <HeadingContainer>
                    <img src={HeadingIcon} alt='headingicon' />
                    <h1>{HeadingTitle}</h1>
                </HeadingContainer>
                {props.children}

            </MainContainer>

        </Container>
    )
}

export default Layout
