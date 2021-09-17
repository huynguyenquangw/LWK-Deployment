import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const Container = styled.div`
    background-image: ${props => props.active ? "linear-gradient(281.8deg, #00A473 0%, #1bd16d 100%)" : ""};
    height: 15%;
    padding-left: 1.2rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    * {
    display: inline;
    }

    a{
    text-decoration: none;
    }
`

const Icon = styled.img`
    height: 1.5rem;
    margin-right: 1rem;
`

const Item = styled.h2`
padding-right: 2rem;
color: ${props => props.active ? "#ffffff" : "#00A473"};
`




function MenuItem({ title, icon, link, active }) {

    return (
        <Container active={active}>
            {<Icon src={icon} />}
            <Link to={link}>
                <Item active={active}>{title}</Item>
            </Link>
        </Container>


    )
}

export default MenuItem