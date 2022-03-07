import { Heading, Button, Center, HStack, Select, SimpleGrid, FormLabel } from '@chakra-ui/react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Post from './Post';

const Posts = (props) => {

    const search = async (e) => {
        e.preventDefault();
        
        let posts = await axios.get('http://localhost:5000/api/posts');
        let newContent = [];

        for (let post of posts.data) {
            if (post.category === e.target.category.value)
                newContent.push(post);

        }
        props.setContent(newContent);
    };

    return ( 
    <div className="announcements">
        <Center><Heading mt={12} mb={24}>Annoucements</Heading></Center>
        <div className="searchbar">
            <Center>
                <HStack width='80vw'>
                    <form onSubmit={search}>
                        <FormLabel>Animal: </FormLabel>
                        <Select name='animal' w={200} mr={6}>
                            <option>Cat</option>
                            <option>Dog</option>
                        </Select>
                        <FormLabel>Category: </FormLabel>
                        <Select name='category' w={200} mr={6}>
                            <option>Breeding</option>
                            <option>Adoption</option>
                        </Select>
                        <FormLabel>Breed: </FormLabel>
                        <Select name='breed' w={200} mr={6}>
                            <option>Berger</option>
                            <option>Bulldog</option>
                        </Select>
                        <Button colorScheme='teal' type='submit'>Search</Button>
                    </form>
                </HStack>
            </Center>
        </div>
        <Center>
            <SimpleGrid w='80vw' columns={3} spacing={10}>
                {props.content.map((e, i) => {
                    return <Link key={i} to={`/details/${e._id}`}><Post title={e.title} image={e.image} category={e.category} breed={e.breed} numComments={e.numComments} key={i}/></Link>;
                })}        
            </SimpleGrid>
        </Center>
    </div> 
);
}
 
export default Posts;