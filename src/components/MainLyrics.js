import React from "react";
const crypto = require("crypto");

const MainLyrics = ({ lyricsText }) => {
  return (
    <>
      <div className="lyrics w-3/4 md:w-2/3 flex flex-col gap-2 text-xs md:text-sm lg:text-md">
        {lyricsText.map((line) => (
          <>
            <p key={crypto.randomBytes(20).toString("hex")}>{line}</p>
            {line === '' && <p className="my-2"></p>}
          </>
        ))}
      </div>
    </>
  );
};

export default MainLyrics;
