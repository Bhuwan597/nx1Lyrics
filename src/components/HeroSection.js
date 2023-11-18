import React from "react";
import MainSearchBar from "./MainSearchBar";
import RecentlyUploaded from "./RecentlyUploaded";

const HeroSection = ( ) => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Welcome to nx1Lyrics,
            </h1>
            <p className="mb-8 leading-relaxed">
              your premier destination for song lyrics. Dive into a world of
              musical storytelling, where every word becomes a melody. Explore
              lyrics from a diverse range of songs. Let nx1Lyrics be your
              lyrical companion.
            </p>
            <MainSearchBar />
            <RecentlyUploaded/>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
