import klibou from '../media/klibou.jpg';
import {Badge, Box, HStack, Image} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = ({title, category, breed, numComments, image}) => {

    const [imageSrc, setImageSrc] = useState(klibou);

    useEffect(() => {
        if (image === '') 
            return    
        console.log(image);
        axios.get(`http://localhost:5000/api/posts/images/${image}`, {
            responseType: 'blob'
        }).then((response) => {
            let imgBlob = new Blob([response.data], {type: 'image/png'});
            setImageSrc(URL.createObjectURL(imgBlob));
        }).catch(()=> {
            console.log('osef');
        });
        

    }, [image]);

    return (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image fit='cover' w='100%' h={200} src={imageSrc} alt="Un animalus"/>
        <Box p='6'>
            <HStack>
                <Badge colorScheme='teal' borderRadius='full'>{category}</Badge>
                <Badge colorScheme='teal' variant='outline' borderRadius='full'>{breed}</Badge>
            </HStack>
            <Box mt='3' as='h4' fontWeight='semibold' isTruncated>{title}</Box>
            <Box fontWeight='semibold' letterSpacing='wide' textTransform='uppercase' fontSize='xs' color='gray.500'>{numComments} Comments</Box>
        </Box>
    </Box>
    )
}
 
export default Post;