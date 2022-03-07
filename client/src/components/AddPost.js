import { useState, useRef } from "react";
import axios from "axios";
import { Input, Select, Textarea, Button, Box, VStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";

const AddPost = () => {

    const [animal, setAnimal] = useState('cat');
    const [isPending, setPending] = useState(false);
    const breeds = {
        cat: ['siamese', 'stray', 'persan'],
        dog: ['german shepherd', 'rottweiller', 'teckel']
    };
    const url = 'http://localhost:5000/api/posts';

    //Alert dialog variables
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => {
        setIsOpen(false);
        navigate('/');
    };
    const redirectRef = useRef();

    const submitPost = (e) => {
        e.preventDefault();
        setPending(true);

        const fd = new FormData();

        fd.append('title', e.target.title.value);
        fd.append('breed', e.target.breed.value);
        fd.append('category', e.target.category.value);
        fd.append('description', e.target.description.value);
        fd.append('image', e.target.image.files[0], e.target.image.value);

        //'Content-Type': 'multipart/form-data'
        axios.post(url, fd, {
            headers: {
                'auth-token': localStorage.getItem('klibus-jwt'),
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setPending(false);
            setIsOpen(true);
        })
        .catch(e => {
            console.log('Error');
            setPending(false);
        });
    };

    /*const submitPost = (e) => {
        e.preventDefault();
        setPending(true);

        const postContent = {
            title: e.target.title.value,
            breed:e.target.description.value,
            category: e.target.breed.value,
            description:e.target.description.value,
            image: e.target.image.value
        };

        //'Content-Type': 'multipart/form-data'
        axios.post(url, postContent, {
            headers: {
                'auth-token': localStorage.getItem('klibus-jwt')
            }
        })
        .then(response => {
            console.log(response);
            setPending(false);
        })
        .catch(e => {
            console.log('Error');
            setPending(false);
        });
    };*/
    
    return ( 
        <motion.div className="form-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            <Box borderRadius='ls' borderWidth='1px'>
            <VStack>
                <form onSubmit={submitPost}>
                    <Input  
                    placeholder="Titre"
                    name="title" 
                    required />
                    <label>Animal</label>
                    <Select onChange={(e)=>setAnimal(e.target.value)}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </Select>
                    <label>Breed</label>
                    <Select name="breed">
                        {breeds[animal].map((e, i) => {
                            return (<option key={i}>{e}</option>);
                        })}           
                    </Select>
                    <label>Category</label>
                    <Select name="category">
                        <option>Breeding</option>
                        <option>Adoption</option>
                    </Select>
                    <label>Image</label>

                    <Input type='file' name='image'/>
                    <label>Description</label>
                    <Textarea 
                    placeholder="Describe blabla..."
                    name="description" 
                    required />
                    {!isPending && <Button colorScheme='teal' type='submit'>Submit Announcement</Button>}
                    {isPending && <Button colorScheme='teal' isLoading>Submiting...</Button>}
                </form>
            </VStack>
            </Box>

            <AlertDialog isOpen={isOpen} closeOnOverlayClick={false} leastDestructiveRef={redirectRef}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>Publié avec succès</AlertDialogHeader>
                        <AlertDialogBody>Votre publication est en ligne</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onClose} ref={redirectRef} colorScheme='teal'>Go home</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </motion.div>
     );
}
 
export default AddPost;