"use client";
import { Box, Button, Spinner } from "@chakra-ui/react";
import LyricsSubmitRequest from "../../../../components/adminComponents/LyrisSubmitRequestList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from "crypto";

const Page = () => {
  const [requests, setRequests] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const fetchData = () => {
    getRequests();
  };

  useEffect(() => {
    fetchData();

    return () => {
      // Cleanup function
      // This will be called when the component is unmounted
      // You can add cleanup logic here if needed
    };
  }, [fetchAgain]);

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        Lyrics Submit Requests
      </h2>

      {loading ? (
        <Box
          display={"flex"}
          justifyContent={"center"}
          width={"100%"}
          mt={30}
        >
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
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
