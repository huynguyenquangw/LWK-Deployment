import Navbar from "./Navbar"
import DoctorPhoto from '../assets/images/doctor.png'
import styled from "styled-components"
import { Link } from 'react-router-dom';

export default function HomePage() {

    const Main = styled.div`
    width: 100%;
    max-width: 75rem ;
    display: flex;
    flex: row nowrap;
    align-items: center;
    justify-content: space-between;
    margin: auto;

    >div{
        display: inline-block;

    }
`
    const Text = styled.div`
    margin-left: 3rem;
    flex-basis: 55%;
    display: flex;
    flex: column nowrap;
    justify-content: space-between;

    *{
    flex-basis: 100%;
    margin-bottom: 1rem;
    }

    a{
    font-weight: 700;
    color: #ffffff;
    display: inline-block;
    padding: 1rem 3rem;
    border-radius: 0.4rem;
    transition: 0.1s;
    background: var(--gradient-green);
    box-shadow: var(--shadow-green);
    }

    a:hover{
    padding: 1.2rem 3.2rem;
    }
`
    const Image = styled.div`
    flex-basis: 35%;
    height: 30rem;

    img{
        height: 100%;
    }

`
    const Text1 = styled.p`
    color: #0076DA;
    font-weight: 800;
    font-size: 1.5rem;
`
    const Text2 = styled.h1`
    color: #002341;
    font-weight: 800;

`
    const Text3 = styled.p`
    color:#98A8B5;
    font-size: 1.2rem;
    line-height: 1.4rem;
`

   

    return (
        <div>
            <Navbar />
            <Main>
                <Text>

                    <Text1 className='hp1'>
                        <b>Signs of COVID ?</b>
                    </Text1>
                    <Text2 className='hp2'>
                        Get direct doctor support and prescriptions
                        delivered right from home
                    </Text2>

                    <Text3 className='hp3'>
                        Register an account, logged your symptoms and let one of our
                        professional doctors in your area take care of you.
                    </Text3>


                    <Link to="/register" id="register">Register as a patient</Link>
                </Text>
                <Image>
                    <img src={DoctorPhoto} alt="" />
                </Image>

            </Main>
        </div>

    )
}
