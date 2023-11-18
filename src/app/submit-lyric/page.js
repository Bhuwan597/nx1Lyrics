import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubmitLyricsForm from "@/components/SubmitLyricsForm";
const Page = () => {
  return (
    <>
      <Navbar />
      <SubmitLyricsForm/>
      <Footer />
    </>
  );
};


export const metadata = {
  title: 'Submit Lyrics | nx1Lyrics',
  description: 'Ultimate place to find all the lyrics of popular songs.',
  keywords: 'lyrics nx1Lyrics submit lyrics',
}
export default Page;
