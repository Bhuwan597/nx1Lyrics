import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { FaArrowCircleRight, FaEye, FaThumbsUp } from "react-icons/fa";
import Link from "next/link";
import RecentlyUploaded from "@/components/RecentlyUploaded";

const Page = async ({ searchParams }) => {
  const searchQuery = await searchParams?.q;
  const searchResults = await getSearchResults(searchQuery);
  return (
    <>
      <Navbar />
      {searchResults.length === 0 && (
        <p className="m-20 text-xl font-bold">
          No results found! Try to compose less restrictive search query or
          check spelling.
        </p>
      )}
        <p className="text-left mx-10 border-b-2 my-4">{searchResults.length} {searchResults.length ===1 ? 'Result': 'Results'} Found.</p>
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
      {searchResults.map((lyrics) => (
        <>
          <Box
            className=" p-4 hover:bg-gray-600 hover:text-white m-10 rounded sm:w-full md:w-3/4"
            boxShadow={"1px 1px 20px -15px rgba(0, 0, 0, 1)"}
          >
            <Box className="flex justify-evenly items-center flex-col md:flex-row">
              <Image
                src={lyrics.coverPicture}
                width={"200px"}
                className="rounded"
              />
              <Link href={`/${lyrics.slug}`} className="p-4">
                <Text className="font-semibold">{lyrics.language} Song</Text>
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
              <Button colorScheme={'teal'} my={4} rightIcon={<FaArrowCircleRight/>}>View</Button>
              </Link>
            </Box>
          </Box>
        </>
      ))}
      <RecentlyUploaded/>
      </div>
      <Footer />
    </>
  );
};

export async function getSearchResults(search) {
  try {
    const data = await fetch(
      `http://localhost:3000/api/lyrics?search=${search}`
    );
    return await data.json();
  } catch (error) {
    return [];
  }
}


export default Page;
