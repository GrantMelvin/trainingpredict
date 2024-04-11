import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";

const Register = () => {

    const {setUser} = useContext(AccountContext) ;
    const navigate = useNavigate();

    const submit = async () => {
        await fetch("http://localhost:4000/unsecure-route/Register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: 'user@example.com', password: 'password' }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success === true){
                navigate('/Login')
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
        <button
        onClick={() => {
            submit()
        }}>Register</button>
        {'     '}
        <button
        onClick={() => {
            navigate('Login')
        }}>Login</button>
        </div>
    );
};
  
export default Register;