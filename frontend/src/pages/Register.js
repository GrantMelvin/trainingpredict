import React from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
import {Input, Box, VStack, InputRightElement, InputGroup, Button, HStack, ButtonGroup} from '@chakra-ui/react'
  
const Login = () => {

    const {user, setUser} = useContext(AccountContext) ;

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
        <VStack w='100%' h='100%'>
            
            <VStack w='20%' h='100%' mt='20%'>

                <Input
                    pr='4.5rem'
                    placeholder='Enter Username'
                />

                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
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
                    />
                </InputGroup>

            </VStack>
        
        <ButtonGroup>
            <Button
            onClick={() => {
                submit()
            }}>Register</Button>
            <Button
            onClick={() => {
                navigate('/Login')
            }}>Login</Button>
        </ButtonGroup>
        
        </VStack>
    );
};
  
export default Login;