import Link from "next/link";
import React from "react";
import crypto from "crypto";

const RecentlyUploaded = async () => {
  const latestLyrics = (await getLatestLyrics()).slice(0, 4);
  return (
    <>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <h2 className="text-left font-extrabold underline text-2xl">
          Recently Uploaded
        </h2>

        {latestLyrics.slice(0, 5).map((lyrics) => (
          <div
            key={crypto.randomBytes(20).toString("hex")}
            className="flex-grow"
          >
            <Link
              href={`/${lyrics.slug}`}
              className="mt-3 text-indigo-500 inline-flex items-center"
            >
              <h2 className="text-blue-700 text-xl title-font font-medium mb-1">
                {lyrics.title} -{" "}
                {lyrics.singers.map((singer, key) => {
                  if (key === lyrics.singers.length - 1)
                    return ` ${singer.fullName}`;
                  return key === lyrics.singers.length - 2 &&
                    key !== lyrics.singers.length - 1
                    ? `${singer.fullName} and `
                    : `${singer.fullName}, `;
                })}
              </h2>
            </Link>
            <br />
            <div className="my-1">
              {lyrics.tags?.map((t) => {
                return (
                  <>
                    {t?.length !== 0 && (
                      <Link
                        href={`/search?q=${t}`}
                        key={crypto.randomBytes(20).toString("hex")}
                      >
                        <span className="mx-2 text-blue-700 hover:border-b-2 hover:border-blue-500">{`#${t}`}</span>
                      </Link>
                    )}
                  </>
                );
              })}
            </div>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
};
export async function getLatestLyrics() {
  try {
    const response = await fetch("http://localhost:3000/api/lyrics");
    return await response.json();
  } catch (error) {
    return [];
  }
}
export default RecentlyUploaded;
