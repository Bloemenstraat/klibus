import { Box, Divider, Heading, HStack, SlideFade, Text } from '@chakra-ui/react';
import useFetch from '../hooks/useFetch';
import splash from '../media/splash.svg';
import Posts from './Posts';
import { AnimatePresence, motion } from "framer-motion";
import pageVariant from '../etc/animations';

const Home = () => {

    const {data: posts, setData: setPosts, isPending} = useFetch('http://localhost:5000/api/posts');
    const MHeading = motion(Heading);
    

    return ( 
        <motion.div className="home" variants={pageVariant} initial='initial' animate='animate' exit='exit'>
            <HStack m='10'>
                <Box w='50vw'>
                    <MHeading mb='6'>Your pet need a companion?</MHeading>
                    <Text>
                        You're in the right place! Here, you will find a community of pet lovers.
                        Whether your dog needs a soulmate or your kittens need a new family, 
                        you can post an annoucement or browse the annoucements below.
                    </Text>
                </Box>
                <img className="splash" src={splash} alt="splash truc" />
            </HStack>
            
            <Divider />
            {isPending && <div>LOADING</div>}
            {posts && <Posts content={posts} setContent={setPosts}/>}
        </motion.div>
     );
}
 
export default Home;