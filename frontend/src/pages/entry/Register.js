import React, { useState } from "react";
import { AccountContext } from "../../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
import {Input, Box, VStack, InputRightElement, InputGroup, Button, HStack, ButtonGroup} from '@chakra-ui/react'
  
const Login = () => {

    const {user, setUser} = useContext(AccountContext) ;

    const [email, setEmail] = useState('')
    const [pwd1, setpwd1] = useState('')
    const [pwd2, setpwd2] = useState('')

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    
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
            }else{
                // some sort of flag
                console.log('Register failed')
            }
        })
        .catch(error => console.error('Error:', error));
    }

    return (
        <VStack w='100bw' h='100vh'>
            
            <VStack w='20%' h='100%' mt='10%'>

                <h1>Lifting Analysis Registration</h1>

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
                        value={pwd1}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setpwd1(e.target.value)
                        }}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Confirm password'
                        value={pwd2}
                        onChange={(e) => {
                            console.log(e.target.value)
                            setpwd2(e.target.value)
                        }}
                    />
                </InputGroup>
                <ButtonGroup>
                    <Button
                    onClick={() => {
                        if(pwd1 === pwd2){
                            submit()
                        }else{
                            // some flag
                        }
                    }}>Register</Button>
                    <Button
                    onClick={() => {
                        navigate('/Login')
                    }}>Login</Button>
                </ButtonGroup>
            </VStack>
        
        
        
        </VStack>
    );
};
  
export default Login;