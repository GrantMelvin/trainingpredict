import React, { useEffect, useState } from "react";
import { AccountContext } from "../AccountContext";
import { useContext } from "react" ;
import { useNavigate } from "react-router";
import { Card, Box, HStack, CardBody, CardHeader, Heading, Text, Button, CardFooter, VStack } from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import { useDisclosure } from "@chakra-ui/react";
import Grow from '@mui/material/Grow';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Home = () => {

    const navigate = useNavigate();
    const user = useContext(AccountContext)
    const { isOpen, onToggle } = useDisclosure()
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true)
    }, [])

    return (
        <VStack w='100vw' h='100vh'>
            <HStack w='90%' h='100%' spacing={20}>
                <Box w='25%' h='30%' ml='10%'>
                        <Card w='100%' h='100%'>
                            <CardHeader>
                                <Heading size='md'>Upload</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>View a summary of all your customers over the last month.</Text>
                            </CardBody>
                            <CardFooter>
                                <Button>View here</Button>
                            </CardFooter>
                        </Card>
                </Box>
                <Box w='25%' h='30%'>
                    <Card w='100%' h='100%'>
                        <CardHeader>
                            <Heading size='md'>Analyze</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>View a summary of all your customers over the last month.</Text>
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                </Box>
                <Box w='25%' h='30%'>
                    <Card w='100%' h='100%'>
                        <CardHeader>
                            <Heading size='md'>Visualize</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text>View a summary of all your customers over the last month.</Text>
                        </CardBody>
                        <CardFooter>
                            <Button>View here</Button>
                        </CardFooter>
                    </Card>
                </Box>
            </HStack>
            <Box mb='5%'>
            <Button
            onClick={() => {
                localStorage.removeItem("token"); // Consider removing the invalid token
                navigate('/Login')
            }}>Sign out</Button>
            </Box>
            
        </VStack>
    );
};
  
export default Home;