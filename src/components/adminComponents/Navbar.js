"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  useDisclosure,
  Button,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
  FaPlus,
  FaComment,
  FaEdit,
  FaUpload,
  FaMicrophone,
  FaEye,
  FaRegDotCircle,
} from "react-icons/fa";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import AddSingerModal from "./AddSingerModal";
import AdminProfile from "./AdminProfile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { addSinger } from "../../../utils/navbarFunctions";
import { usePathname } from "next/navigation";

const AdminNavbar = () => {
  let cacheUser = "";
  if (typeof window !== "undefined") {
    cacheUser = JSON.parse(localStorage?.getItem("adminInfo"));
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const pathName = usePathname();
  const [profile, setProfile] = useState(cacheUser);
  const [notificationData, setNotificationData] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [newNotifications, setNewNotifications] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleRouteChange = () => {
      getNotifications();
      onClose();
    };
    handleRouteChange();
  }, [pathName]);

  const getNotifications = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(`/api/notification`, config);
      setNotificationData(data);
      console.log("Notifications Data: ", data);
      setNewNotifications((data.filter((n) => !n.isSeen))?.length);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    getNotifications();
    return () => getNotifications; // Assuming you want to clear the effect cleanup function
  }, [fetchAgain]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/logout");
      router.push("/admin/login");
      toast({
        title: "Successfully logged out",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    } catch (error) {
      toast({
        title: "Failed to logout!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
    }
    setLoading(false);
  };

  function getRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffTime = now - date;
    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (seconds < 60) {
      return 'just now';
    } else if (minutes === 1) {
      return '1 minute ago';
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours === 1) {
      return '1 hour ago';
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return 'yesterday';
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  }
  const handleUpdate = async () => {
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setUpdateLoading(true);
      const { data } = await axios.patch(
        `/api/notification`,
        notificationData,
        config
      );
      setUpdateLoading(false);
    } catch (error) {
      console.error(error.message);
    }
    setFetchAgain(!fetchAgain);
  };

  return (
    <Box>
      <Flex p="4" justify="space-between" align="center">
        <Box>
          <IconButton
            ref={btnRef}
            icon={<FiMenu />}
            variant="ghost"
            color="teal.800"
            size="md"
            onClick={onOpen}
          />
        </Box>
        <Box>
          <Heading color="teal.500" size={"sm"}>
          <Link href={'/admin/dashboard'}>
            Admin Dashboard
          </Link>
          </Heading>
        </Box>
        <Box className="flex">
          <Menu>
            <MenuButton
              className="relative"
              mr={3}
              p={1}
              fontSize={20}
              onClick={() => setFetchAgain(!fetchAgain)}
            >
              {newNotifications !== 0 && (
                <>
                  <span className="bg-red-500 absolute right-1 top-0 text-white text-sm p-[3px] rounded-[50%]">
                    {newNotifications}
                  </span>
                </>
              )}
              <BellIcon />
            </MenuButton>
            <MenuList maxHeight={'400px'} overflowY={'scroll'}>
              {!loading && !notificationData?.length !== 0 && (
                <>
                  <Button
                    isLoading={updateLoading}
                    float={"right"}
                    my={3}
                    colorScheme={"blue"}
                    onClick={handleUpdate}
                  >
                    Mark all as read
                  </Button>
                </>
              )}
              {loading ? (
                <>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                    height={"200px"}
                  >
                    <Spinner color={"blue.500"} size="xl" />
                  </Box>
                </>
              ) : (
                notificationData.map((n) => {
                  return (
                    <>
                      <MenuItem
                        onClick={() => router.push(n.callbackUrl)}
                        p={2}
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        flexDir={"column"}
                        _hover={{ backgroundColor: "purple.200" }}
                      >
                        <Text
                          display={"flex"}
                          flexDir={"row"}
                          justifyContent={"center"}
                          alignItems={"center"}
                          fontSize={"large"}
                          fontWeight={"bold"}
                        >
                          {!n.isSeen ? (
                            <>
                              <span className="text-sm text-green-500 mr-4">
                                <FaRegDotCircle />
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-sm text-red-500 mr-4">
                                <FaRegDotCircle />
                              </span>
                            </>
                          )}
                          {n.notificationTitle}{" "}
                        </Text>
                        <Text fontSize={"small"}>{n.notificationDescription}</Text>
                        <Text color={'blue.500'}  fontSize={"small"}>{getRelativeTime(n.date)}</Text>
                      </MenuItem>
                      <MenuDivider />
                    </>
                  );
                })
              )}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} p={1} rightIcon={<ChevronDownIcon />}>
              <Avatar size="sm" name={"Bhuwan Acharya"} src={profile?.picture} />
            </MenuButton>
            <MenuList
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              width={"100%"}
              padding={3}
            >
              <AdminProfile setProfile={setProfile}>Profile</AdminProfile>
              <MenuDivider />
              <Button
                isLoading={loading}
                onClick={handleLogout}
                className="w-full"
                colorScheme={"teal"}
              >
                Logout
              </Button>
            </MenuList>
          </Menu>
        </Box>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <hr />
          <DrawerBody>
            <Box className="flex justify-center items-center">
              <Link
                className="flex justify-center items-center mr-1 md:mr-3 text-sm md:text-base"
                href={"/"}
                target="_blank"
              >
                <FaEye className="mr-1" />
                Visit Site
              </Link>
            </Box>
            <VStack spacing="2" align="start" mt={2}>
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={4}
                colorScheme="teal"
                width={"100%"}
                leftIcon={<FaMicrophone />}
              >
                <AddSingerModal handleFunction={addSinger}>
                  Add Singer Profile
                </AddSingerModal>
              </Button>
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={4}
                colorScheme="teal"
                width={"100%"}
                leftIcon={<FaPlus />}
              >
                <Link href={"/admin/dashboard/post-lyric"}>Post Lyric</Link>
              </Button>
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={4}
                colorScheme="teal"
                width={"100%"}
                leftIcon={<FaEdit />}
              >
                <Link href={"/admin/dashboard/update-lyric"}>
                  Update Lyrics
                </Link>
              </Button>
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={4}
                colorScheme="teal"
                width={"100%"}
                leftIcon={<FaUpload />}
              >
                <Link href={"/admin/dashboard/lyrics-submit-requests"}>
                  Lyric Submit Requests
                </Link>
              </Button>
              <Button
                display={"flex"}
                justifyContent={"flex-start"}
                alignItems={"center"}
                p={4}
                colorScheme="teal"
                width={"100%"}
                leftIcon={<FaComment />}
              >
                <Link href={"/admin/dashboard/feedbacks"}>Feedbacks</Link>
              </Button>
            </VStack>
          </DrawerBody>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            p="2"
            my={4}
            gap={4}
          >
            <Avatar size="md" name={"Bhuwan Acharya"} src={""} />
            <Box>
              <Text fontSize={20} fontWeight={"bold"} ml="2">
                {"Bhuwan Acharya"}
              </Text>
              <Text>{"v1acharya34@gmail.com"}</Text>
            </Box>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AdminNavbar;
