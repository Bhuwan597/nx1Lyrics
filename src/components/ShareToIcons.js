"use client";
import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMailBulk,
  FaPrint,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { Box, Tooltip, useToast } from "@chakra-ui/react";
import axios from "axios";

const ShareToIcons = ({id}) => {
  const [clicked, setClicked] = useState(false)
  const toast = useToast()

  async function handleClick(value){
    setClicked(true)
    try {
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {data} = await axios.patch('/api/lyrics',{value:value,id:id},config)
      return toast({
        title: "Thanks for the feedback!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <>
    {!clicked && <Box>
    <Tooltip label='Like this post'>
      <button onClick={()=>handleClick(true)} className=" top-[47%] md:top-[45%] right-0 p-2 bg-blue-500 text-white text-xl hover:bg-white hover:text-blue-500 mx-2">
        <FaThumbsUp className="hover:scale-125 transition delay-75" />
      </button>
    </Tooltip>
    <Tooltip label='Dislike this post'>
      <button onClick={()=>handleClick(false)} className="top-[52%] right-0 p-2 bg-red-500 text-white text-xl hover:bg-white hover:text-red-500">
        <FaThumbsDown className="hover:scale-125 transition delay-75"/>
      </button>
      </Tooltip>
    </Box>}

      <div className="container-fluid flex flex-row text-xl left-0 top-[43%] gap-1">
      <Tooltip label='Share to Facebook'>
        <a
          href="/"
          className="bg-blue-500 text-white p-2 text-xl flex justify-start items-center gap-2 rounded-sm hover:bg-blue-600 relative group"
        >
          <FaFacebook />
        </a>
        </Tooltip>
<Tooltip label=" Share to Instagram">
        <a
          href="/"
          className="bg-red-600 text-white p-2 text-xl flex justify-start items-center gap-2 hover:bg-red-800 relative group"
        >
          <FaInstagram />
        </a>
        </Tooltip>

<Tooltip label='Share to Twitter'>
        <a
          href="/"
          className="bg-blue-400 text-white p-2 text-xl flex justify-start items-center gap-2 hover:bg-blue-600 relative group"
        >
          <FaTwitter />
        </a>
        </Tooltip>
      <Tooltip label="Send Mail">
        <a
          href="/"
          className="bg-red-700 text-white p-2 text-xl flex justify-start items-center gap-2 hover:bg-red-500 relative group"
        >
          <FaMailBulk />
        </a>
        </Tooltip>
      <Tooltip>
        <a
          className="cursor-pointer p-2 text-xl bg-black text-white hover:bg-slate-900 relative group flex justify-start items-center gap-2"
          onClick={() => window.print()}
        >
          <FaPrint />
        </a>
        </Tooltip>
      </div>
    </>
  );
};

export default ShareToIcons;
