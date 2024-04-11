import React from "react";
  
const Home = () => {

    const submit = () => {
        console.log('1')
        fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          }).then(res => {
            console.log(res)
          })
    }


    return (
        <div>
        <h1>Hello</h1>
        <button
        onClick={() => {
            submit()
        }}>asd</button>
        </div>
    );
};
  
export default Home;