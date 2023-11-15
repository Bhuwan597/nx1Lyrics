import { Box, Text } from "@chakra-ui/react";

const Page = () => {
  return (
   <>
    <Box  display={'flex'} justifyContent={'center'} alignItems={'center'}>
    <Text color={'teal.500'} textAlign={'center'} fontSize={'3rem'} width={{md:'50%', base: '80%'}}>Welocme to Admin Dashboard. Select Menu to start editing.</Text>
    </Box>
   </>
  );
};

export default Page;
