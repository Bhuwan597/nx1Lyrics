"use client";
import { Box, Button, Spinner, Stack } from "@chakra-ui/react";
import LyricsSubmitRequest from "../../../../components/adminComponents/LyrisSubmitRequestList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import LyricsForm from "@/components/adminComponents/LyricsForm";
import { FaArrowCircleLeft } from "react-icons/fa";

const Page = () => {
  const [requests, setRequests] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLyrics, setSelectedLyrics] = useState("");





  useEffect(() => {
    if (typeof window === "undefined") return;
    const getRequests = async () => {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(
          "/api/lyrics?search=submit-requests",
          config
        );
        if (data) {
          setRequests(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getRequests();
  }, [fetchAgain]);

  const handleEdit = async (lyricsData, id) => {
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        id: id,
      },
    };
    const { data } = await axios.put(
      `/api/lyrics?id=${id}`,
      lyricsData,
      config
    );
    setSelectedLyrics("");
    setFetchAgain(!fetchAgain)
    return data;
  };
  const backFunction = () => {
    setSelectedLyrics("");
    setFetchAgain(!fetchAgain);
  };
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        Lyrics Submit Requests
      </h2>

      {loading ? (
        <Box display={"flex"} justifyContent={"center"} width={"100%"} mt={30}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Box>
      ) : (
        <div className="bg-white py-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Button
              type="button"
              colorScheme={"blue"}
              onClick={() => setFetchAgain(!fetchAgain)}
            >
              Refresh Requests
            </Button>
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {requests.map((lyrics) => (
                <LyricsSubmitRequest
                  key={crypto.randomBytes(20).toString("hex")}
                  lyricsData={lyrics}
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  selectedLyrics={selectedLyrics}
                  setSelectedLyrics={setSelectedLyrics}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedLyrics && <>
              <Box>
          <Stack
            direction="row"
            spacing={4}
            display={"flex"}
            width={"100%"}
            justifyContent={"center"}
          >
            <Button
              leftIcon={<FaArrowCircleLeft />}
              colorScheme="red"
              variant="solid"
              onClick={() => backFunction()}
            >
              Back
            </Button>
          </Stack>
        </Box>
        <LyricsForm
          action={handleEdit}
          editable={"true"}
          lyricsData={selectedLyrics}
          name={"edit"}
        />
      </>}
    </>
  );
};

export default Page;
