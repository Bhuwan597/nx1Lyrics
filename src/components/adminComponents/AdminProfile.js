"use client";
import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminProfile = ({ setProfile, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false)
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const router = useRouter()
  const getUserProfile = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const id = JSON.parse(localStorage.getItem("adminInfo"))?._id;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/user/${id}`, config);
    if (data) {
      setProfile(data);
      setUserProfile(data);
    } else {
      console.log("error");
    }
    setLoading(false);
  };
  const handleProfile = () => {
    onOpen();
    getUserProfile();
  };
  const handleUpdate = async () => {
    const { newName, currentPassword, newPassword } = userProfile;
    if (!currentPassword || !newPassword) return;
    if (newName && newName.length > 20)
      return toast({
        title: "Username can be upto 20 characters only",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    if (newPassword.length < 8)
    return toast({
  title: "Password must be atleast 8 characters.",
  status: "info",
  duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    const userData = {
      fullName: newName,
      password: currentPassword,
      newPassword: newPassword,
    };
    try {
      setUpdateLoading(true)
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userProfile._id,
        },
      };

      const { data } = await axios.patch("/api/user/update", userData, config);
      toast({
        title: 'Password Changed Successfully',
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      localStorage.removeItem('adminInfo')
      router.push('/admin/login')
      onClose()
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setUserProfile({
      ...userProfile,
      newName: '',
      currentPassword: '',
      newPassword: ''
    });
    
    setUpdateLoading(false)
  };

  return (
    <>
      <Button className="w-full" onClick={handleProfile}>
        {children}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading && !userProfile ? (
              <>
                <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Box>
              </>
            ) : (
              <>
                <Box className="flex justify-center items-center">
                  <Avatar
                    my={3}
                    size="2xl"
                    name="Dan Abrahmov"
                    src={userProfile.picture}
                  />
                </Box>
                <Box className="flex justify-center items-start flex-col gap-4">
                  <Text className="font-bold">
                    Name : {userProfile.fullName}
                    {
                      <Input
                        pr="4.5rem"
                        type="text"
                        placeholder="New name if you want to change"
                        value={userProfile.newName}
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            newName: e.target.value,
                          })
                        }
                      />
                    }
                  </Text>
                  <Text className="font-bold">Email : {userProfile.email}</Text>
                  <Text className="font-bold">Current Password</Text>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={userProfile.currentPassword}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          currentPassword: e.target.value,
                        })
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text className="font-bold">New Password</Text>
                  <InputGroup size="md">
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      value={userProfile.newPassword}
                      onChange={(e) =>
                        setUserProfile({
                          ...userProfile,
                          newPassword: e.target.value,
                        })
                      }
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text className="font-bold">
                    Joined on : {userProfile.createdOn}
                  </Text>
                </Box>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button isLoading={updateLoading}  mr={3} colorScheme="blue"  onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="ghost"  mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminProfile;
