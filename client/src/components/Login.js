import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Stack, Box, Heading, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogBody } from "@chakra-ui/react";
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setPending] = useState(false);
    const navigate = useNavigate();

    //Alert dialog variables
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        navigate('/');
    };
    const redirectRef = useRef();

    const login = (e) => {
        e.preventDefault();
        setPending(true);
        const loginInfo = {username, password};

        axios.post('http://localhost:5000/api/users/login', loginInfo, {
            headers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            localStorage.setItem('klibus-jwt', response.headers['auth-token'])
            setPending(false);
            setIsOpen(true);
        });
    }

    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            <Box borderWidth='1px' borderRadius='lg' p='6'>
                <Heading pb='8'>Log in</Heading>
                <form onSubmit={login}>
                    <Stack>
                        <Input                             
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)} 
                        required
                        placeholder="Username"/>
                        <Input 
                        type='password'
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        placeholder="Password"/>
                        {!isPending && <Button colorScheme='teal' type='submit'>Login</Button>}
                        {isPending && <Button colorScheme='teal' variant='outline' loadingText="Loging" isLoading>Login</Button>}
                    </Stack>                
                </form>    
            </Box>   

            <AlertDialog closeOnOverlayClick={false} leastDestructiveRef={redirectRef} isOpen={isOpen}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Connected Successfully</AlertDialogHeader>
                        <AlertDialogBody>You're gonna be redirected</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef}>Go home</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>         
        </motion.div>        
     );
}
 
export default Login;