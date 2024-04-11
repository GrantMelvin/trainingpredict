import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
  
const Login = () => {

    const navigate = useNavigate();

    const submit = async () => {
        await fetch("http://localhost:4000/unsecure-route/Login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: 'user@example.com', password: 'password' }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.token)
            localStorage.setItem('token', data.token);
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
        <h1>Login</h1>
        <button
        onClick={() => {
            submit()
        }}>asd</button>
        <div> <button
        onClick={() => {
            navigate("/Home")
        }}>home</button></div>
       
        </div>
    );
};
  
export default Login;