import React from "react";
import Iframe from "./Iframe";
import ShareToIcons from "./ShareToIcons";
import MainLyrics from "./MainLyrics";
import crypto from "crypto";
import { notFound } from "next/navigation";
import Link from "next/link";

const Details = ({ lyricsProps }) => {
  if (!lyricsProps) return notFound();
  return (
    <>
      <section
        className="text-gray-600 body-font py-10"
        key={crypto.randomBytes(20).toString("hex")}
      >
        <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-4 md:mb-0 items-center text-center w-4/5">
            <h2 className="mt-4 text-2xl font-semibold">Song Info:</h2>
            <table className="table-auto w-full mt-4 md:mt-4 capitalize">
              <tbody className="m-auto">
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Song Title
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.title}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Singers
                  </td>
                  <td className="border border-slate-600">
                    {lyricsProps.singers.map((singer) => (
                      <Link
                      href={`/search?q=${singer.fullName}`}
                        className="mr-2"
                        key={crypto.randomBytes(20).toString("hex")}
                      >
                        <span className="font-semibold hover:text-blue-600 mx-2">{singer.fullName}{' '}</span>
                      </Link>
                    ))}
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Released Date
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.releasedDate}
                  </td>
                </tr>
                <tr>
                  {lyricsProps.duration && (
                    <>
                      <td className="border border-slate-600 p-2 font-extrabold">
                        Duration
                      </td>
                      <td className="border border-slate-600 p-2">
                        {lyricsProps.duration?.split(":").map((d, key) => (
                          <>
                            {Number.parseInt(d)}
                            {key === 0 ? " minutes " : " seconds "}
                          </>
                        ))}
                      </td>
                    </>
                  )}
                </tr>
                <tr>
                {lyricsProps.writers?.length !== 0 || lyricsProps.writers[0]?.length !== 0 && <>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Writers
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.writers.map((writer) => (
                      <span
                        className="mr-2"
                        key={crypto.randomBytes(20).toString("hex")}
                      >
                        {writer},
                      </span>
                    ))}
                  </td>
                </>}
                </tr>
                <tr>
                {lyricsProps.composers?.length !==0 || lyricsProps.composers[0]?.length !== 0 && <>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Composers
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.composers.map((composer) => (
                      <span
                        className="mr-2"
                        key={crypto.randomBytes(20).toString("hex")}
                      >
                        {composer},
                      </span>
                    ))}
                  </td>
                </>}
                </tr>
                <tr>
                {lyricsProps.artists?.length !==0 || lyricsProps.artists[0]?.length !== 0 && <>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Artists
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.artists.map((artist) => (
                      <span
                        className="mr-2"
                        key={crypto.randomBytes(20).toString("hex")}
                      >
                        {artist},
                      </span>
                    ))}
                  </td>
                </>}
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Language
                  </td>
                  <td className="border border-slate-600 p-2">
                    {lyricsProps.language}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 w-4/5 md:w-/2">
          {lyricsProps.tags.map((t)=>{
            return <Link href={`/search?q=${t}`} key={crypto.randomBytes(20).toString("hex")}><span className="m-2 text-blue-700">{`#${t}`}</span></Link>
            
          })}
          </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Iframe src={lyricsProps.source} />
          </div>
        </div>
      </section>
      <div className="container-fluid flex justify-center items-center gap-8 flex-col-reverse mb-10">
        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 px-10 text-center mt-20 capitalize">
          {lyricsProps.title}
        </h1>
        <ShareToIcons id={lyricsProps._id} />
      </div>
      <div className="main-lyrics w-full flex justify-center flex-col items-center text-center">
        <MainLyrics lyricsText={lyricsProps.lyrics} />
      </div>
      <div className="p-8 text-center text-slate-700 mt-16">
        Posted by:{" "}
        <a
          className="italic text-blue-800 font-bold"
          href="instagram.com/bhuvi_bhuwan"
        >
          {" "}
          {lyricsProps.postedBy.fullName}
        </a>{" "}
        on {lyricsProps.postedOn}
        <p>
          {lyricsProps.views} Views and {lyricsProps.likes} Likes
        </p>
      </div>
    </>
  );
};

export default Details;
