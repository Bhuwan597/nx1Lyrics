import React from "react";
import Iframe from "./Iframe";
import ShareToIcons from "./ShareToIcons";
import MainLyrics from "./MainLyrics";

const Details = () => {
  return (
    <>
      <section class="text-gray-600 body-font py-10">
        <div class="container mx-auto flex px-5 py-10 md:flex-row flex-col-reverse items-center">
          <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-4 md:mb-0 items-center text-center">
          <h2 className="mt-4 text-2xl font-semibold">Song Info:</h2>
            <table class="table-auto w-full mt-4 md:mt-4">
              <tbody className="m-auto">
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Song Title
                  </td>
                  <td className="border border-slate-600 p-2">abc</td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Singers
                  </td>
                  <td className="border border-slate-600 p-2">
                    Malcolm Lockyer
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Released Date
                  </td>
                  <td className="border border-slate-600 p-2">1024 Aug 23</td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Duration
                  </td>
                  <td className="border border-slate-600 p-2">3 mins 20 sec</td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Writers
                  </td>
                  <td className="border border-slate-600 p-2">The Eagles</td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Composers
                  </td>
                  <td className="border border-slate-600 p-2">
                    Earth, Wind, and Fire
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Artists
                  </td>
                  <td className="border border-slate-600 p-2">
                    Earth, Wind, and Fire
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-600 p-2 font-extrabold">
                    Language
                  </td>
                  <td className="border border-slate-600 p-2">English</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Iframe />
          </div>
        </div>
      </section>
      <div className="container-fluid flex justify-center items-center gap-8 flex-col-reverse mb-10">
        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 px-10 text-center mt-20">
          See you again by Charlie Puth feat Wiz Khalifa
        </h1>
        <ShareToIcons />
      </div>
      <div className="main-lyrics w-full flex justify-center flex-col items-center text-center">
        <MainLyrics />
      </div>
      <div className="text-center text-slate-700 mt-16">Posted by: <a className="italic text-blue-800 font-bold" href="instagram.com/bhuvi_bhuwan"> Bhuwan Acharya</a> on 11/20/2021
        <p>11k Views and 200 Likes</p>
      </div>
    </>
  );
};

export default Details;
