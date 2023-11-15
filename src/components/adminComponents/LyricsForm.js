"use client";
import SkeletonBox from "@/components/SkeletonBox";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCross, FaCut, FaRemoveFormat } from "react-icons/fa";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import SkeletonAnimation from "@/components/SkeletonBox";
import SingerListItem from "./SingerListItem";
import SingerBadge from "./SingerBadge";
import Languages from "@/lib/language.json";
import Select from 'react-select'
import { useRouter } from "next/navigation";

const LyricsForm = ({ name, action, lyricsData }) => {
  const [singerSearchResults, setSingerSearchResults] = useState([]);
  const [singerLoading, setSingerLoading] = useState(false);
  const [showBox, setShowBox] = useState(false)
  //from state hooks
  const [title, setTitle] = useState('');
  const [releasedDate, setReleasedDate] = useState('');
  const [singers, setSingers] = useState([]);
  const [writers, setWriters] = useState('');
  const [composers, setComposers] = useState('');
  const [artists, setArtists] = useState('');
  const [language, setLanguage] = useState('');
  const [duration, setDuration] = useState('');
  const [tags, setTags] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true)
  const toast = useToast();
  const router = useRouter()


  useEffect(() => {
    if(!lyricsData) return
    setTitle(lyricsData.title)
    setReleasedDate(lyricsData.releasedDate)
    setSingers(lyricsData.singers)
    setWriters(lyricsData.writers.toString())
    setComposers(lyricsData.composers.toString())
    setArtists(lyricsData.artists.toString())
    setLanguage(lyricsData.language)
    setDuration(lyricsData.duration)
    setTags(lyricsData.tags.toString())
    setLyrics(lyricsData.lyrics.toString().replace(/,/g, '\n'))
    setAlbumName(lyricsData.albumName)
    setSource(lyricsData.source)
  }, [lyricsData])
  


  const handleChangeSinger = async (search) => {
    setShowBox(true)
    if (search.length < 2) return;
    setSingerLoading(true);
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/singer?search=${search}`, config);
    setSingerSearchResults(data);
    setSingerLoading(false);
  };

  const handleSingerClick = (singer) => {
    if (singers.some((selectedSinger) => selectedSinger._id === singer._id)) {
      return toast({
        title: "Singer Already Added!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    setSingers([...singers, singer]);
    setShowBox(false)
  };
  const handleClick = async () => {
    console.log(artists,writers,composers,tags)
    if(!title || !releasedDate || singers.length===0 || !language || !source || !lyrics || !isValid){
      return toast({
        title: "Fill up the all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      }); 
    }
    setLoading(true);
    const lyricsData = {
      title: title,
      releasedDate: releasedDate,
      singers: singers,
      writers: writers?.split(","),
      composers: composers?.split(","),
      artists: artists?.split(","),
      language: language,
      duration: duration,
      tags: tags?.split(","),
      lyrics: lyrics?.split("\n"),
      postedBy: JSON.parse(localStorage.getItem("adminInfo")),
      albumName: albumName,
      source: source,
      referenceName: null,
      referenceEmail: null,
      views: 0,
      likes: 0,
    };
    const data = await action(lyricsData)
    if(data){
      toast({
        title: "Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      }); 
    }else{
      setLoading(false)
      return toast({
        title: "Error occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      }); 
    }
    setTitle('')
    setReleasedDate('')
    setSingers([])
    setWriters('')
    setComposers('')
    setArtists('')
    setLanguage('')
    setDuration('')
    setAlbumName('')
    setSource('')
    setTags('')
    setLyrics([])
    setLoading(false);
    router.push('/admin/dashboard/post-lyric')
  };
  const handleDelete = (singer) => {
    setSingers(singers.filter((s) => s._id !== singer._id));
  };
  const handleDurationChange = (timeInput) => {
    // Update the state with the entered time
    setDuration(timeInput);
  
    // Regular expression for validating time format (mm:ss)
    const timeRegex = /^([0-5]?[0-9]):([0-5]?[0-9])$/;
  
    // Check if the entered time matches the expected format
    setIsValid(timeRegex.test(timeInput));
  };
  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.label);
  }
  
  return (
    <>
      <div class="lg:w-1/2 md:w-2/3 mx-auto my-10 p-4">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-full">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={title}
                variant={"flushed"}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2  w-full">
            <FormControl isRequired>
              <FormLabel>Released Date</FormLabel>
              <Input
                type="date"
                value={releasedDate}
                variant={"flushed"}
                onChange={(e) => setReleasedDate(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
            {singers.map((singer) => {
              return (
                <SingerBadge
                  key={crypto.randomUUID()}
                  singer={singer}
                  handleFunction={() => handleDelete(singer)}
                />
              );
            })}
          </Box>

          <div class="p-2 w-full">
            <FormControl isRequired>
              <FormLabel>Singers</FormLabel>
              <Input
                type="text"
                variant={"flushed"}
                onChange={(e) => handleChangeSinger(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          {singerLoading  ? (
            <SkeletonAnimation />
          ) : (
            showBox &&
            singerSearchResults.slice(0, 5).map((singer) => {
              return (
                <SingerListItem
                  key={singer._id}
                  singer={singer}
                  handleFunction={() => handleSingerClick(singer)}
                />
              );
            })
          )}

          <div class="p-2 w-full">
            <FormControl>
              <FormLabel>Writers</FormLabel>
              <Input
                type="text"
                value={writers}
                variant={"flushed"}
                onChange={(e) => setWriters(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full">
            <FormControl>
              <FormLabel>Composers</FormLabel>
              <Input
                type="text"
                value={composers}
                variant={"flushed"}
                onChange={(e) => setComposers(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full">
            <FormControl>
              <FormLabel>Artists</FormLabel>
              <Input
                type="text"
                value={artists}
                variant={"flushed"}
                onChange={(e) => setArtists(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full md:w-1/2">
            <FormControl isRequired>
              <FormLabel>Language</FormLabel>
              <Select   onChange={handleLanguageChange} placeholder="Select Language" options={Languages} />
            </FormControl>
          </div>

          <div class="p-2  w-full md:w-1/2">
          <FormControl isInvalid={!isValid}>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                value={duration}
                variant={"flushed"}
                onChange={(e)=>handleDurationChange(e.target.value)}
                className="w-full"
                placeholder="eg. 03:59"
              />
              <FormErrorMessage>Invalid Duration</FormErrorMessage>
            </FormControl>
          </div>


          <div class="p-2  w-full">
          <FormControl>
              <FormLabel>Tags</FormLabel>
              <Input
                type="text"
                value={tags}
                variant={"flushed"}
                onChange={(e) => setTags(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full">
          <FormControl>
              <FormLabel>Album Name</FormLabel>
              <Input
                type="text"
                value={albumName}
                variant={"flushed"}
                onChange={(e) => setAlbumName(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full">
          <FormControl isRequired>
              <FormLabel>Video Source</FormLabel>
              <Input
                type="text"
                value={source}
                variant={"flushed"}
                onChange={(e) => setSource(e.target.value)}
                className="w-full"
              />
            </FormControl>
          </div>

          <div class="p-2 w-full">
            <FormControl isRequired>
              <FormLabel>Lyrics of song</FormLabel>
              <textarea
                id="lyrics"
                name="lyrics"
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-96 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </FormControl>
          </div>

          <div class="p-2 w-full flex justify-center">
            <Button
              className="capitalize"
              colorScheme={"teal"}
              isLoading={loading}
              onClick={() => handleClick()}
            >
              {name} Lyric
            </Button>
          </div>
          <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
            <a class="text-indigo-500">nx1Lyrics@email.com</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LyricsForm;
