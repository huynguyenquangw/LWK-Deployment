import { Link } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg'
import styled from 'styled-components';

//CSS Template

const Container = styled.div`
    display: flex;
    flex: row nowrap;
    justify-content: space-between;
    width: 100%;
    max-width: 75rem;
    margin: auto;
    max-height: 9rem;

    >*{
        flex-basis: 30%;
    }

    a{
        text-decoration: none;
    }
`
const Logo = styled.img`
    width: 80%;
    max-height: 70%;
    max-width: 18rem;
    padding: 2rem;
`
const Menu = styled.div`
    display: flex;
    flex: row nowrap;
    justify-content: center;
    align-items: center;

    *{
        font-weight: 700;
        color: #002341;
        display: inline-block;
        padding: 1rem;
    }
`
const ButtonContainer = styled.div`
    display: flex;
    flex: row nowrap;
    justify-content: center;
    align-items: center;

`



export default function Navbar() {

    return (
        <Container>
            <div>
                <Logo src={LogoImg} alt="logo" />
            </div>

            <Menu>
                <Link to="/">Home</Link>
                <Link to="/">How It Works</Link>
                <Link to="/">Contact Us</Link>
            </Menu>

            <ButtonContainer>
                <Link to="/login-portal" className="button blue">Login</Link>
                <Link to="/register" className="button green" style={{marginLeft: '1rem'}}>Register</Link>
            </ButtonContainer>


        </Container>

    )
}