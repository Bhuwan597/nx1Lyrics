"use client";
import LyricsForm from "@/components/adminComponents/LyricsForm";
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import LyricsSkeleton from '@/components/adminComponents/LyricsSkeleton'
import LyricsListItem from "@/components/adminComponents/LyricsListItem";
import { CloseIcon } from "@chakra-ui/icons";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false)
  const [searchResults, setSearchResults] = useState([]);
  const [lyrics, setLyrics] = useState()
  const [search, setSearch] = useState()

  function handleUpdate() {
    console.log("Lyrics Updated");
  }


  const handleOnChange = async (search) => {
    setSearch(search)
    if (search.length < 2) return;
    setLoading(true);
    setShowResult(true)
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/lyrics?search=${search}`, config);
    setSearchResults(data)
    setLoading(false);
  };

const selectLyrics = (lyrics)=>{
  setLyrics(lyrics)
  setShowResult(false)
}

const closeWindow = ()=>{
  setShowResult(false)
  setSearch('')
}

  return (
    <>
      <h1 className="text-2xl text-center m-10 capitalize">Update a Lyric</h1>
      <Box
        padding={4}
        display={"flex"}
        position={'relative'}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={'column'}
      >
        <InputGroup width={{ md: "30%", sm: "40%" }}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={FaSearch} color="black" />}
          />
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleOnChange(e.target.value)}
            borderColor={"teal"}
            borderRadius="full"
            _focus={{
              borderColor: "teal.500",
              boxShadow: "0 0 0 2px rgba(24, 115, 204, 0.2)",
            }}
          />
          <InputRightElement cursor={'pointer'} onClick={()=>closeWindow()}
            children={<Icon as={CloseIcon} color="black" />}/>
        </InputGroup>
        
             <Box zIndex={999} position={'absolute'} top={0} width={{sm:'100%',md:'30%'}} mt={'9vh'} px={3} maxHeight={'50vh'} overflowY={'scroll'}> 
          {loading?<LyricsSkeleton/>:showResult && searchResults.map((lyrics)=>{
            return <LyricsListItem key={crypto.randomUUID} lyrics={lyrics} handleFunction={()=>selectLyrics(lyrics)} />
          })}
             </Box>
      
        </Box>
      <LyricsForm lyricsData={lyrics} name="update" action={handleUpdate} />
    </>
  );
};

export default Page;
