import { Box, Divider, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import klibou from '../media/klibou.jpg';
import Comments from './Comments';

const DisplayPost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [numComments, setNumComments] = useState('');
    const [filename, setFilename] = useState('7e36f7e128a50908433f4929eb574986');
    const [image, setImage] = useState('');
    const {id: postId} = useParams();

 
     //useEffect???? or USEFETCH

    //Ca marche meme au mouting initial du composant. Comment gérer ça?
    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${postId}`)
        .then((response) => {
            setTitle(response.data.title);
            setDescription(response.data.description);
            setAuthor(response.data.author);
            setNumComments(response.data.numComments);
            setFilename(response.data.image);
        });

        axios.get(`http://localhost:5000/api/posts/images/${filename}`, {responseType: 'blob'})
        .then((response) => {
            console.log(response);
            let blob = new Blob([response.data], {type: 'image/png'});
            let url = URL.createObjectURL(blob);
            setImage(url);
            console.log(url);
        });
        console.log(filename);

    }, [filename]);
    

    return ( 
        <div className="post-page">
            <Box borderWidth='1px' borderRadius='lg' m='13' p='6'>
                <Box fontWeight='semibold' fontSize='x-large'>{title}</Box>
                <h6>{author}</h6>
                <Image boxSize='300px' fit='cover' borderRadius='full' src={image} alt="Photo du 7ayawan"/>
                <Box>{description}</Box>
            </Box>
            <Divider />
            <Comments parentId={postId}/>            
        </div>
    );
}

export default DisplayPost;