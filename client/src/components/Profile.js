import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Heading, Spacer, Text, Flex, Center } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";


const Profile = () => {

    const [authorPosts, setAuthorPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const [itemToDelete, setItemToDelete] = useState();
    const [typeToDelete, setTypeToDelete] = useState();

    //Dialog options
    const [isOpen, setIsOpen] = useState(false);
    const onCloseDialog = () => setIsOpen(false);
    const onOpenDialog = (e, type) => {
        setIsOpen(true);
        setTypeToDelete(type);
        setItemToDelete(e.target.parentNode.getAttribute('value'));
    }
    const cancelRef = useRef();

    useEffect(() => {
        //Get the user's posts
        axios.get('http://localhost:5000/api/users/posts', {
            headers: {'auth-token': localStorage.getItem('klibus-jwt')}
        })
        .then((response) => {
            setAuthorPosts(response.data);
        })
        .catch(() => {
            console.log('Wtf?');
        });

        //Get the user's comments
        axios.get('http://localhost:5000/api/comments/user', {
            headers: {'auth-token': localStorage.getItem('klibus-jwt')}
        }).then((response) => {
            setComments(response.data);
        })
    }, []);

    const remove = (e) => {
        e.preventDefault();
        
        let listId = itemToDelete;
        let id;
        if (typeToDelete === 'posts') {
            id = authorPosts[listId]._id;
            setAuthorPosts(authorPosts.filter((e, i) => {
                if (i != listId)
                    return e;
            }));
        }
        else {
            id = comments[listId]._id;    
            setComments(comments.filter((e, i) => {
                if (i != listId)
                    return e;
            })); 
        }       
        const url = `http://localhost:5000/api/${typeToDelete}/${id}`;

        axios.delete(url)
        .then((res) => {
            console.log(res);
        });     
        setIsOpen(false);
    };

    return ( 
    <motion.div className="post-page" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
        {authorPosts && 
        <div> 
            <Center><Heading>Your Posts</Heading></Center>
            {authorPosts.map((e, i) => {
                return (
                <Box m='6' p='4' borderWidth='1px' key={i} value={i}>
                    <Flex> 
                    <Text>{e.title}</Text>
                    <Spacer /> 
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate(`/details/${e._id}`)}>View</Button>
                    <Button colorScheme='teal' ml={3} onClick={(e) => {onOpenDialog(e, ('posts'))}}>Delete</Button> 
                    </Flex>
                </Box>)
            })}
            <Center><Heading>Your Comments</Heading></Center>
            {comments.map((e, i) => {
                return (
                <Box m='6' p='4' borderWidth='1px' key={i} value={i} isTruncated>
                    <Flex>
                    <Text>{e.content}</Text>
                    <Spacer /> 
                    <Button colorScheme='teal' variant='outline' onClick={() => navigate(`/details/${e.parentId}`)}>View</Button>
                    <Button colorScheme='teal' ml={3} onClick={(e) => {onOpenDialog(e, 'comments')}}>Delete</Button> 
                    </Flex>
                </Box>)
            })}

            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onCloseDialog}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            Confirmation
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Do you want to delete this post?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onCloseDialog} ref={cancelRef} colorScheme='red'>Cancel</Button>
                            <Button onClick={remove} ml={3}>Yes</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </div>}
    </motion.div> );
}
 
export default Profile;