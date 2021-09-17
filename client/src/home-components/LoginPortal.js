import Navbar from "./Navbar"
import styled from "styled-components"
import { Link } from 'react-router-dom';
// import { useContext} from 'react';
// import { GlobalState } from "../GlobalState";

export default function LoginPortal() {
    // const state = useContext(GlobalState)   
    // const [district] = state.districtAPI.district

    const Main = styled.div`
    width: 35%;
    max-width: 20rem ;
    margin: auto;

    >a{
        margin-bottom: 1rem;
        display: block;
    }
`
    return (
        <div>
            <Navbar />
            <Main>
               <Link to="/login-doctor" className="button green">
                Login as Doctor
               </Link>
               
               <Link to="/login-patient" className="button green">
               Login as Patient 
               </Link>
            </Main>
        </div>

    )
}
