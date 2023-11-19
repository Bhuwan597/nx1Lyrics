"use client";
import React, { useState } from "react";
import { Box, Button, Stack } from "@chakra-ui/react";
import { FaArrowCircleLeft } from "react-icons/fa";

const LyrisSubmitRequestList = ({
  lyricsData,
  fetchAgain,
  setFetchAgain,
  selectedLyrics,
  setSelectedLyrics
}) => {
  const handleClick = () => {
    setSelectedLyrics('')
    setSelectedLyrics(lyricsData);
  };
  console.log('Selected Lyrics: ', selectedLyrics)
  return (
    <>
      {!selectedLyrics ? (
        <>
          <article
            className="flex max-w-xl flex-col items-start justify-between cursor-pointer"
            onClick={handleClick}
          >
            <div className="flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" className="text-gray-500">
                {lyricsData.postedOn}
              </time>
              <p
                className={`relative z-10 rounded-full ${
                  lyricsData.isPublished ? "bg-green-500" : "bg-red-500"
                }  px-3 py-1.5 font-medium text-white`}
              >
                {lyricsData.isPublished ? "Published" : "Unpublished"}
              </p>
            </div>
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <p>
                  <span className="absolute inset-0"></span>
                  {lyricsData.title}
                </p>
              </h3>
            </div>
            <div className="relative mt-8 flex items-center gap-x-4">
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <p>
                    <span className="absolute inset-0"></span>
                    {lyricsData.referenceName}
                  </p>
                </p>
                <p className="text-gray-600">{lyricsData.referenceEmail}</p>
              </div>
            </div>
          </article>
        </>
      ) : (
<></>
      )}
    </>
  );
};

export default LyrisSubmitRequestList;
