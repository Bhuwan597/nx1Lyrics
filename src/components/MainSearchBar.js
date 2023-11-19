"use client";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";

const MainSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  const searchRef = useRef();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!searchQuery) return;
    const timeout = setTimeout(async () => {
      try {
        setShowBox(true);
        setLoading(true);
        const { data } = await axios.get(`/api/lyrics?search=${searchQuery}`);
        setLoading(false);
        setSearchResults(data);
      } catch (error) {
        console.log(error.message);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDomLoaded(true);
    const handler = (e) => {
      if (!searchRef.current.contains(e.target)) {
        setShowBox(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleSearchClick = () => {
    if (!searchQuery) return;
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <div>
      {domLoaded && (
        <>
          <div className="flex w-full md:justify-start justify-center items-end">
            <div className="mr-4 w-full">
              <InputGroup width={'100%'}>
                <Input
                width={'100%'}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text"
                  id="hero-field"
                  name="hero-field"
                  variant={"filled"}
                  onFocus={() => setShowBox(true)}
                />

                {loading && (
                  <InputLeftElement>
                    <Spinner color="blue.500" />
                  </InputLeftElement>
                )}
              </InputGroup>
            </div>
            <Button onClick={handleSearchClick} colorScheme={"teal"}>
              Search
            </Button>
          </div>
          <div className="relative w-full">
            <p className="text-sm mt-2 text-gray-500 mb-8 w-full text-left">
              Enter artist name or song title
            </p>
            <Box
              w={"100%"}
              mt={1}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              position={"absolute"}
              top={0}
              backgroundColor={"white"}
              maxHeight={"250px"}
              overflowY={"scroll"}
              boxShadow={"1px 1px 30px -15px rgba(0, 0, 0, 1) inset"}
              ref={searchRef}
            >
              {showBox && searchResults.length !== 0 && (
                <>
                  <Text
                    backgroundColor={"teal"}
                    color={"white"}
                    fontWeight={"bold"}
                    w={"100%"}
                    p={2}
                    textAlign={"center"}
                  >
                    Search Results
                  </Text>
                  {searchResults.map((result) => {
                    return (
                      <>
                        <Link
                          href={`/${result.slug}`}
                          className="p-3 text-left w-full hover:bg-gray-300"
                        >
                          {result.title} -{" "}
                          {result.singers.map((singer, key) => {
                            if (key === result.singers.length - 1)
                              return ` ${singer.fullName}`;
                            return key === result.singers.length - 2 &&
                              key !== result.singers.length - 1
                              ? `${singer.fullName} and `
                              : `${singer.fullName}, `;
                          })}
                        </Link>
                      </>
                    );
                  })}
                </>
              )}
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default MainSearchBar;
