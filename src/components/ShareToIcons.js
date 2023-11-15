"use client";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMailBulk,
  FaPrint,
  FaThumbsUp,
  FaThumbsDown,
} from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";

const ShareToIcons = () => {
  return (
    <>
      <button className="fixed top-[47%] right-0 p-2 bg-blue-500 text-white text-xl">
        <FaThumbsUp />
      </button>
      <button className="fixed top-[52%] right-0 p-2 bg-red-500 text-white text-xl">
        <FaThumbsDown />
      </button>
      <div className="container-fluid flex flex-col text-xl fixed left-0 top-[43%]">
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
          onClick={() => document.print()}
        >
          <FaPrint />
        </a>
        </Tooltip>
      </div>
    </>
  );
};

export default ShareToIcons;
