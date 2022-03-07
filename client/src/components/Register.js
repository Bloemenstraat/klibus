import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isPending, setPending] = useState(false);
    const navigate = useNavigate();


    //Dialog variables
    const [isOpen, setIsOpen] = useState(false);
    const redirectRef = useRef();
    const onClose = () => {
        setIsOpen(false);
        navigate('/login');
    };

    const addUser = (e) => {
        e.preventDefault();
        setPending(true);

        const newUser = {username, password, email};
        console.log(newUser);
        fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
        .then(() => {
            setPending(false);
            console.log('User added!');
            setIsOpen(true);
        });

    };

    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>            
            <Box borderRadius='lg' borderWidth='1px' p='6'>
                <Heading pb='8'>Register a new account</Heading>
                <form onSubmit={addUser}>
                    <VStack>
                    <Input 
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />

                    <Input 
                    placeholder='email' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                    <Input 
                    type="password"
                    placeholder='Select password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}                    
                    required />

                    <Input 
                    type="password" 
                    placeholder='Confirm Password'
                    required />

                    {!isPending && <Button colorScheme='teal' type='submit'>Register now!</Button>}
                    {isPending && <Button colorScheme='teal' isLoading>Registering</Button>}
                    </VStack>
                </form>
            </Box>

            <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={redirectRef} isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Registered Successfully</AlertDialogHeader>
                        <AlertDialogBody>You're gonna be redirected</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef}>Log in</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>   
        </motion.div>
     );
}

export default Register;

//TODO: CHECK FOR INPUTS AND PASSWORD