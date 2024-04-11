import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
  
const Home = () => {

    const navigate = useNavigate();
    const {user} = useContext(AccountContext)

    return (
        <div>
        <h1>Home</h1>
        <h1>Hello {user.email}</h1>
        <div>
        <button
        onClick={() => {
            localStorage.removeItem("token"); // Consider removing the invalid token
            navigate('/Login')
        }}>Sign out</button>
        </div></div>
    );
};
  
export default Home;