"use client";
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronCircleDown,
  FaCreativeCommons,
  FaPlus,
  FaMusic,
  FaComment,
  FaEdit,
  FaUpload,
  FaRegUser,
  FaUserEdit,
  FaMicrophone,
  FaEye,
} from "react-icons/fa";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import AddSingerModal from "./AddSingerModal";
import AdminProfile from "./AdminProfile";
import axios from "axios";
import { useRouter } from "next/navigation";
import {addSinger} from '../../../utils/navbarFunctions'

const AdminNavbar = () => {
  let cacheUser='';
  if (typeof window !== 'undefined') {
     cacheUser = JSON.parse(localStorage?.getItem('adminInfo'))
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const [profile, setProfile] = useState(cacheUser)
  
  const  handleLogout = async()=>{
    setLoading(true)
    try {
      const {data} = await axios.get('/api/user/logout')
      router.push('/admin/login')
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
    setLoading(false)
  }
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
            Admin Dashboard
          </Heading>
        </Box>
        <Box className="flex">
          <Menu>
            <MenuButton mr={3} p={1} fontSize={20}>
              <BellIcon />
            </MenuButton>
            <MenuList>
              <MenuItem>No New Notification</MenuItem>
              <MenuDivider />
              <MenuItem>No New Notification</MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} p={1} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                name={"Bhuwan Acharya"}
                src={profile?.picture}
              />
            </MenuButton>
            <MenuList display={'flex'} justifyContent={'center'} alignItems={'center'} flexDir={'column'} width={'100%'} padding={3}>
            <AdminProfile setProfile={setProfile}>
              Profile
            </AdminProfile>
              <MenuDivider />
              <Button isLoading={loading} onClick={handleLogout} className="w-full" colorScheme={'teal'}>
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
