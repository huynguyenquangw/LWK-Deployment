import React from 'react'
import styled from 'styled-components'
import Menu from './Menu/Menu'
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router'
// import assets
import logo from '../assets/images/logo.svg'
// import { Logout } from '../api/PatientAPI';

const Container = styled.div`
    background-color: #FFFFFF;
    box-shadow: var(--shadow-green);
    position: fixed;
    height: 100vh;
    width: 20%;
    max-width: 15rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
`

const Item = styled.div`
    width: 100%;
    height: 10%;
    max-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Logo = styled.img`
    width: 80%;
    max-width: 12rem;
`

function Sidebar({ active }) {
    // const history = useHistory()
    const Out = async () => {
        localStorage.clear()
        window.location.replace("/login-portal")
    }

    return (
        <Container>
            <Item>
                <Logo src={logo} />
            </Item>

            <Menu />

            <Item>

                <h2 style={{ color: "#616161", cursor: "pointer" }} onClick={Out}>Log out</h2>

            </Item>
        </Container>
    )
}

export default Sidebar
