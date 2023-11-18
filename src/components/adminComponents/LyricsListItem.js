"use client"
import { Avatar, Badge, Box, Flex, Text, Image, Stack } from '@chakra-ui/react'
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
    justifyContent={'space-evenly'}
    color={'black'}
    px={3}
    py={4}
    borderRadius={'lg'}
    flexDir={{md:'row', base: 'column'}}
    gap={6}
    >
    <Box display={'flex'} gap={8} justifyContent={'space-evenly'} alignItems={'center'}>
    <Stack direction='row'>
    <Image boxSize={'100px'} objectFit={'cover'} src={lyrics.coverPicture} alt={lyrics.title} rounded={'sm'}/>
    </Stack>
    <Box>
        <Text fontWeight={'bold'} fontSize={'large'}>{lyrics.title}</Text>
        <Text fontSize={'xs'} display={'flex'} flexDir={'row'}>
        <Text fontWeight={'bold'} mr={2}>Singers:</Text>
        {lyrics.singers?.map((singer)=>singer.fullName)}
        </Text>
        <Text fontSize={'xs'} display={'flex'} flexDir={'column-reverse'}>
         <Text fontWeight={'bold'} mr={2}>{lyrics.language} song</Text>
         <Text>{lyrics.likes} likes {lyrics.views} views and {lyrics.dislikes} dislikes</Text>
        </Text>
    </Box>
    </Box>
    <Flex ml={2}>
  <Avatar src={lyrics.postedBy?.picture} />
  <Box ml='3'>
      <Badge ml='1' colorScheme='green'>
        Posted By
      </Badge>
    <Text fontWeight='bold'>
      {lyrics.postedBy?.fullName}
    </Text>
    <Text fontSize='xs'>{lyrics.postedBy?.email}</Text>
  </Box>
</Flex>

    </Box>
  </>
}

export default LyricsListItem