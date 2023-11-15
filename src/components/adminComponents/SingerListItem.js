"use client"
import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const SingerListItem = ({singer, handleFunction}) => {
  return <>
    <Box
    mt={4}
    onClick={handleFunction}
    cursor={'pointer'}
    bg={'#E8E8E8'}
    _hover={{
        background : "#38B2AC",
        color: 'white'
    }}
    w={'100%'}
    display={'flex'}
    alignItems={'center'}
    color={'black'}
    px={3}
    py={2}
    borderRadius={'lg'}
    mb={3}
    >
    <Avatar 
    mr={2}
    size={'md'}
    cursor={'pointer'}
    name={singer.fullName}
    src={singer.profilePicture}
    />
    <Box>
        <Text>{singer.fullName}</Text>
        <Text fontSize={'xs'}>
        {singer.nationality} Singer
        </Text>
    </Box>

    </Box>
  </>
}

export default SingerListItem