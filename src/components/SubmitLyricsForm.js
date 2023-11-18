"use client";
import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Languages from "@/lib/language.json";
import Select from "react-select";
import axios from "axios";

const SubmitLyricsForm = () => {
  const [loading, setLoading] = useState(false);
  const [lyricsData, setLyricsData] = useState({
    referenceName: "",
    referenceEmail: "",
    title: "",
    singerReference: "",
    language: "",
    lyrics: "",
  });
  const toast = useToast();

  const handleLanguageChange = (selectedOption) => {
    setLyricsData({ ...lyricsData, language: selectedOption.label,lyrics: lyricsData.lyrics.split('\n') });
  };

  async function handleClick() {
    if (
      !lyricsData.referenceName ||
      !lyricsData.referenceEmail ||
      !lyricsData.title ||
      !lyricsData.singerReference ||
      !lyricsData.language ||
      !lyricsData.lyrics
    )
      return toast({
        title: "Incomplete form fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    try {
      setLoading(true);
      const { data } = await axios.post("/api/lyrics", lyricsData);
      toast({
        title: "Thankyou for your contribution!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
    setLyricsData({
      referenceName: "",
      referenceEmail: "",
      title: "",
      singerReference: "",
      language: "",
      lyrics: "",
    });
    setLoading(false);
  }
  return (
    <>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-5 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Submit Lyrics
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Filling out this form will send lyrics directly to nx1Lyrics.com
              Team.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              Allow up to a week for submissions to be processed.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              The most requested and currently popular lyrics will be processed
              first.
            </p>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
              nx1Lyrics.com Team reserves the right to reject submissions.
            </p>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Your name</FormLabel>
                  <Input
                    value={lyricsData.referenceName}
                    onChange={(e) =>
                      setLyricsData({
                        ...lyricsData,
                        referenceName: e.target.value,
                      })
                    }
                    variant={"flushed"}
                  />
                </FormControl>
              </div>

              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Your email</FormLabel>
                  <Input
                    variant={"flushed"}
                    value={lyricsData.referenceEmail}
                    onChange={(e) =>
                      setLyricsData({
                        ...lyricsData,
                        referenceEmail: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </div>

              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Title of the song</FormLabel>
                  <Input
                    variant={"flushed"}
                    value={lyricsData.title}
                    onChange={(e) =>
                      setLyricsData({ ...lyricsData, title: e.target.value })
                    }
                  />
                </FormControl>
              </div>

              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Singers</FormLabel>
                  <Input
                    variant={"flushed"}
                    value={lyricsData.singerReference}
                    onChange={(e) =>
                      setLyricsData({
                        ...lyricsData,
                        singerReference: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </div>

              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Language</FormLabel>
                  <Select
                    onChange={handleLanguageChange}
                    placeholder="Select Language"
                    options={Languages}
                  ></Select>
                </FormControl>
              </div>

              <div class="p-2 w-full">
                <FormControl isRequired>
                  <FormLabel>Lyrics of the song</FormLabel>
                  <textarea
                    value={lyricsData.lyrics}
                    onChange={(e) =>
                      setLyricsData({ ...lyricsData, lyrics: e.target.value })
                    }
                    id="message"
                    name="message"
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-96 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </FormControl>
              </div>

              <div class="p-2 w-full flex justify-center items-center">
                <Button
                  isLoading={loading}
                  onClick={handleClick}
                  colorScheme={"teal"}
                >
                  Submit Lyric
                </Button>
              </div>
              <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a class="text-indigo-500">nx1Lyrics@email.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SubmitLyricsForm;
