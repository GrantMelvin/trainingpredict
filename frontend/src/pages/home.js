import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
  
const Home = () => {


    const submit = async () => {
        await fetch("http://localhost:4000/unsecure-route/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ email: 'user@example.com', password: 'password' }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem('token', data.token);
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <div>
        <h1>Home</h1>
        <button
        onClick={() => {
            submit()
        }}>asd</button>
        </div>
    );
};
  
export default Home;