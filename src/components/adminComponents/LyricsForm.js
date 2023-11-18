"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEye, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  Select,
  Image,
} from "@chakra-ui/react";
import SkeletonAnimation from "@/components/SkeletonBox";
import SingerListItem from "./SingerListItem";
import SingerBadge from "./SingerBadge";
import Languages from "@/lib/language.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
import crypto from "crypto";
import Rselect from "react-select";
import Iframe from "../Iframe";

const LyricsForm = ({ name, action, lyricsData, editable }) => {
  const [singerSearchResults, setSingerSearchResults] = useState([]);
  const [singerLoading, setSingerLoading] = useState(false);
  const [showBox, setShowBox] = useState(false);
  const options = {
    apiKey: "public_W142iKx45gyHWVw2tfEye3yPd9YS", // This is your API key.
    maxFileCount: 1,
  };

  //from state hooks
  const [id, setId] = useState();
  const [title, setTitle] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [releasedDate, setReleasedDate] = useState("");
  const [singers, setSingers] = useState([]);
  const [writers, setWriters] = useState("");
  const [composers, setComposers] = useState("");
  const [artists, setArtists] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState("");
  const [tags, setTags] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [postedOn, setPostedOn] = useState();
  const [albumName, setAlbumName] = useState("");
  const [source, setSource] = useState("");
  const [referenceName, setReferenceName] = useState("");
  const [referenceEmail, setReferenceEmail] = useState("");
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [singerReference, setsingerReference] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [lyricsInfoData, setLyricsInfoData] = useState();
  const [isValid, setIsValid] = useState(true);
  const [singerSearchQuery, setSingerSearchQuery] = useState("");
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!lyricsData) return;
    setTitle(lyricsData.title);
    setCoverPicture(lyricsData.coverPicture);
    setReleasedDate(lyricsData.releasedDate);
    setSingers(lyricsData.singers);
    setWriters(lyricsData.writers.toString());
    setComposers(lyricsData.composers.toString());
    setArtists(lyricsData.artists.toString());
    setLanguage(lyricsData.language);
    setDuration(lyricsData.duration);
    setTags(lyricsData.tags.toString());
    setLyrics(lyricsData.lyrics.toString().replace(/,/g, "\n"));
    setAlbumName(lyricsData.albumName);
    setSource(lyricsData.source);
    setPostedOn(lyricsData.postedOn);
    setReferenceName(lyricsData.referenceName);
    setReferenceEmail(lyricsData.referenceEmail);
    setLikes(lyricsData.likes);
    setViews(lyricsData.views);
    setDislikes(lyricsData.dislikes);
    setId(lyricsData._id);
    setIsPublished(lyricsData.isPublished);
    setsingerReference(lyricsData.singerReference);
    setLyricsInfoData(lyricsData);
  }, [lyricsData]);

  useEffect(() => {
    if (!singerSearchQuery) return;
    const timeout = setTimeout(async () => {
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      setShowBox(true);
      setSingerLoading(true);
      const { data } = await axios.get(
        `/api/singer?search=${singerSearchQuery}`,
        config
      );
      setSingerSearchResults(data);
      setSingerLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [singerSearchQuery]);

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
    setShowBox(false);
  };

  const handleClick = async () => {
    if (
      !title ||
      !releasedDate ||
      singers.length === 0 ||
      !language ||
      !source ||
      !coverPicture ||
      !lyrics ||
      !isValid
    ) {
      return toast({
        title: "Fill up the all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLoading(true);
    const lyricsInfo = {
      title: title,
      coverPicture: coverPicture,
      releasedDate: releasedDate,
      singers: singers,
      singerReference: singerReference,
      writers: writers?.split(","),
      composers: composers?.split(","),
      artists: artists?.split(","),
      language: language,
      duration: duration,
      tags: tags?.split(","),
      lyrics: lyrics?.split("\n"),
      postedBy: JSON.parse(localStorage.getItem("adminInfo")),
      postedOn: postedOn,
      albumName: albumName,
      source: source,
      referenceName: referenceName,
      referenceEmail: referenceEmail,
      views: views,
      likes: likes,
      dislikes: dislikes,
      isPublished: isPublished,
    };
    const data = await action(lyricsInfo, id);
    if (data) {
      toast({
        title: "Successfull!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } else {
      setLoading(false);
      return toast({
        title: "Error occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setTitle("");
    setCoverPicture("");
    setReleasedDate("");
    setSingers([]);
    setWriters("");
    setComposers("");
    setArtists("");
    setLanguage("");
    setDuration("");
    setAlbumName("");
    setSource("");
    setTags("");
    setLyrics([]);
    setLoading(false);
    setLyricsInfoData();
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
  };

  const handlePernamnentlyDelete = async (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    setDeleteLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          id: id,
        },
      };
      const { data } = await axios.delete("/api/lyrics", config);
      toast({
        title: "Deleted Successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setTitle("");
    setCoverPicture("");
    setReleasedDate("");
    setSingers([]);
    setWriters("");
    setComposers("");
    setArtists("");
    setLanguage("");
    setDuration("");
    setAlbumName("");
    setSource("");
    setTags("");
    setLyrics([]);
    setLoading(false);
    setLyricsInfoData();
    setDeleteLoading(false);
  };
  return (
    <>
      {!lyricsData && !editable ? (
        <h1 className="text-center">Search and click to update</h1>
      ) : (
        <>
          <div className="lg:w-1/2 md:w-2/3 mx-auto my-10 p-4">
            {lyricsInfoData && (
              <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"end"}
                flexDirection={"column"}
              >
                <Button colorScheme={"teal"}>
                  <Link
                    className="flex justify-center items-center mr-1 md:mr-3 text-sm md:text-base"
                    href={lyricsData.slug ? "/" + lyricsData.slug : "/"}
                    target="_blank"
                  >
                    <FaEye className="mr-1" />
                    Visit this lyrics
                  </Link>
                </Button>
                <Box display={"flex"} gap={4} px={6}>
                  <Text
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <FaEye /> {lyricsData.views}
                  </Text>
                  <Text
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <FaThumbsUp /> {lyricsData.likes}
                  </Text>
                  <Text
                    display={"flex"}
                    justifyContent={"flex-start"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <FaThumbsDown /> {lyricsData.dislikes}
                  </Text>
                </Box>
              </Box>
            )}
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
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

              <div className="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Cover Picture</FormLabel>
                  <Input
                    type="text"
                    value={coverPicture}
                    variant={"flushed"}
                    onChange={(e) => setCoverPicture(e.target.value)}
                    className="w-full"
                  />
                </FormControl>
              </div>
              {coverPicture && (
                <div className="p-2 w-full">
                  <Image
                    src={coverPicture}
                    width={"200px"}
                    alt={title}
                    objectFit={"cover"}
                  />
                </div>
              )}

              <div className="p-2  w-full">
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
                      key={crypto.randomBytes(20).toString("hex")}
                      singer={singer}
                      handleFunction={() => handleDelete(singer)}
                    />
                  );
                })}
              </Box>

              <div className="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Singers</FormLabel>
                  <Input
                    type="text"
                    variant={"flushed"}
                    onChange={(e) => setSingerSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </FormControl>
              </div>

              {singerLoading ? (
                <SkeletonAnimation />
              ) : (
                showBox &&
                singerSearchResults.slice(0, 5).map((singer) => {
                  return (
                    <SingerListItem
                      key={crypto.randomBytes(20).toString("hex")}
                      singer={singer}
                      handleFunction={() => handleSingerClick(singer)}
                    />
                  );
                })
              )}

              <div className="p-2 w-full">
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

              <div className="p-2 w-full">
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

              <div className="p-2 w-full">
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

              <div className="p-2 w-full md:w-1/2">
                <FormControl isRequired>
                  <FormLabel>Language</FormLabel>
                  <Rselect
                    onChange={handleLanguageChange}
                    placeholder="Select Language"
                    options={Languages}
                  />
                </FormControl>
              </div>

              <div className="p-2  w-full md:w-1/2">
                <FormControl isInvalid={!isValid}>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    type="text"
                    value={duration}
                    variant={"flushed"}
                    onChange={(e) => handleDurationChange(e.target.value)}
                    className="w-full"
                    placeholder="eg. 03:59"
                  />
                  <FormErrorMessage>Invalid Duration</FormErrorMessage>
                </FormControl>
              </div>

              <div className="p-2  w-full">
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

              <div className="p-2 w-full">
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

              <div className="p-2 w-full">
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
              {source && (
                <div className="p-2 w-full">
                  <Iframe src={source} />
                </div>
              )}

              <div className="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Status</FormLabel>
                  <Select
                    bg={isPublished ? "green" : "red"}
                    borderColor="white"
                    color="white"
                    onChange={(e) => setIsPublished(Boolean(e.target.value))}
                    placeholder="Do you want to publish this song lyrics?"
                  >
                    <option className="text-black" value="true">
                      Yes
                    </option>
                    <option className="text-black" value="">
                      No
                    </option>
                  </Select>
                </FormControl>
              </div>

              <div className="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Lyrics of song</FormLabel>
                  <textarea
                    id="lyrics"
                    name="lyrics"
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-96 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </FormControl>
              </div>
              {lyricsInfoData && (
                <Box my={4}>
                  <Text fontSize={"large"} fontWeight={"bold"} color={"red"}>
                    Additional Information
                  </Text>
                  <Text display={"flex"}>
                    {lyricsData.referenceName ? (
                      <>
                        {" "}
                        <Text fontWeight={"bold"} mr={2}>
                          Refernce Name:
                        </Text>{" "}
                        <Text>{lyricsData.referenceName}</Text>
                      </>
                    ) : (
                      ""
                    )}
                  </Text>
                  <Text display={"flex"}>
                    {lyricsData.referenceEmail ? (
                      <>
                        {" "}
                        <Text fontWeight={"bold"} mr={2}>
                          Refernce Email:
                        </Text>{" "}
                        <Text>{lyricsData.referenceEmail}</Text>
                      </>
                    ) : (
                      ""
                    )}
                  </Text>
                  <Text display={"flex"}>
                    {lyricsData.postedOn ? (
                      <>
                        {" "}
                        <Text fontWeight={"bold"} mr={2}>
                          Posted On:
                        </Text>{" "}
                        <Text>{lyricsData.postedOn}</Text>
                      </>
                    ) : (
                      ""
                    )}
                  </Text>
                </Box>
              )}

              <div className="p-2 w-full flex justify-center flex-col md:flex-row flex-wrap gap-2">
                <Button
                  className="capitalize"
                  colorScheme={"teal"}
                  isLoading={loading}
                  onClick={() => handleClick()}
                >
                  {name} Lyric
                </Button>
                {lyricsInfoData && (
                  <>
                    <Button
                      className="capitalize"
                      colorScheme={"red"}
                      isLoading={deleteLoading}
                      onClick={() => handlePernamnentlyDelete(lyricsData._id)}
                    >
                      Delete this lyrics permanently
                    </Button>
                  </>
                )}
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-indigo-500">nx1Lyrics@email.com</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LyricsForm;
