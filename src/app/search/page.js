import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { FaArrowCircleRight, FaEye, FaThumbsUp } from "react-icons/fa";
import Link from "next/link";
import RecentlyUploaded from "@/components/RecentlyUploaded";
import { notFound } from "next/navigation";

const Page = async ({ searchParams }) => {
  const searchQuery = await searchParams?.q;
  const searchResults = await getSearchResults(searchQuery);
  if(!searchResults) notFound()
  return (
    <>
      <Navbar />
      {searchResults.length === 0 && (
        <div className="m-20 text-xl font-bold">
          No results found! Try to compose less restrictive search query or
          check spelling.
        </div>
      )}
      <div className="text-left mx-10 border-b-2 my-4">
        {searchResults.length}{" "}
        {searchResults.length === 1 ? "Result" : "Results"} Found.
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        <div display={"flex"} flexDirection={'column'}>
          {searchResults.map((lyrics) => (
            <>
              <Box
                className=" p-4 m-10 rounded sm:w-full md:w-3/4"
                boxShadow={"1px 1px 20px -15px rgba(0, 0, 0, 1)"}
              >
                <Box className="flex justify-evenly items-center flex-col md:flex-row">
                  <Image
                  alt={lyrics.title}
                    src={lyrics.coverPicture}
                    width={"200px"}
                    className="rounded"
                  />
                  <Link href={`/${lyrics.slug}`} className="p-4">
                    <Text className="font-semibold">
                      {lyrics.language} Song
                    </Text>
                    <Text className=" font-bold text-2xl">
                      {lyrics.title} -{" "}
                      {lyrics.singers.map((singer, key) => {
                        if (key === lyrics.singers.length - 1)
                          return ` ${singer.fullName}`;
                        return key === lyrics.singers.length - 2 &&
                          key !== lyrics.singers.length - 1
                          ? `${singer.fullName} and `
                          : `${singer.fullName}, `;
                      })}
                    </Text>
                    <Text>
                      {lyrics.albumName && <>Album: {lyrics.albumName}</>}
                    </Text>
                    <Box display={"flex"} flexDirection={"row"} gap={4}>
                      <Text
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        size={"sm"}
                        gap={2}
                      >
                        {<FaEye />}
                        {lyrics.views}
                      </Text>
                      <Text
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        size={"sm"}
                        gap={2}
                      >
                        {<FaThumbsUp />}
                        {lyrics.likes}{" "}
                      </Text>
                    </Box>
                    <Text>{lyrics.postedOn}</Text>
                    <Button
                      colorScheme={"teal"}
                      my={4}
                      rightIcon={<FaArrowCircleRight />}
                    >
                      View
                    </Button>
                  </Link>
                </Box>
              </Box>
            </>
          ))}
        </div>
        <RecentlyUploaded />
      </div>
      <Footer />
    </>
  );
};

export async function getSearchResults(search) {
  try {
    const data = await fetch(
      `${process.env.HOST_URL}/api/lyrics?search=${search}`
    );
    return await data.json();
  } catch (error) {
    return [];
  }
}

export const metadata = {
  title: 'Search  | nx1Lyrics',
  description: 'Ultimate place to find all the lyrics of popular songs.',
  keywords: 'lyrics search find view',
}

export default Page;
