import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
  
const Register = () => {

    const {setUser} = useContext(AccountContext) ;

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
            console.log(data)
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
        <h1>Register</h1>
        <button
        onClick={() => {
            submit()
        }}>asd</button>
        </div>
    );
};
  
export default Register;