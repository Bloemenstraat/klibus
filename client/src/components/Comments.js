import { Box, Button, Text, Textarea } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import pageVariant from "../etc/animations";
import { motion } from "framer-motion";

const Comments = ( {parentId} ) => {
    const isAuthenticated = localStorage.getItem('klibus-jwt') ? true : false;
    const [comments, setComments] = useState(null);
    const [emptyComments, setEmptyComments] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const Comment = ({author, content, date}) => { return (
        <Box borderWidth='1px' borderRadius='lg' m='13' p='6'>
            <Text textTransform='uppercase' letterSpacing='wide' fontWeight='bold' fontSize='xs'>{author}</Text>
            <Text>{content}</Text>
            <Text color='gray.500' fontSize='sm'>{date}</Text>
        </Box>
    )};

    useEffect(() => {
        axios.get('http://localhost:5000/api/comments', {
            headers: {'parentId': parentId}
        })
        .then((response) => {
            if (response.data.length === 0)
                setEmptyComments(true);
            setComments(response.data);
        });

    }, []);

    const postComment = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const commentData = {
            'parentId': parentId,
            'content': e.target.comment.value
        };

        axios.post('http://localhost:5000/api/comments', commentData, {
            headers: {'auth-token': localStorage.getItem('klibus-jwt')}
        })
        .then((res) => {
            setIsLoading(false);
            e.target.comment.value = '';
        });

    };

    return (
        <motion.div className="comment-section" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            {comments && comments.map((e, i) => {
                return (<Comment key={i} author={e.author} content={e.content} date={e.date}/>);
            })}
            {emptyComments && <p>Makach commentaires, emchi!</p>}
            {isAuthenticated && 
            <Box m='13' p='6'>
                <form onSubmit={postComment}>
                    <Textarea name="comment" required></Textarea>
                    {!isLoading && <Button type='submit'>Envoyer le commentaire</Button>}
                    {isLoading && <Button type='submit' isDisabled>Envoi en cours</Button>}
                </form>
            </Box>}
        </motion.div>
        
     );
}
 
export default Comments