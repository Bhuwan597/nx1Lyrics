"use client"
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const AddSingerModal = ({ handleFunction, children}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [fullName, setFullName] = useState()
  const [nickName, setNickName] = useState()
  const [nationality, setNationality] = useState()
  const [profilePicture, setProfilePicture] = useState()
  const toast = useToast()
  
  const handleClick = async()=>{
    if(!fullName || !nationality || !profilePicture) {
      return toast({
        title: "Incomplete Fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setLoading(true)
    const singerData = {
      fullName: fullName,
      nickName: nickName,
      nationality: nationality,
      profilePicture: profilePicture,
    }
    const data = await handleFunction(singerData)
    if(data){
      toast({
        title: "Singer Profile Added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }else{
      toast({
        title: "Failed to add singer profile!",
        description: "Duplicate entry or internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setLoading(false)
    setFullName(null)
    setNickName(null)
    setProfilePicture(null)
    setNationality(null)
    return onClose()
  }
  return <>
      <span onClick={onOpen}>{children}</span>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Singer profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl isRequired>
              <FormLabel>Singer Full name</FormLabel>
              <Input value={fullName} onChange={(e)=> setFullName(e.target.value)} autoComplete='off' />
            </FormControl>

          <FormControl>
              <FormLabel>Singer Nick name</FormLabel>
              <Input value={nickName} onChange={(e)=> setNickName(e.target.value)} autoComplete='off' />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Nationality (like nepalese, indian, etc)</FormLabel>
              <Input value={nationality} onChange={(e)=> setNationality(e.target.value)} autoComplete='off'/>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Profile Picture</FormLabel>
              <Input value={profilePicture} onChange={(e)=> setProfilePicture(e.target.value)} autoComplete='off'/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} onClick={handleClick} colorScheme='blue' mr={3}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </>
}

export default  AddSingerModal