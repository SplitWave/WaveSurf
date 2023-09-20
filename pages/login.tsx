import { useState } from "react";
import {
  Flex,
  Heading,
   Button,
   Stack,
    Box,
  Text,
   Center,
  FormControl,
 
} from "@chakra-ui/react";
import { FcGoogle } from 'react-icons/fc'
import {BsApple} from "react-icons/bs"


const login  = () => {


  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        backgroundColor="whiteAlpha.900"
        alignItems="center"
        boxShadow="md"
      >
        <Heading color="black.400">Login</Heading>
        <Text>By logging in, you accept our terms and privacy policy.</Text>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={6}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
    <FormControl>
              <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<FcGoogle />}>
        <Center>
          <Text>Sign in with Google</Text>
        </Center>
        </Button>
      
              <Button w={'full'} maxW={'md'} variant={'outline'} leftIcon={<BsApple />}>
        <Center>
        <Text>Sign in with Apple</Text>
        </Center>
        </Button>
       
        </FormControl>
            </Stack>
          </form>
        </Box>
      </Stack>
      
    </Flex>
  );
};

export default login;
