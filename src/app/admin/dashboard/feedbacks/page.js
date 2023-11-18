"use client";
import { Box, Button, Checkbox, Input, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import crypto from "crypto";
import { FaCheckCircle, FaCircleNotch, FaTimesCircle } from "react-icons/fa";

const Page = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [loading, setLoading] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");
  const [seenLoading, setSeenLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const getFeedbacks = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/feedbacks", config);
    if (data) {
      setFeedbacks(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getFeedbacks();
  }, [fetchAgain]);

  const handleOnChange = (isChecked, id) => {
    if (isChecked) {
      setIdToDelete((idToDelete) => [...idToDelete, id]);
    } else {
      setIdToDelete((idToDelete) => idToDelete.filter((i) => i !== id));
    }
  };
  const handleSeen = async () => {
    if (!idToDelete || idToDelete.length === 0) return;
    try {
      setSeenLoading(true)
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch("/api/feedbacks", idToDelete, config);
    } catch (error) {
      console.log(error.message)
    }
    setIdToDelete('')
    setFetchAgain(!fetchAgain)
    setSeenLoading(false)
  };
  const handleDelete = async () => {
    if (!idToDelete || idToDelete.length === 0) return;
    try {
      setDeleteLoading(true)
      const token = JSON.parse(localStorage.getItem("adminInfo"))?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          idToDelete: idToDelete
        },
      };
      const { data } = await axios.delete("/api/feedbacks", config);
    } catch (error) {
      console.log(error.message)
    }
    setIdToDelete('')
    setFetchAgain(!fetchAgain)
    setDeleteLoading(false)
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
            Feedbacks
          </h1>
          {!feedbacks || feedbacks.length === 0 && <p className="text-center text-lg">No Feedbacks Yet</p>}
          <Button
            leftIcon={<FaCircleNotch />}
            mr={2}
            type="button"
            colorScheme={"blue"}
            onClick={() => setFetchAgain(!fetchAgain)}
          >
            Refresh
          </Button>
          {idToDelete && idToDelete.length !== 0 && (
            <Button
            isLoading={seenLoading}
              leftIcon={<FaCheckCircle />}
              type="button"
              colorScheme={"green"}
              onClick={() => handleSeen()}
              mr={2}
            >
              Mark as seen
            </Button>
          )}
          {idToDelete && idToDelete.length !== 0 && (
            <Button
            isLoading={deleteLoading}
              leftIcon={<FaTimesCircle />}
              type="button"
              colorScheme={"red"}
              onClick={() => handleDelete()}
              mr={2}
            >
              Delete
            </Button>
          )}

          <div className="flex flex-wrap -m-4">
            {loading ? (
              <Box
                display={"flex"}
                justifyContent={"center"}
                width={"100%"}
                mt={{ base: "50%", lg: "10%" }}
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
              <>
                {feedbacks.map((feedback) => (
                  <>
                    <div
                      className="p-4 md:w-1/2 w-full mt-3"
                      key={crypto.randomBytes(20).toString("hex")}
                    >
                      <div className="h-full bg-gray-100 p-8 rounded relative mt-4">
                          <input
                            checked={idToDelete.includes(feedback._id) || false}
                            className="absolute top-1 left-2"
                            type="checkbox"
                            onChange={(e) =>
                              handleOnChange(e.target.checked, feedback._id)
                            }
                          />
                        <span className="title-font font-medium text-gray-900">
                          {feedback.date}
                        </span>
                        <span
                          className={`${
                            feedback.isSeen === false
                              ? "bg-green-100 text-green-900 border-green-400"
                              : "bg-yellow-100 text-yellow-900 border-yellow-400"
                          } text-sm font-medium me-2 px-2.5 py-0.5 roundeds absolute right-0 top-0`}
                        >
                          {feedback.isSeen === false ? "Unread" : "Seen"}
                        </span>

                        <p className="leading-relaxed mb-6">
                          {feedback.message}
                        </p>
                        <a className="inline-flex items-center">
                          <span className="flex-grow flex flex-col pl-4">
                            <span className="title-font font-medium text-gray-900">
                              {feedback.name}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {feedback.email}
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
