import { CloseIcon } from '@chakra-ui/icons'
import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const SingerBadge = ({singer, handleFunction}) => {
  return (
    <>
        <Button 
        px={2}
        py={'2px'}
        borderRadius={'lg'}
        m={1}
        mb={2}
        fontSize={12}
        backgroundColor={'purple'}
        color={'white'}
        cursor={'pointer'}
        onClick={handleFunction}
        _hover={{
            backgroundColor : "red.500"
        }}
        >
        {singer.fullName}
        <CloseIcon pl={1}/> 
        </Button>
    </>
  )
}

export default SingerBadge