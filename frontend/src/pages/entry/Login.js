import React, { useState } from "react";
import { AccountContext } from "../../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
import {Input, Box, VStack, InputRightElement, InputGroup, Button, HStack, ButtonGroup} from '@chakra-ui/react'
  
const Login = () => {

    const {user, setUser} = useContext(AccountContext) ;

    const [email, setEmail] = useState('')
    const [pwd, setPWD] = useState('')

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    
    const navigate = useNavigate();

    const submit = async () => {
        await fetch("http://localhost:4000/unsecure-route/Login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, password: pwd }),
        })
        .then(response => response.json())
        .then(data => {
            if(data.token){
                localStorage.setItem('token', data.token);
                setUser({...data})
                navigate('/Home')
            }else{
                console.log('login failed')
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <VStack w='100vw' h='100vh'>
            
            <VStack w='20%' h='100%' mt='10%'>

                <h1>Lifting Analysis Login</h1>

                <Input
                    pr='4.5rem'
                    placeholder='Enter Email'
                    value={email} // Control the input's value with React state
                    onChange={(e) => {
                        console.log(e.target.value); // Log the current input value
                        setEmail(e.target.value); // Update the state with the input value
                    }}
                />

                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        value={pwd} // Control the input's value with React state
                        onChange={(e) => {
                            console.log(e.target.value); // Log the current input value
                            setPWD(e.target.value); // Update the state with the input value
                        }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <ButtonGroup mt='2.3%'>
                            <Button
                            onClick={() => {
                                submit()
                            }}>Login</Button>
                            <Button
                            onClick={() => {
                                navigate('/Register')
                            }}>Register</Button>
                </ButtonGroup>
            </VStack>
        
       
        
        </VStack>
    );
};
  
export default Login;