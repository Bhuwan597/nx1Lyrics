"use client";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Nationalities from "@/lib/nationality.json";
import Select from "react-select";
import axios from "axios";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import SingerListItem from "./SingerListItem";
import { FaSearch } from "react-icons/fa";

const AddSingerModal = ({ handleFunction, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState();
  const [nickName, setNickName] = useState();
  const [nationality, setNationality] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [searchLoading, setSearchLoading] = useState(false);
  const [singerExists, setSingerExists] = useState(null);
  const [singerInfo, setSingerInfo] = useState([]);
  const [query, setQuery] = useState("");
  const toast = useToast();
  const [readyForUpdate, setReadyForUpdate] = useState("");

  const handleClick = async () => {
    if (!fullName || !nationality || !profilePicture) {
      return toast({
        title: "Incomplete Fields!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    if (singerExists)
      return toast({
        title: "Singer already exists!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    setLoading(true);
    const singerData = {
      fullName: fullName,
      nickName: nickName,
      nationality: nationality,
      profilePicture: profilePicture,
    };
    const data = await handleFunction(singerData);
    if (data) {
      toast({
        title: "Singer Profile Added",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      toast({
        title: "Failed to add singer profile!",
        description: "Duplicate entry or internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setLoading(false);
    setFullName(null);
    setNickName(null);
    setProfilePicture(null);
    setNationality(null);
    return onClose();
  };
  const handleNationalityChange = (selectedOption) => {
    setNationality(selectedOption.value);
  };

  useEffect(() => {
    if (!fullName) return;
    if (readyForUpdate?.fullName === fullName) return;
    const timeout = setTimeout(async () => {
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `/api/singer?search=${fullName}`,
          config
        );
        if (data?.length !== 0) {
          setSingerExists(true);
        } else {
          setSingerExists(false);
        }
      } catch (error) {
        console.log("Not Found");
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [fullName]);

  useEffect(() => {
    if (!query) return;
    const timeout = setTimeout(async () => {
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        setSearchLoading(true);
        const { data } = await axios.get(`/api/singer?search=${query}`, config);
        if (data?.length !== 0) {
          setSingerInfo(data);
        } else {
        }
      } catch (error) {
        console.log("Not Found");
      }
      setSearchLoading(false);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  const handleSingerClick = (singer) => {
    setQuery("");
    setReadyForUpdate(singer);
    setFullName(singer.fullName);
    setNickName(singer.nickName? singer.nickName: '');
    setNationality(singer.nationality);
    setProfilePicture(singer.profilePicture);
    setSingerInfo([])
  };

  const handleUpdate = async () => {
    if (!fullName || !profilePicture || !nationality) return;
    const singerData = {
      fullName,
      nickName,
      profilePicture,
      nationality,
    };
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: readyForUpdate._id,
      },
    };
    try {
      setLoading(true);
      const data = await axios.patch("/api/singer", singerData, config);
      toast({
        title: "Singer Profile Updated",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      toast({
        title: "Failed to update singer profile!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setReadyForUpdate("");
    setLoading(false);
    setFullName(null);
    setNickName(null);
    setProfilePicture(null);
    setNationality(null);
    return onClose();
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a Singer profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box width={"100%"} className="flex justify-center" p={3}>
              <InputGroup width={"70%"}>
                {searchLoading && (
                  <InputLeftElement>
                    {" "}
                    <Spinner color="blue.500" />{" "}
                  </InputLeftElement>
                )}
                <Input
                  placeholder="search singer to update. . . . . ."
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <InputRightElement>
                  <FaSearch />
                </InputRightElement>
              </InputGroup>
            </Box>
            {singerInfo?.length !== 0 && (
              <>
                {singerInfo.map((singer) => {
                  return (
                    <SingerListItem
                      singer={singer}
                      handleFunction={() => handleSingerClick(singer)}
                    />
                  );
                })}
              </>
            )}
            {profilePicture && (
              <WrapItem
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Avatar size="2xl" name={fullName} src={profilePicture} />
              </WrapItem>
            )}

            <FormControl isRequired>
              <FormLabel>Singer Full name</FormLabel>
              <InputGroup>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="off"
                />
                {!singerExists && fullName ? (
                  <InputRightElement>
                    <CheckIcon color="green.500" />
                  </InputRightElement>
                ) : (
                  <InputRightElement>
                    <CloseIcon color="red.500" />
                  </InputRightElement>
                )}
              </InputGroup>
              {singerExists && <Text color={"red"}>Singer Already Exists</Text>}
            </FormControl>
            <FormControl>
              <FormLabel>Singer Nick name</FormLabel>
              <Input
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                autoComplete="off"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Nationality ({nationality})</FormLabel>
              <Select
                onChange={handleNationalityChange}
                placeholder="Select Nationality"
                options={Nationalities}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Profile Picture</FormLabel>
              <Input
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                autoComplete="off"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {readyForUpdate ? (
              <>
                <Button
                  isLoading={loading}
                  onClick={handleUpdate}
                  colorScheme="purple"
                  mr={3}
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                isLoading={loading}
                onClick={handleClick}
                colorScheme="blue"
                mr={3}
              >
                Add
              </Button>
            )}

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSingerModal;
