import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
  
const Login = () => {

    const {user, setUser} = useContext(AccountContext) ;
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
            localStorage.setItem('token', data.token);
            setUser({...data})
        })
        .then(() => {
            navigate('/Home')
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
        <button
        onClick={() => {
            submit()
        }}>Login</button>
        {'          '}
        <button
        onClick={() => {
            navigate('/Register')
        }}>Register</button>
        </div>
    );
};
  
export default Login;