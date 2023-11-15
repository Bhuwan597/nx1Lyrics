"use client"
import { Avatar, Badge, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const LyricsListItem = ({lyrics, handleFunction}) => {
  return <>
    <Box
    mt={1}
    position={'relative'}
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
    flexDir={'row'}
    >
    <Box>
        <Text fontWeight={'bold'} fontSize={'large'}>{lyrics.title}</Text>
        <Text fontSize={'xs'} display={'flex'} flexDir={'row'}>
        <Text fontWeight={'bold'} mr={2}>Singers:</Text>
        {lyrics.singers?.map((singer)=>singer.fullName)}
        </Text>
        <Text fontSize={'xs'} display={'flex'} flexDir={'column-reverse'}>
         <Text fontWeight={'bold'} mr={2}>{lyrics.language} song</Text>
         <Text>{lyrics.likes} likes and {lyrics.views} views</Text>
        </Text>
    </Box>
    <Flex ml={2}>
  <Avatar src='https://bit.ly/sage-adebayo' />
  <Box ml='3'>
      <Badge ml='1' colorScheme='green'>
        Posted By
      </Badge>
    <Text fontWeight='bold'>
      Segun Adebayo
    </Text>
    <Text fontSize='sm'>UI Engineer</Text>
  </Box>
</Flex>

    </Box>
  </>
}

export default LyricsListItem